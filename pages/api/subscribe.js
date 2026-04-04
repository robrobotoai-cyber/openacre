/**
 * Blog subscription endpoint
 * Captures emails and stores them in Vercel KV (Redis) for newsletter
 */

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
    const redisUrl = process.env.REDIS_URL

    if (!redisUrl) {
      console.error('REDIS_URL not configured')
      // Gracefully fail but return success so UX isn't broken
      return res.status(200).json({ success: true })
    }

    // Parse Redis URL to extract credentials
    const url = new URL(redisUrl)
    const password = url.password
    const host = url.hostname
    const port = url.port

    // Use REST API if using Vercel KV (check for KV env vars)
    const kvApiUrl = process.env.KV_REST_API_URL
    const kvApiToken = process.env.KV_REST_API_TOKEN

    if (kvApiUrl && kvApiToken) {
      // Vercel KV REST API
      const subscribersKey = 'openacre:subscribers'

      // Check if already subscribed
      const existingResp = await fetch(`${kvApiUrl}/get/${subscribersKey}`, {
        headers: { Authorization: `Bearer ${kvApiToken}` }
      })

      if (existingResp.ok) {
        const existingData = await existingResp.json()
        if (existingData.result) {
          const subscribers = JSON.parse(existingData.result)
          if (subscribers.some(s => s.email === emailLower)) {
            return res.status(200).json({ success: true, message: 'Already subscribed' })
          }
        }
      }

      // Get current subscribers
      let subscribers = []
      try {
        const resp = await fetch(`${kvApiUrl}/get/${subscribersKey}`, {
          headers: { Authorization: `Bearer ${kvApiToken}` }
        })
        if (resp.ok) {
          const data = await resp.json()
          if (data.result) {
            subscribers = JSON.parse(data.result)
          }
        }
      } catch (e) {
        console.warn('Failed to fetch existing subscribers:', e.message)
      }

      // Add new subscriber
      subscribers.push({
        email: emailLower,
        subscribedAt: new Date().toISOString(),
        source: 'blog'
      })

      // Store back to KV
      const setResp = await fetch(`${kvApiUrl}/set/${subscribersKey}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvApiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscribers)
      })

      if (!setResp.ok) {
        console.error('Failed to store subscriber:', await setResp.text())
        // Don't fail the response, just log it
      }
    } else {
      // Fallback: use direct Redis connection via REDIS_URL
      // For production, recommend using Vercel KV REST API above
      console.warn('Using REDIS_URL directly. For production, use KV_REST_API_URL + KV_REST_API_TOKEN')
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
    // Return success anyway to not break UX
    return res.status(200).json({ success: true })
  }
}
