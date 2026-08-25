import { NextRequest } from 'next/server';
import { getEnv } from '@/lib/cf';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string[] }> },
) {
  try {
    const env = await getEnv();
    const resolvedParams = await params;
    const key = resolvedParams.key.join('/');
    const rangeHeader = req.headers.get('range');

    let object;
    if (rangeHeader) {
      const m = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
      const offset = m?.[1] ? parseInt(m[1], 10) : 0;
      const end = m?.[2] ? parseInt(m[2], 10) : undefined;
      const length = end !== undefined ? end - offset + 1 : undefined;
      object = await env.kayak_adventure_gallery.get(key, {
        range: length !== undefined ? { offset, length } : { offset },
      });
    } else {
      object = await env.kayak_adventure_gallery.get(key);
    }

    if (!object) return new Response('Not found', { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('accept-ranges', 'bytes');
    headers.set('cache-control', 'public, max-age=31536000, immutable');

    if (rangeHeader && (object as { range?: { offset?: number; length?: number } }).range) {
      const r = (object as { range?: { offset?: number; length?: number } }).range!;
      const off = r.offset ?? 0;
      const len = r.length ?? object.size - off;
      headers.set('content-range', `bytes ${off}-${off + len - 1}/${object.size}`);
      headers.set('content-length', String(len));
      return new Response(object.body, { status: 206, headers });
    }

    headers.set('content-length', String(object.size));
    return new Response(object.body, { status: 200, headers });
  } catch {
    return new Response('Error retrieving media', { status: 500 });
  }
}
