/**
 * ToolWrapper - Adds zip code capture to any tool
 * Tracks geographic distribution of tool usage
 */

import { useState } from 'react'

export default function ToolWrapper({ children, toolName }) {
  const [zipCode, setZipCode] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleZipSubmit = async (e) => {
    e.preventDefault()
    if (!zipCode || zipCode.length < 5) {
      alert('Please enter a valid 5-digit zip code')
      return
    }

    // Send to Resend via API route
    try {
      const res = await fetch('/api/track-zipcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode, toolName, timestamp: new Date().toISOString() })
      })
      
      if (res.ok) {
        setSubmitted(true)
        // Mark in localStorage so we don't ask again this session
        localStorage.setItem(`tool-${toolName}-zip`, zipCode)
      }
    } catch (err) {
      console.error('Error tracking zip code:', err)
    }
  }

  // Check if we already have zip for this tool this session
  const savedZip = typeof window !== 'undefined' ? localStorage.getItem(`tool-${toolName}-zip`) : null

  if (savedZip || submitted) {
    // Already captured, just show the tool
    return children
  }

  return (
    <div style={{ background: 'var(--parchment)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
      <form onSubmit={handleZipSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px', color: 'var(--midnight)' }}>
            Where are you located? (optional)
          </label>
          <input
            type="text"
            placeholder="Enter zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            maxLength="5"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid var(--birch)',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'system-ui, sans-serif',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: 'var(--prairie)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          Continue
        </button>
      </form>
      <div style={{ fontSize: '12px', color: 'var(--slate-light)', marginTop: '8px' }}>
        We use this to understand where our content is most valuable. No spam, no sharing.
      </div>
    </div>
  )
}
