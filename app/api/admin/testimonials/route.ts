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
    const rawRating = form.get('rating') ? parseInt(form.get('rating') as string, 10) : undefined;
    const rating = rawRating && rawRating >= 1 && rawRating <= 5 ? rawRating : 5;

    const entry: Testimonial = {
      id,
      name: (form.get('name') as string) ?? '',
      location: (form.get('location') as string) ?? '',
      quote: (form.get('quote') as string) ?? '',
      rating,
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

export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const env = await getEnv();
    const contentType = req.headers.get('content-type') || '';
    let id: string;
    let name: string | undefined;
    let location: string | undefined;
    let quote: string | undefined;
    let rating: number | undefined;
    let avatarKey: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      id = (form.get('id') as string) || '';
      name = (form.get('name') as string) || undefined;
      location = (form.get('location') as string) || undefined;
      quote = (form.get('quote') as string) || undefined;
      const rawRating = form.get('rating') ? parseInt(form.get('rating') as string, 10) : undefined;
      if (rawRating && rawRating >= 1 && rawRating <= 5) rating = rawRating;

      const avatar = form.get('avatar') as File | null;
      if (avatar && avatar.size > 0) {
        avatarKey = `avatars/${id}.webp`;
        await env.kayak_adventure_gallery.put(avatarKey, await avatar.arrayBuffer(), {
          httpMetadata: { contentType: avatar.type },
        });
      }
    } else {
      const body = (await req.json().catch(() => ({}))) as {
        id?: string;
        name?: string;
        location?: string;
        quote?: string;
        rating?: number;
      };
      id = body.id || '';
      name = body.name;
      location = body.location;
      quote = body.quote;
      if (body.rating && body.rating >= 1 && body.rating <= 5) rating = body.rating;
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const list = await getTestimonials();
    const index = list.findIndex((t) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    const current = list[index];
    const updated: Testimonial = {
      ...current,
      name: name !== undefined ? name : current.name,
      location: location !== undefined ? location : current.location,
      quote: quote !== undefined ? quote : current.quote,
      rating: rating !== undefined ? rating : (current.rating ?? 5),
      avatarKey: avatarKey ?? current.avatarKey,
    };

    list[index] = updated;
    await saveTestimonials(list);
    return NextResponse.json({ ok: true, entry: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update failed';
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
