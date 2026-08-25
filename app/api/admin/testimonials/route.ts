import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cf';
import { isAuthed } from '@/lib/auth';
import { getTestimonials, saveTestimonials } from '@/lib/content';
import type { Testimonial } from '@/lib/types';

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const env = await getEnv();
    const form = await req.formData();

    const id = (form.get('id') as string) || crypto.randomUUID();
    const avatar = form.get('avatar') as File | null;
    let avatarKey: string | undefined;
    if (avatar && avatar.size > 0) {
      avatarKey = `avatars/${id}.webp`;
      await env.kayak_adventure_gallery.put(avatarKey, await avatar.arrayBuffer(), {
        httpMetadata: { contentType: avatar.type },
      });
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Save failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const env = await getEnv();
    const { id } = (await req.json().catch(() => ({ id: '' }))) as { id?: string };
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const list = await getTestimonials();
    const item = list.find((t) => t.id === id);
    if (item?.avatarKey) {
      await env.kayak_adventure_gallery.delete(item.avatarKey);
    }
    await saveTestimonials(list.filter((t) => t.id !== id));
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
