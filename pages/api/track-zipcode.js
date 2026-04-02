/**
 * API endpoint to capture tool usage by zip code
 * Stores data in a simple JSON log for now (can migrate to database later)
 */

import fs from 'fs'
import path from 'path'

const logPath = path.join(process.cwd(), 'data', 'tool-usage.jsonl')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { zipCode, toolName, timestamp } = req.body

  if (!zipCode || !toolName) {
    return res.status(400).json({ error: 'Missing zipCode or toolName' })
  }

  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Append to JSONL log (one entry per line)
    const entry = JSON.stringify({
      zipCode: zipCode.substring(0, 5), // Sanitize
      toolName,
      timestamp: timestamp || new Date().toISOString()
    })

    fs.appendFileSync(logPath, entry + '\n')

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error tracking zip code:', error)
    return res.status(500).json({ error: 'Failed to track usage' })
  }
}
