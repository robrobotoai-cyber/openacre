/**
 * API endpoint to capture tool usage by zip code
 * Stores entries in Redis as a list keyed by tool name
 */

import { createClient } from 'redis'

let redisClient = null

async function getRedisClient() {
  if (redisClient) return redisClient

  const redisUrl = process.env.REDIS_URL
  if (!redisUrl) throw new Error('REDIS_URL environment variable not configured')

  redisClient = createClient({ url: redisUrl })
  redisClient.on('error', (err) => console.error('Redis error:', err))
  await redisClient.connect()
  return redisClient
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { zipCode, toolName, timestamp } = req.body

  if (!zipCode || !toolName) {
    return res.status(400).json({ error: 'Missing zipCode or toolName' })
  }

  try {
    const client = await getRedisClient()

    const entry = JSON.stringify({
      zipCode: zipCode.substring(0, 5),
      toolName,
      timestamp: timestamp || new Date().toISOString()
    })

    // Append to a list per tool, and a global list
    await Promise.all([
      client.rPush(`tool-usage:${toolName}`, entry),
      client.rPush('tool-usage:all', entry)
    ])

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error tracking zip code:', error)
    // Don't block the user — log and return success anyway
    return res.status(200).json({ success: true, tracked: false })
  }
}
