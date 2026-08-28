import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { getSiteSettings, saveSiteSettings } from '@/lib/content';
import type { SiteSettings } from '@/lib/types';

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ ok: true, settings });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to get settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return unauthorized();
  try {
    const body = (await req.json().catch(() => ({}))) as Partial<SiteSettings>;
    const current = await getSiteSettings();

    const updated: SiteSettings = {
      ...current,
      ...body,
      announcement: body.announcement
        ? {
            enabled: Boolean(body.announcement.enabled),
            text: body.announcement.text || '',
            linkText: body.announcement.linkText,
            linkUrl: body.announcement.linkUrl,
          }
        : current.announcement,
    };

    await saveSiteSettings(updated);
    return NextResponse.json({ ok: true, settings: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
