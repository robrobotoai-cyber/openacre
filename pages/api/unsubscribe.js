/**
 * Unsubscribe endpoint
 * Removes email from subscribers list
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
  const { email } = req.query

  if (!email) {
    return res.status(400).json({ error: 'Email parameter required' })
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

    // Remove the email
    const originalLength = subscribers.length
    subscribers = subscribers.filter(s => s.email !== emailLower)

    if (subscribers.length < originalLength) {
      // Email was found and removed
      await client.set(subscribersKey, JSON.stringify(subscribers))
      console.log(`Unsubscribed: ${emailLower}`)
      
      return res.status(200).json({ 
        success: true, 
        message: 'You have been unsubscribed from Open Acre updates.' 
      })
    } else {
      // Email wasn't in the list
      return res.status(200).json({ 
        success: true, 
        message: 'Email not found in subscriber list.' 
      })
    }
  } catch (error) {
    console.error('Error unsubscribing:', error)
    return res.status(500).json({ error: 'Failed to unsubscribe' })
  }
}
