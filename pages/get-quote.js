import Head from 'next/head'
import { useState } from 'react'

const JOB_TYPES = [
  'Septic inspection',
  'Septic pump-out',
  'Septic repair',
  'New septic installation',
  'Drain field repair or replacement',
  'Septic system design',
  'Other',
]

export default function GetQuote() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', jobType: '', zip: '', notes: '', smsConsent: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.jobType || !form.zip) {
      setError('Please fill in all required fields.')
      return
    }
    if (form.phone && !form.smsConsent) {
      setError('Please confirm SMS consent or remove your phone number.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Get a Free Quote — Open Acre</title>
        <meta name="description" content="Get free quotes from licensed septic contractors in your area." />
      </Head>

      {/* NAV */}
      <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: '58px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13" stroke="#1c2333" strokeWidth="1.8"/>
            <line x1="4" y1="15" x2="26" y2="15" stroke="#9b7a42" strokeWidth="1.5"/>
            <path d="M8.5 15 A6.5 6.5 0 0 1 21.5 15" stroke="#9b7a42" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <line x1="6" y1="19" x2="24" y2="19" stroke="#9b7a42" strokeWidth="0.7" opacity="0.5"/>
            <line x1="8" y1="22.5" x2="22" y2="22.5" stroke="#9b7a42" strokeWidth="0.7" opacity="0.28"/>
          </svg>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', color: 'var(--midnight)' }}>Open <span style={{ color: 'var(--prairie)' }}>Acre</span></span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/blog" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', textDecoration: 'none' }}>Blog</a>
          <a href="/get-quote" style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '6px', textDecoration: 'none' }}>Get a free quote</a>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '40px 44px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'var(--prairie)', marginBottom: '12px' }}>FREE SERVICE</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '12px' }}>Get a free septic quote</h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', lineHeight: 1.65 }}>
            Tell us about your project and we'll connect you with licensed contractors in your area. No spam, no obligation.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div style={{ background: 'var(--parchment)', minHeight: '60vh', padding: '48px 24px' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          {submitted ? (
            <div style={{ background: 'var(--white)', borderRadius: '10px', padding: '48px', textAlign: 'center', border: '1px solid var(--birch)' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '12px' }}>Request received</h2>
              <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', lineHeight: 1.65, marginBottom: '24px' }}>
                We'll be in touch shortly with contractor matches in your area.
              </p>
              <a href="/" style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '10px 24px', borderRadius: '6px', textDecoration: 'none' }}>Back to home</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: 'var(--white)', borderRadius: '10px', padding: '36px', border: '1px solid var(--birch)' }}>
              {error && (
                <div style={{ background: '#fff0f0', border: '1px solid #f5c2c2', borderRadius: '6px', padding: '10px 14px', marginBottom: '20px', fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: '#c0392b' }}>
                  {error}
                </div>
              )}

              {/* Name */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--midnight)', marginBottom: '6px' }}>
                  Full name <span style={{ color: 'var(--prairie)' }}>*</span>
                </label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Jane Smith"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--birch)', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box' }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--midnight)', marginBottom: '6px' }}>
                  Email <span style={{ color: 'var(--prairie)' }}>*</span>
                </label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="jane@example.com"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--birch)', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box' }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--midnight)', marginBottom: '6px' }}>
                  Phone <span style={{ color: 'var(--slate-light)', fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="(360) 555-0100"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--birch)', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box' }}
                />
              </div>

              {/* SMS consent (only required if phone is provided) */}
              {form.phone && (
                <div style={{ marginBottom: '18px', background: '#fafaf5', border: '1px solid var(--birch)', borderRadius: '6px', padding: '12px 14px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: 'var(--midnight)', lineHeight: 1.5, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="smsConsent"
                      checked={form.smsConsent}
                      onChange={handleChange}
                      style={{ marginTop: '2px', flexShrink: 0 }}
                    />
                    <span>
                      By checking this box, I agree to receive SMS messages from Open Acre (a service of Meridian Automation LLC) at the number provided, including appointment scheduling, job status updates, quote follow-ups, and support replies. Msg &amp; data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. See our <a href="/privacy" style={{ color: 'var(--prairie)', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/terms" style={{ color: 'var(--prairie)', textDecoration: 'underline' }}>Terms</a>.
                    </span>
                  </label>
                </div>
              )}

              {/* Job type */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--midnight)', marginBottom: '6px' }}>
                  What do you need? <span style={{ color: 'var(--prairie)' }}>*</span>
                </label>
                <select
                  name="jobType" value={form.jobType} onChange={handleChange}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--birch)', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box', background: 'white' }}
                >
                  <option value="">Select a service...</option>
                  {JOB_TYPES.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>

              {/* Zip */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--midnight)', marginBottom: '6px' }}>
                  Zip code <span style={{ color: 'var(--prairie)' }}>*</span>
                </label>
                <input
                  type="text" name="zip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                  placeholder="98260"
                  maxLength="5"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--birch)', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box' }}
                />
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--midnight)', marginBottom: '6px' }}>
                  Additional details <span style={{ color: 'var(--slate-light)', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Describe your situation — tank size, last service date, any known issues..."
                  rows={4}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--birch)', borderRadius: '6px', fontSize: '14px', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', background: loading ? 'var(--slate-light)' : 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '15px', fontWeight: 600, padding: '13px', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Submitting...' : 'Request free quotes →'}
              </button>

              <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: 'var(--slate-light)', marginTop: '12px', textAlign: 'center' }}>
                No spam. No obligation. We only share your info with contractors you approve.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'var(--midnight)', color: '#aaa', padding: '24px 44px', fontFamily: 'system-ui, sans-serif', fontSize: '13px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>© 2026 Open Acre</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/privacy" style={{ color: '#aaa', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#aaa', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}
