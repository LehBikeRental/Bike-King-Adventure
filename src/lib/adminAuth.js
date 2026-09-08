import crypto from 'crypto';

const SESSION_COOKIE = 'bka_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not defined.');
  return secret;
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createSessionToken(email) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${email}.${expiresAt}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString('base64url');
}

export function verifySessionToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parts = decoded.split('.');
    if (parts.length < 3) return null;
    const signature = parts.pop();
    const expiresAtStr = parts.pop();
    const email = parts.join('.');
    const payload = `${email}.${expiresAtStr}`;
    const expected = sign(payload);
    const validSig = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!validSig) return null;
    if (Date.now() > Number(expiresAtStr)) return null;
    return { email };
  } catch {
    return null;
  }
}

export function checkAdminCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL || '';
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  if (!adminEmail || !adminPassword) return false;
  const emailOk = email?.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passOk = password === adminPassword;
  return emailOk && passOk;
}

export const ADMIN_SESSION_COOKIE = SESSION_COOKIE;
export const ADMIN_SESSION_MAX_AGE = Math.floor(SESSION_TTL_MS / 1000);
