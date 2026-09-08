import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'bka_admin_session';

// Lightweight edge-safe verification (mirrors src/lib/adminAuth.js) since
// the crypto module import differs slightly between Node and Edge runtimes.
async function isValidSession(token, secret) {
  try {
    const decoded = atob(token.replace(/-/g, '+').replace(/_/g, '/'));
    const parts = decoded.split('.');
    if (parts.length < 3) return { ok: false, reason: 'bad-parts:' + parts.length };
    const signature = parts.pop();
    const expiresAtStr = parts.pop();
    const email = parts.join('.');
    const payload = `${email}.${expiresAtStr}`;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expected = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    if (expected !== signature) return { ok: false };
    if (Date.now() > Number(expiresAtStr)) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/admin/login';
  const isLoginApi = pathname === '/api/admin/login';

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const isProtectedPage = pathname.startsWith('/admin');
  const isProtectedApi = pathname.startsWith('/api/admin');

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  const result = token && secret ? await isValidSession(token, secret) : { ok: false };

  if (!result.ok) {
    if (isProtectedApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
