/**
 * pages/api/tiktok/auth.js
 *
 * TikTok OAuth 2.0 — redirect user to TikTok authorization page.
 * Scopes: user.info.basic, video.upload
 *
 * Usage: GET /api/tiktok/auth
 * Redirects to TikTok login → TikTok calls back to /api/tiktok/callback
 */

import crypto from 'crypto';

export default function handler(req, res) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://openacre.co'}/api/tiktok/callback`;

  // CSRF protection
  const state = crypto.randomBytes(16).toString('hex');

  // Store state in a short-lived cookie
  res.setHeader('Set-Cookie', `tiktok_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Path=/`);

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: 'user.info.basic,video.upload',
    response_type: 'code',
    redirect_uri: redirectUri,
    state,
  });

  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  res.redirect(302, authUrl);
}
