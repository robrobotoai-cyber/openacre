/**
 * Quote request endpoint
 * Stores lead in Redis and sends notification email via Resend
 */

import { createClient } from 'redis'

let redisClient = null

async function getRedisClient() {
  if (redisClient) return redisClient
  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) throw new Error('REDIS_URL not configured')
  redisClient = createClient({ url: redisUrl })
  redisClient.on('error', (err) => console.error('Redis error:', err))
  await redisClient.connect()
  return redisClient
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, jobType, zip, notes, timestamp } = req.body

  if (!name || !email || !jobType || !zip) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const entry = {
    name,
    email,
    phone: phone || '',
    jobType,
    zip,
    notes: notes || '',
    timestamp: timestamp || new Date().toISOString(),
    status: 'new'
  }

  try {
    // Store in Redis
    const client = await getRedisClient()
    await Promise.all([
      client.rPush('quote-requests:all', JSON.stringify(entry)),
      client.rPush(`quote-requests:zip:${zip}`, JSON.stringify(entry)),
    ])
  } catch (err) {
    console.error('Redis error storing quote request:', err)
    // Don't block submission on Redis failure
  }

  // Send notification email via Resend
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Open Acre <hello@openacre.co>',
          to: ['hello@openacre.co'],
          subject: `New quote request — ${jobType} in ${zip}`,
          html: `
            <h2>New Quote Request</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Job Type</td><td style="padding:8px">${jobType}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Zip Code</td><td style="padding:8px">${zip}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Notes</td><td style="padding:8px">${notes || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Submitted</td><td style="padding:8px">${entry.timestamp}</td></tr>
            </table>
          `,
        }),
      })
    }
  } catch (err) {
    console.error('Resend error:', err)
    // Don't block submission on email failure
  }

  return res.status(200).json({ success: true })
}
