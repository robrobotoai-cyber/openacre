/**
 * Blog subscription endpoint
 * Captures emails and stores them for newsletter (via Resend)
 */

import fs from 'fs'
import path from 'path'

const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.jsonl')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Check if already subscribed
    if (fs.existsSync(subscribersPath)) {
      const lines = fs.readFileSync(subscribersPath, 'utf8').split('\n')
      for (const line of lines) {
        if (line) {
          const subscriber = JSON.parse(line)
          if (subscriber.email === email) {
            return res.status(200).json({ success: true, message: 'Already subscribed' })
          }
        }
      }
    }

    // Append new subscriber
    const entry = JSON.stringify({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      source: 'blog'
    })

    fs.appendFileSync(subscribersPath, entry + '\n')

    // TODO: Send welcome email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'hello@openacre.co',
    //   to: email,
    //   subject: 'Welcome to Open Acre',
    //   html: '<p>Thanks for subscribing!</p>'
    // })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error subscribing:', error)
    return res.status(500).json({ error: 'Subscription failed' })
  }
}
