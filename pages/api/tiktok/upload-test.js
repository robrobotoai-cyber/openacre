/**
 * pages/api/tiktok/upload-test.js
 *
 * Demo endpoint — uploads a test video to TikTok as a draft (inbox).
 * Used for sandbox testing and the app review demo video.
 *
 * GET /api/tiktok/upload-test?token=ACCESS_TOKEN
 * Or pass token via Authorization header.
 *
 * Uses PULL_FROM_URL method — TikTok fetches the MP4 from our URL.
 * Test video: a simple publicly-accessible sample MP4 in 9:16 format.
 */

export default async function handler(req, res) {
  const token = req.query.token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head><title>TikTok Upload Test</title>
      <style>body{font-family:-apple-system,sans-serif;max-width:600px;margin:60px auto;padding:0 20px}
      .btn{display:inline-block;background:#5b6ef5;color:white;padding:12px 24px;border-radius:8px;text-decoration:none}
      input{width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;font-family:monospace;font-size:12px;margin:8px 0}
      </style></head>
      <body>
        <h2>TikTok Draft Upload Test</h2>
        <p>Paste your access token to upload a test video as a draft to your TikTok inbox.</p>
        <form method="GET">
          <label>Access Token</label>
          <input name="token" type="text" placeholder="Paste access token here..." required>
          <br><br>
          <button type="submit" style="background:#5b6ef5;color:white;padding:12px 24px;border:none;border-radius:8px;cursor:pointer;font-size:14px">
            Upload Test Draft →
          </button>
        </form>
        <p style="color:#6b7280;font-size:13px">
          You can get your access token by completing the OAuth flow at
          <a href="/api/tiktok/auth">/api/tiktok/auth</a>
        </p>
      </body>
      </html>
    `);
  }

  try {
    // Step 1: Query creator info (required before every upload)
    const creatorRes = await fetch('https://open.tiktokapis.com/v2/post/publish/creator_info/query/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({}),
    });
    const creatorData = await creatorRes.json();

    if (creatorData.error?.code !== 'ok') {
      return res.status(400).send(`
        <h2>Creator info query failed</h2>
        <pre>${JSON.stringify(creatorData, null, 2)}</pre>
        <p>Make sure your access token is valid. <a href="/api/tiktok/auth">Re-authorize →</a></p>
      `);
    }

    const creator = creatorData.data;

    // Step 2: Init draft upload via PULL_FROM_URL
    // Using a public sample 9:16 vertical video for sandbox demo
    const TEST_VIDEO_URL = 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4';

    const initRes = await fetch('https://open.tiktokapis.com/v2/post/publish/inbox/video/init/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        source_info: {
          source: 'PULL_FROM_URL',
          video_url: TEST_VIDEO_URL,
        },
      }),
    });

    const initData = await initRes.json();

    if (initData.error?.code !== 'ok') {
      return res.status(400).send(`
        <h2>Upload init failed</h2>
        <pre>${JSON.stringify(initData, null, 2)}</pre>
      `);
    }

    const publishId = initData.data?.publish_id;

    // Step 3: Poll status
    await new Promise(r => setTimeout(r, 3000));

    const statusRes = await fetch('https://open.tiktokapis.com/v2/post/publish/status/fetch/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ publish_id: publishId }),
    });
    const statusData = await statusRes.json();
    const status = statusData.data?.status || 'PROCESSING';

    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>TikTok Upload Test — Open Acre</title>
        <style>
          body { font-family: -apple-system, sans-serif; max-width: 600px; margin: 60px auto; padding: 0 20px; }
          .card { background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 20px 0; }
          .success { color: #22c55e; font-size: 18px; font-weight: 600; }
          .label { color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .value { font-family: monospace; font-size: 13px; }
          pre { background: #1a1d27; color: #38e8b5; padding: 16px; border-radius: 8px; font-size: 11px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <p class="success">✅ Draft video upload initiated</p>
        <div class="card">
          <div class="label">Creator Username</div>
          <div class="value">@${creator.creator_username || '—'}</div>
          <br>
          <div class="label">Privacy Level</div>
          <div class="value">${creator.privacy_level_options?.join(', ') || '—'}</div>
          <br>
          <div class="label">Publish ID</div>
          <div class="value">${publishId}</div>
          <br>
          <div class="label">Status</div>
          <div class="value">${status}</div>
        </div>
        <p style="color:#6b7280">
          The video has been sent to your TikTok inbox as a draft.
          Open the TikTok app → Inbox → tap the draft to review and publish.
        </p>
        <h3>Full API Response</h3>
        <pre>${JSON.stringify({ creatorData, initData, statusData }, null, 2)}</pre>
      </body>
      </html>
    `);

  } catch (err) {
    return res.status(500).send(`<h2>Error</h2><pre>${err.message}</pre>`);
  }
}
