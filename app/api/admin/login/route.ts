import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cf';
import { createSession, safeEqual, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const env = await getEnv();
    const { password } = (await req.json().catch(() => ({ password: '' }))) as { password?: string };

    if (!password || !(await safeEqual(env.AUTH_SECRET, password, env.ADMIN_SECRET))) {
      return NextResponse.json({ error: 'Invalid Password' }, { status: 401 });
    }

    const token = await createSession(env.AUTH_SECRET);
    const res = NextResponse.json({ ok: true });
    const isHttps = req.nextUrl.protocol === 'https:';
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
