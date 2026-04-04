/**
 * Blog subscription endpoint
 * Captures emails and stores them in Redis for newsletter
 */

import { createClient } from 'redis'

let redisClient = null

async function getRedisClient() {
  if (redisClient) {
    return redisClient
  }

  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable not configured')
  }

  redisClient = createClient({ url: redisUrl })
  
  redisClient.on('error', (err) => {
    console.error('Redis client error:', err)
    redisClient = null
  })

  await redisClient.connect()
  return redisClient
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  try {
    const emailLower = email.toLowerCase()
    const subscribersKey = 'openacre:subscribers'

    const client = await getRedisClient()

    // Get existing subscribers
    let subscribers = []
    try {
      const existing = await client.get(subscribersKey)
      if (existing) {
        subscribers = JSON.parse(existing)
      }
    } catch (e) {
      console.warn('Failed to fetch existing subscribers:', e.message)
    }

    // Check if already subscribed
    if (subscribers.some(s => s.email === emailLower)) {
      return res.status(200).json({ success: true, message: 'Already subscribed' })
    }

    // Add new subscriber
    subscribers.push({
      email: emailLower,
      subscribedAt: new Date().toISOString(),
      source: 'blog'
    })

    // Store back to Redis
    await client.set(subscribersKey, JSON.stringify(subscribers))

    // Send welcome email via Resend
    const resendKey = process.env.RESEND_API_KEY
    console.log('RESEND_API_KEY present:', !!resendKey)
    
    if (resendKey) {
      try {
        console.log('Sending welcome email to:', emailLower)
        const emailPayload = {
          from: 'hello@openacre.co',
          to: emailLower,
          subject: 'Welcome to Open Acre',
          html: `
            <div style="font-family: Georgia, serif; color: #1c2333; max-width: 600px; margin: 0 auto;">
              <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome to Open Acre</h1>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
                Thanks for subscribing. You'll receive updates about septic systems, maintenance guides, and local regulations as they change.
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
                In the meantime, explore our free tools:
              </p>
              <ul style="font-size: 15px; line-height: 1.8; margin-bottom: 24px; margin-left: 20px;">
                <li><a href="https://openacre.co/tools/pump-calculator" style="color: #9b7a42; text-decoration: none;">Pump-Out Calculator</a> — Know when your tank needs pumping</li>
                <li><a href="https://openacre.co/tools/license-verifier" style="color: #9b7a42; text-decoration: none;">License Verifier</a> — Check contractor credentials</li>
                <li><a href="https://openacre.co/tools/failure-risk-assessment" style="color: #9b7a42; text-decoration: none;">Risk Assessment</a> — Evaluate your system's health</li>
              </ul>
              <p style="font-size: 14px; color: #666; margin-top: 32px; border-top: 1px solid #e0d9cf; padding-top: 16px;">
                Open Acre • Septic System Guides & Tools<br/>
                <a href="https://openacre.co" style="color: #9b7a42; text-decoration: none;">openacre.co</a>
              </p>
            </div>
          `
        }

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        })

        const responseText = await response.text()
        console.log('Resend API response status:', response.status)
        console.log('Resend API response:', responseText)

        if (!response.ok) {
          console.error('Failed to send welcome email. Status:', response.status, 'Body:', responseText)
        } else {
          console.log('Welcome email sent successfully')
        }
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError)
        // Don't fail the subscription if email fails
      }
    } else {
      console.warn('RESEND_API_KEY not configured')
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error subscribing:', error)
    // Return success anyway to not break UX
    return res.status(200).json({ success: true })
  }
}
