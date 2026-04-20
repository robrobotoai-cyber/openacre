/**
 * pages/api/webhooks/sms.js
 *
 * Twilio SMS inbound webhook for Open Acre.
 * Handles: toll-free +1-866-854-6077 and 10DLC +1-415-843-8706
 *
 * Twilio validates requests using a signature header.
 * For now we log and auto-reply — extend with lead routing logic later.
 */

import { URLSearchParams } from 'url';
import crypto from 'crypto';

// Validate Twilio signature to confirm request is genuine
function validateTwilioSignature(req) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) return true; // skip validation if token not set (dev)

  const signature = req.headers['x-twilio-signature'];
  if (!signature) return false;

  // Build the URL Twilio signed
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host  = req.headers['x-forwarded-host'] || req.headers.host;
  const url   = `${proto}://${host}${req.url}`;

  // Sort POST params and append to URL
  const body = req.body || {};
  const sortedParams = Object.keys(body).sort().reduce((str, key) => {
    return str + key + body[key];
  }, url);

  const expected = crypto
    .createHmac('sha1', authToken)
    .update(sortedParams)
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// TwiML response helper
function twiml(message) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${message}</Message>
</Response>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  // Validate signature (log warning but don't hard-block during testing)
  if (!validateTwilioSignature(req)) {
    console.warn('Invalid Twilio signature — possible spoofed request');
    // return res.status(403).send('Forbidden'); // enable in production
  }

  const {
    From,
    To,
    Body,
    MessageSid,
    NumMedia,
  } = req.body;

  console.log(`SMS inbound | ${From} → ${To} | "${Body}" | SID: ${MessageSid}`);

  // Normalize body
  const text = (Body || '').trim().toUpperCase();

  // STOP / HELP handled automatically by Twilio carrier — but catch HELP for custom reply
  if (text === 'HELP') {
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml(
      'Open Acre: For help with your septic service request, reply here or call us. ' +
      'Msg & data rates may apply. Reply STOP to opt out.'
    ));
  }

  // Quote or service request keywords
  const isQuoteRequest = /quote|estimate|price|cost|how much|septic|service|pump|repair/i.test(Body || '');

  if (isQuoteRequest) {
    // TODO: route to contractor matching / CRM
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml(
      `Thanks for reaching out to Open Acre! We'll match you with a qualified local septic contractor shortly. ` +
      `Reply STOP to opt out.`
    ));
  }

  // Forward inbound SMS to jay@vicario.ai via Resend email notification
  try {
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Open Acre SMS <hello@openacre.co>',
          to: ['jay@vicario.ai'],
          subject: `SMS from ${From}`,
          text: [
            `New inbound SMS on Open Acre`,
            ``,
            `From:    ${From}`,
            `To:      ${To}`,
            `Message: ${Body}`,
            `SID:     ${MessageSid}`,
            `Media:   ${NumMedia > 0 ? NumMedia + ' attachment(s)' : 'none'}`,
            ``,
            `Reply via Twilio console or automated response.`,
          ].join('\n'),
        }),
      });
    }
  } catch (err) {
    console.error('Failed to send SMS notification email:', err.message);
  }

  // Default reply for unrecognized messages
  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send(twiml(
    `Thanks for your message! An Open Acre team member will follow up with you shortly. ` +
    `Reply STOP to opt out.`
  ));
}

// Required: disable Next.js default body parser so we get raw POST params
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
