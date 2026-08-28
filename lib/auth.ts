import { cookies } from 'next/headers';
import { getEnv } from './cf';

const COOKIE = 'ka_session';
const TTL_MS = 1000 * 60 * 60 * 8; // 8 hours
const enc = new TextEncoder();

async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function b64url(buf: ArrayBuffer | Uint8Array) {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (const x of b) s += String.fromCharCode(x);
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
  } catch {
    return false;
  }
}

// call at the top of every protected route + the admin page
export async function isAuthed() {
  try {
    const env = await getEnv();
    if (!env?.AUTH_SECRET) return false;
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE)?.value;
    return verifySession(env.AUTH_SECRET, token);
  } catch {
    return false;
  }
}

export const SESSION_COOKIE = COOKIE;
export const SESSION_MAX_AGE = TTL_MS / 1000;
