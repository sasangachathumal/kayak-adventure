import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cf';
import { isAuthed } from '@/lib/auth';
import { getGallery, saveGallery } from '@/lib/content';
import type { GalleryItem } from '@/lib/types';

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

const extFor = (ct: string) =>
  ({
    'image/webp': 'webp',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/avif': 'avif',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/quicktime': 'mov',
  }[ct] ?? 'bin');

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const env = await getEnv();
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const type = (form.get('type') as string) === 'video' ? 'video' : 'image';
    const id = crypto.randomUUID();
    const key = `gallery/${id}.${extFor(file.type)}`;

    await env.kayak_adventure_gallery.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });

    const width = parseInt(form.get('width') as string, 10) || 800;
    const height = parseInt(form.get('height') as string, 10) || 600;

    const item: GalleryItem = {
      id,
      type,
      key,
      contentType: file.type,
      alt: (form.get('alt') as string) || 'Kayak Adventure gallery moment',
      span: (form.get('span') as string) === 'tall' ? 'tall' : 'normal',
      width,
      height,
      createdAt: Date.now(),
    };

    const list = await getGallery();
    list.unshift(item);
    await saveGallery(list);
    return NextResponse.json({ ok: true, item });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const body = (await req.json().catch(() => ({}))) as {
      id?: string;
      alt?: string;
      span?: 'normal' | 'tall';
      hidden?: boolean;
    };

    if (!body.id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const list = await getGallery();
    const index = list.findIndex((i) => i.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const current = list[index];
    const updated: GalleryItem = {
      ...current,
      alt: body.alt !== undefined ? body.alt : current.alt,
      span: body.span !== undefined ? body.span : current.span,
      hidden: body.hidden !== undefined ? body.hidden : current.hidden,
    };

    list[index] = updated;
    await saveGallery(list);
    return NextResponse.json({ ok: true, item: updated });
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

    const list = await getGallery();
    const item = list.find((i) => i.id === id);
    if (item) {
      await env.kayak_adventure_gallery.delete(item.key);
      await saveGallery(list.filter((i) => i.id !== id));
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
