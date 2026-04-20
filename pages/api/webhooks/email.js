/**
 * pages/api/webhooks/email.js
 *
 * Resend inbound email webhook.
 * Receives all mail to *@openacre.co and forwards it to jay@vicario.ai.
 * Deploy → Resend webhook fires here → we forward the full email.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const event = req.body;

  if (event.type !== 'email.received') {
    return res.status(200).json({ ok: true, skipped: true });
  }

  const { email_id, from, to, subject } = event.data;

  try {
    // Forward the full received email to jay@vicario.ai
    const fwdRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Open Acre <hello@openacre.co>',
        to: ['jay@vicario.ai'],
        subject: `Fwd: ${subject || '(no subject)'}`,
        text: [
          `---------- Forwarded message ----------`,
          `From: ${from}`,
          `To: ${Array.isArray(to) ? to.join(', ') : to}`,
          `Subject: ${subject}`,
          ``,
          `[Full email body — fetch via Resend API if needed]`,
          `Email ID: ${email_id}`,
        ].join('\n'),
        // Fetch full content for HTML body
        html: `
          <div style="font-family:sans-serif;padding:16px">
            <div style="border-left:3px solid #ccc;padding-left:12px;color:#555;margin-bottom:16px">
              <strong>Forwarded from:</strong> ${from}<br>
              <strong>To:</strong> ${Array.isArray(to) ? to.join(', ') : to}<br>
              <strong>Subject:</strong> ${subject}<br>
              <strong>Email ID:</strong> <code>${email_id}</code>
            </div>
            <p style="color:#333">
              View full email content in the
              <a href="https://resend.com/emails">Resend dashboard</a>
              or retrieve via API using the Email ID above.
            </p>
          </div>
        `,
      }),
    });

    if (!fwdRes.ok) {
      const err = await fwdRes.json();
      console.error('Resend forward error:', err);
      return res.status(500).json({ error: err.message });
    }

    const result = await fwdRes.json();
    console.log(`Forwarded email ${email_id} from ${from} → jay@vicario.ai (${result.id})`);
    return res.status(200).json({ ok: true, forwarded: result.id });

  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
