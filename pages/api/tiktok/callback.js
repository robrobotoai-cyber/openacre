/**
 * pages/api/tiktok/callback.js
 *
 * TikTok OAuth callback — exchanges auth code for access token.
 * Stores token and displays success page with user info.
 */

export default async function handler(req, res) {
  const { code, state, error, error_description } = req.query;

  // Handle user denial
  if (error) {
    return res.status(400).send(`
      <h2>TikTok authorization failed</h2>
      <p>${error}: ${error_description}</p>
      <a href="/api/tiktok/auth">Try again</a>
    `);
  }

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  // Exchange code for access token
  const clientKey    = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  const redirectUri  = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://openacre.co'}/api/tiktok/callback`;

  try {
    const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key:    clientKey,
        client_secret: clientSecret,
        code,
        grant_type:    'authorization_code',
        redirect_uri:  redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).send(`
        <h2>Token exchange failed</h2>
        <pre>${JSON.stringify(tokenData, null, 2)}</pre>
      `);
    }

    const { access_token, refresh_token, open_id, scope, expires_in } = tokenData;

    // Fetch user info to confirm identity
    const userRes = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=display_name,avatar_url,username', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userData = await userRes.json();
    const user = userData?.data?.user || {};

    // Log token to server console (in production, store encrypted in DB)
    console.log('TikTok OAuth success:', {
      open_id,
      scope,
      expires_in,
      display_name: user.display_name,
      username: user.username,
    });
    console.log('ACCESS TOKEN:', access_token);
    console.log('REFRESH TOKEN:', refresh_token);

    // Return success page — shows token info for demo recording
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>TikTok Connected — Open Acre</title>
        <style>
          body { font-family: -apple-system, sans-serif; max-width: 600px; margin: 60px auto; padding: 0 20px; }
          .card { background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 20px 0; }
          .success { color: #22c55e; font-size: 18px; font-weight: 600; }
          .label { color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .value { font-family: monospace; font-size: 13px; word-break: break-all; }
          .token { background: #1a1d27; color: #38e8b5; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; word-break: break-all; }
          img { border-radius: 50%; width: 64px; height: 64px; }
          .btn { display: inline-block; background: #5b6ef5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px; }
        </style>
      </head>
      <body>
        <p class="success">✅ TikTok account connected to Open Acre</p>
        <div class="card">
          ${user.avatar_url ? `<img src="${user.avatar_url}" alt="avatar" style="margin-bottom:12px">` : ''}
          <div class="label">Display Name</div>
          <div class="value">${user.display_name || '—'}</div>
          <br>
          <div class="label">Username</div>
          <div class="value">@${user.username || '—'}</div>
          <br>
          <div class="label">Open ID</div>
          <div class="value">${open_id}</div>
          <br>
          <div class="label">Scopes Granted</div>
          <div class="value">${scope}</div>
          <br>
          <div class="label">Token Expires In</div>
          <div class="value">${expires_in} seconds (${Math.round(expires_in/3600)}h)</div>
        </div>
        <div class="card">
          <div class="label">Access Token (store securely)</div>
          <div class="token">${access_token}</div>
        </div>
        <a class="btn" href="/api/tiktok/upload-test">▶ Upload Test Draft Video →</a>
      </body>
      </html>
    `);

  } catch (err) {
    return res.status(500).send(`<h2>Error</h2><pre>${err.message}</pre>`);
  }
}
