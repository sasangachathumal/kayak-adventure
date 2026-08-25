# KAYAK Adventure — Admin Panel Implementation Guide

A step-by-step build for the owner-facing admin. Hand this to the developer.

## Decisions locked

- **Store:** Cloudflare **KV** for metadata (gallery list + testimonials). **R2** for the image/video files.
- **Admin scope:** upload/delete gallery **images and small videos**; add/remove **testimonials**. Nothing else is CMS-managed — contact details and other copy stay in code and change via a code edit + redeploy.
- **Reads:** public pages read gallery/testimonials through a **shared server-side module** (direct calls in Server Components — no self-HTTP).
- **Writes:** all mutations go through **protected API routes** under `/api/admin/*`.
- **Auth:** single admin password (`ADMIN_SECRET`) → **signed, HttpOnly cookie** (HMAC via Web Crypto). Verified server-side in every protected route and on the admin page.
- **Watermark:** applied **client-side (canvas)** to images before upload. (Videos are not watermarked — see Flags.)
- **Environment:** everything runs on the `*.workers.dev` URL through the build. No DNS / custom domain until go-live.

> Runtime note: bindings are accessed via `getCloudflareContext()` from `@opennextjs/cloudflare`. Its exact signature changes between adapter versions — if `{ async: true }` isn't right for your installed version, check the current adapter docs.

---

# ⚠️ CONFIGURATION THE OWNER MUST DO (before the developer can run this)

These are dashboard/CLI steps that create real Cloudflare resources and secrets. They are **not** in the code and must be done once.

### 1. Create the KV namespace
```bash
npx wrangler kv namespace create CMS_KV
npx wrangler kv namespace create CMS_KV --preview   # for local dev
```
Copy both returned IDs into `wrangler.jsonc` (below).

### 2. Create the R2 bucket
```bash
npx wrangler r2 bucket create kayak-adventure-assets
```

### 3. Set the two secrets (production Worker)
```bash
npx wrangler secret put ADMIN_SECRET     # the admin login password
npx wrangler secret put AUTH_SECRET      # a random signing key — see below
```
Generate a strong `AUTH_SECRET`:
```bash
openssl rand -base64 32
```
- `ADMIN_SECRET` = the password the owner types to log in.
- `AUTH_SECRET` = an internal signing key the owner never types. Changing it logs everyone out.

> These are stored **in Cloudflare**, not in the repo, and are separate from the CI deploy token you already set up. They must be `wrangler secret put` once against the deployed Worker (and re-run only if you rotate them).

### 4. Local secrets file (developer, gitignored)
Create `.dev.vars` in the project root:
```
ADMIN_SECRET=choose-a-local-password
AUTH_SECRET=any-local-random-string
```
Add `.dev.vars` to `.gitignore` if it isn't already.

---

# Bindings & types

### `wrangler.jsonc`
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "kayak-adventure",
  "compatibility_date": "2026-07-22",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "directory": ".open-next/assets", "binding": "ASSETS" },

  "kv_namespaces": [
    { "binding": "CMS_KV", "id": "<PROD_KV_ID>", "preview_id": "<PREVIEW_KV_ID>" }
  ],
  "r2_buckets": [
    { "binding": "GALLERY_BUCKET", "bucket_name": "kayak-adventure-assets" }
  ]
}
```

Regenerate types after editing bindings:
```bash
npx wrangler types
```

### `cloudflare-env.d.ts` (or merge into your generated types)
```ts
interface CloudflareEnv {
  CMS_KV: KVNamespace;
  GALLERY_BUCKET: R2Bucket;
  ADMIN_SECRET: string;
  AUTH_SECRET: string;
}
```

---

# Shared types & the binding helper

### `lib/types.ts`
```ts
export type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  key: string;          // R2 object key
  contentType: string;
  alt: string;
  span: 'normal' | 'tall';
  createdAt: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatarKey?: string;   // R2 object key (optional)
  createdAt: number;
};
```

### `lib/cf.ts`
```ts
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function getEnv(): Promise<CloudflareEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env as unknown as CloudflareEnv;
}
```

---

# The content module (reads + KV writes)

One module both frontends import. Public pages use the read functions; admin routes use the write helpers.

### `lib/content.ts`
```ts
import { getEnv } from './cf';
import type { GalleryItem, Testimonial } from './types';

const GALLERY_KEY = 'gallery';
const TESTIMONIALS_KEY = 'testimonials';

// ---- reads (used by public Server Components) ----
export async function getGallery(): Promise<GalleryItem[]> {
  const env = await getEnv();
  return ((await env.CMS_KV.get(GALLERY_KEY, 'json')) as GalleryItem[]) ?? [];
}
export async function getTestimonials(): Promise<Testimonial[]> {
  const env = await getEnv();
  return ((await env.CMS_KV.get(TESTIMONIALS_KEY, 'json')) as Testimonial[]) ?? [];
}

// ---- writes (used by protected admin routes) ----
export async function saveGallery(list: GalleryItem[]) {
  const env = await getEnv();
  await env.CMS_KV.put(GALLERY_KEY, JSON.stringify(list));
}
export async function saveTestimonials(list: Testimonial[]) {
  const env = await getEnv();
  await env.CMS_KV.put(TESTIMONIALS_KEY, JSON.stringify(list));
}
```

> KV is designed for exactly this read pattern (frequent reads, rare writes), so the public pages read it per request — no extra caching layer needed to start. KV is eventually consistent, so a just-saved edit may take a few seconds to appear everywhere; acceptable for this content.

---

# Auth (signed cookie via Web Crypto)

No external dependency — uses the runtime's `crypto.subtle`, which works on Workers.

### `lib/auth.ts`
```ts
import { cookies } from 'next/headers';
import { getEnv } from './cf';

const COOKIE = 'ka_session';
const TTL_MS = 1000 * 60 * 60 * 8; // 8 hours
const enc = new TextEncoder();

async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'],
  );
}
function b64url(buf: ArrayBuffer | Uint8Array) {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = ''; for (const x of b) s += String.fromCharCode(x);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function unb64url(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = str.length % 4 ? '='.repeat(4 - (str.length % 4)) : '';
  const bin = atob(str + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// constant-time equality via HMAC verify
export async function safeEqual(secret: string, a: string, b: string) {
  const key = await hmacKey(secret);
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(a));
  return crypto.subtle.verify('HMAC', key, mac, enc.encode(b));
}

export async function createSession(secret: string) {
  const payload = JSON.stringify({ exp: Date.now() + TTL_MS });
  const msg = b64url(enc.encode(payload));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(msg));
  return `${msg}.${b64url(sig)}`;
}

export async function verifySession(secret: string, token?: string) {
  if (!token) return false;
  const [msg, sig] = token.split('.');
  if (!msg || !sig) return false;
  const key = await hmacKey(secret);
  const ok = await crypto.subtle.verify('HMAC', key, unb64url(sig), enc.encode(msg));
  if (!ok) return false;
  try {
    const { exp } = JSON.parse(new TextDecoder().decode(unb64url(msg)));
    return typeof exp === 'number' && exp > Date.now();
  } catch { return false; }
}

// call at the top of every protected route + the admin page
export async function isAuthed() {
  const env = await getEnv();
  const token = (await cookies()).get(COOKIE)?.value;
  return verifySession(env.AUTH_SECRET, token);
}

export const SESSION_COOKIE = COOKIE;
export const SESSION_MAX_AGE = TTL_MS / 1000;
```

### `app/api/admin/login/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cf';
import { createSession, safeEqual, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const env = await getEnv();
  const { password } = await req.json().catch(() => ({ password: '' }));
  if (!password || !(await safeEqual(env.AUTH_SECRET, password, env.ADMIN_SECRET))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const token = await createSession(env.AUTH_SECRET);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: SESSION_MAX_AGE,
  });
  return res;
}
```

### `app/api/admin/logout/route.ts`
```ts
import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 });
  return res;
}
```

---

# Media serving route (R2 → browser, with video range support)

Serves both images and videos from R2 through the Worker. Range support is required so videos can seek.

### `app/api/media/[...key]/route.ts`
```ts
import { NextRequest } from 'next/server';
import { getEnv } from '@/lib/cf';

export async function GET(req: NextRequest, { params }: { params: Promise<{ key: string[] }> }) {
  const env = await getEnv();
  const key = (await params).key.join('/');
  const rangeHeader = req.headers.get('range');

  let object;
  if (rangeHeader) {
    const m = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
    const offset = m?.[1] ? parseInt(m[1], 10) : 0;
    const end = m?.[2] ? parseInt(m[2], 10) : undefined;
    const length = end !== undefined ? end - offset + 1 : undefined;
    object = await env.GALLERY_BUCKET.get(key, { range: length !== undefined ? { offset, length } : { offset } });
  } else {
    object = await env.GALLERY_BUCKET.get(key);
  }
  if (!object) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);           // sets content-type etc. from stored metadata
  headers.set('etag', object.httpEtag);
  headers.set('accept-ranges', 'bytes');
  headers.set('cache-control', 'public, max-age=31536000, immutable'); // keys are unique per upload

  // `object.size` is the full object size; `object.range` is what was served.
  if (rangeHeader && (object as any).range) {
    const r = (object as any).range;
    const off = r.offset ?? 0;
    const len = r.length ?? (object.size - off);
    headers.set('content-range', `bytes ${off}-${off + len - 1}/${object.size}`);
    headers.set('content-length', String(len));
    return new Response(object.body, { status: 206, headers });
  }
  headers.set('content-length', String(object.size));
  return new Response(object.body, { status: 200, headers });
}
```
Public `src` for any item is `/api/media/<key>` (e.g. `/api/media/gallery/ab12.webp`).

---

# Protected admin routes (mutations)

Each one checks auth first, then writes R2 + KV.

### `app/api/admin/gallery/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cf';
import { isAuthed } from '@/lib/auth';
import { getGallery, saveGallery } from '@/lib/content';
import type { GalleryItem } from '@/lib/types';

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
const extFor = (ct: string) =>
  ({ 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png',
     'video/mp4': 'mp4', 'video/webm': 'webm' } as Record<string, string>)[ct] ?? 'bin';

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  const env = await getEnv();
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const type = (form.get('type') as string) === 'video' ? 'video' : 'image';
  const id = crypto.randomUUID();
  const key = `gallery/${id}.${extFor(file.type)}`;

  await env.GALLERY_BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });

  const item: GalleryItem = {
    id, type, key, contentType: file.type,
    alt: (form.get('alt') as string) ?? '',
    span: (form.get('span') as string) === 'tall' ? 'tall' : 'normal',
    createdAt: Date.now(),
  };
  const list = await getGallery();
  list.unshift(item);
  await saveGallery(list);
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  const env = await getEnv();
  const { id } = await req.json();
  const list = await getGallery();
  const item = list.find((i) => i.id === id);
  if (item) {
    await env.GALLERY_BUCKET.delete(item.key);
    await saveGallery(list.filter((i) => i.id !== id));
  }
  return NextResponse.json({ ok: true });
}
```

### `app/api/admin/testimonials/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cf';
import { isAuthed } from '@/lib/auth';
import { getTestimonials, saveTestimonials } from '@/lib/content';
import type { Testimonial } from '@/lib/types';

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  const env = await getEnv();
  const form = await req.formData();

  const id = (form.get('id') as string) || crypto.randomUUID();
  const avatar = form.get('avatar') as File | null;
  let avatarKey: string | undefined;
  if (avatar && avatar.size > 0) {
    avatarKey = `avatars/${id}.webp`;
    await env.GALLERY_BUCKET.put(avatarKey, await avatar.arrayBuffer(), { httpMetadata: { contentType: avatar.type } });
  }

  const list = await getTestimonials();
  const existing = list.find((t) => t.id === id);
  const entry: Testimonial = {
    id,
    name: (form.get('name') as string) ?? '',
    location: (form.get('location') as string) ?? '',
    quote: (form.get('quote') as string) ?? '',
    avatarKey: avatarKey ?? existing?.avatarKey,
    createdAt: existing?.createdAt ?? Date.now(),
  };
  await saveTestimonials([entry, ...list.filter((t) => t.id !== id)]);
  return NextResponse.json({ ok: true, entry });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  const env = await getEnv();
  const { id } = await req.json();
  const list = await getTestimonials();
  const item = list.find((t) => t.id === id);
  if (item?.avatarKey) await env.GALLERY_BUCKET.delete(item.avatarKey);
  await saveTestimonials(list.filter((t) => t.id !== id));
  return NextResponse.json({ ok: true });
}
```

---

# Client-side watermark (images only)

### `lib/watermark.ts`
```ts
'use client';

export async function watermarkImage(file: File, text = 'KAYAK Adventure'): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);

  const size = Math.max(24, Math.round(bitmap.width * 0.03));
  ctx.font = `600 ${size}px sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 4;
  ctx.fillText(text, bitmap.width - size, bitmap.height - size);

  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b!), 'image/webp', 0.9),
  );
}
```
The original file never leaves the browser un-watermarked — only the watermarked WebP is uploaded. (This matches the earlier decision not to retain un-watermarked originals.)

---

# Admin UI (functional scaffold — style to taste)

### `app/admin/login/page.tsx` (client)
```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function submit() {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) router.push('/admin');
    else setError('Wrong password');
  }

  return (
    <div style={{ maxWidth: 320, margin: '80px auto' }}>
      <h1>Admin</h1>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={submit}>Log in</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </div>
  );
}
```

### `app/admin/page.tsx` (SERVER component — the auth gate)
```tsx
import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import { getGallery, getTestimonials } from '@/lib/content';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await isAuthed())) redirect('/admin/login');
  const [gallery, testimonials] = await Promise.all([getGallery(), getTestimonials()]);
  return <AdminDashboard gallery={gallery} testimonials={testimonials} />;
}
```

### `app/admin/AdminDashboard.tsx` (client — upload/list/delete)
```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { watermarkImage } from '@/lib/watermark';
import type { GalleryItem, Testimonial } from '@/lib/types';

export default function AdminDashboard(
  { gallery, testimonials }: { gallery: GalleryItem[]; testimonials: Testimonial[] },
) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function uploadGallery(file: File) {
    setBusy(true);
    const isVideo = file.type.startsWith('video/');
    const body = new FormData();
    body.set('type', isVideo ? 'video' : 'image');
    // watermark images; send videos as-is
    body.set('file', isVideo ? file : new File([await watermarkImage(file)], 'wm.webp', { type: 'image/webp' }));
    await fetch('/api/admin/gallery', { method: 'POST', body });
    setBusy(false);
    router.refresh();
  }

  async function deleteGallery(id: string) {
    await fetch('/api/admin/gallery', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Manage site</h1>
        <button onClick={logout}>Log out</button>
      </header>

      <section>
        <h2>Gallery</h2>
        <input
          type="file"
          accept="image/*,video/*"
          disabled={busy}
          onChange={(e) => e.target.files?.[0] && uploadGallery(e.target.files[0])}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {gallery.map((g) => (
            <figure key={g.id}>
              {g.type === 'video'
                ? <video src={`/api/media/${g.key}`} controls width="100%" />
                : <img src={`/api/media/${g.key}`} alt={g.alt} width="100%" />}
              <button onClick={() => deleteGallery(g.id)}>Delete</button>
            </figure>
          ))}
        </div>
      </section>

      {/* Testimonials: a form posting name/location/quote/avatar to /api/admin/testimonials,
          and a list with Delete buttons — same pattern as gallery. */}
    </div>
  );
}
```

---

# Public integration

Read through the shared module in Server Components; point media at `/api/media/<key>`.

### `app/gallery/page.tsx`
```tsx
import { getGallery } from '@/lib/content';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const items = await getGallery();
  return <GalleryGrid items={items} />;
}
```

`GalleryGrid` renders each item with `src={`/api/media/${item.key}`}` — `<img>` for images, `<video controls>` for videos. Do the same for testimonials on the landing page via `getTestimonials()`.

> `export const dynamic = 'force-dynamic'` is needed because these pages read a runtime binding (KV), so they can't be prerendered at build time.

---

# Local development & testing

```bash
# 1. build for the workers runtime
npx opennextjs-cloudflare build
# 2. run with local KV + R2 (Miniflare) and .dev.vars secrets
npx opennextjs-cloudflare preview
```
Test order: log in at `/admin/login` → upload an image (confirm the watermark) → confirm it appears on `/gallery` → upload a small video → add/delete a testimonial → log out and confirm `/admin` redirects to login.

Deploy is your existing GitHub Actions flow (OpenNext build + `wrangler deploy`) to the `*.workers.dev` target. Remember the two runtime secrets (`ADMIN_SECRET`, `AUTH_SECRET`) must already be set on the deployed Worker via `wrangler secret put` — CI does not set them.

---

# ⚠️ Flags & decisions to confirm

1. **Enquiry system is not in this plan.** If contact enquiries / booking requests are still part of the project, they should **not** go in KV — they want ordering, status filtering, and read-after-write consistency, which is D1 or a form service. Decide separately; it doesn't change anything above.
2. **Videos are not watermarked.** Browser canvas watermarks still images, not video (video would need re-encoding, which Workers can't do). Videos upload as-is. If watermarked video is a hard requirement, that's a separate, heavier piece of work.
3. **Keep videos genuinely small.** They upload through the Worker, so they're bounded by the Worker request-body limit (about 100 MB on the free plan, larger on paid). "Small clips," not full films.
4. **Single shared password.** No per-user identity; to revoke access, rotate `AUTH_SECRET` (logs everyone out) and/or change `ADMIN_SECRET`. If you later want MFA, add Cloudflare Access in front of `/admin` at go-live — it layers on top of this without replacing it.
5. **KV is eventually consistent.** An edit usually appears within seconds everywhere. Fine for gallery/testimonials; would not be fine for anything transactional.
6. **Un-watermarked originals are not kept.** You can't later regenerate a differently-watermarked version without re-uploading. Confirm that's acceptable.
7. **At go-live**, you can optionally move image delivery from the `/api/media` Worker route to a **public R2 custom domain** (e.g. `img.kayakadventure.lk`) for CDN caching. The Worker route works fine until then; this is an optimization, not a requirement.
