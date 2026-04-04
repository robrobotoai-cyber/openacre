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
    // Return success anyway to not break UX
    return res.status(200).json({ success: true })
  }
}
