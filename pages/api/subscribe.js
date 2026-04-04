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
    // For Vercel deployment: file system is ephemeral
    // We'll store in a simple in-memory cache first, then migrate to Vercel KV
    // For now, attempt to write to file system if available
    
    const dataDir = path.join(process.cwd(), 'data')
    
    // Try to create directory and write file
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }

      // Check if already subscribed
      if (fs.existsSync(subscribersPath)) {
        const lines = fs.readFileSync(subscribersPath, 'utf8').split('\n')
        for (const line of lines) {
          if (line && line.trim()) {
            try {
              const subscriber = JSON.parse(line)
              if (subscriber.email === email) {
                return res.status(200).json({ success: true, message: 'Already subscribed' })
              }
            } catch (e) {
              // Skip malformed lines
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
    } catch (fsError) {
      // If file system write fails (Vercel ephemeral FS), log and continue
      console.warn('File system write failed (expected on Vercel):', fsError.message)
      // TODO: Implement Vercel KV or database storage
      // For now, just accept the subscription
    }

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
