import Head from 'next/head'
import { DEFAULT_MARKET } from '../config/markets'

export default function Home() {
  return (
    <>
      <Head>
        <title>Open Acre — Free Septic Tools & Contractor Directory</title>
        <meta name="description" content="Free septic system tools, guides, and verified contractor directory. Pump calculators, compliance checkers, and maintenance guides for homeowners and real estate professionals." />
        <meta name="keywords" content={DEFAULT_MARKET.meta.keywords} />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Open Acre',
              description: 'Free septic tools and verified contractor directory',
              url: 'https://openacre.co',
              applicationCategory: 'Utility',
              sameAs: [
                'https://www.facebook.com/openacre',
              ],
            }),
          }}
        />
      </Head>

      {/* NAV */}
      <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: '58px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13" stroke="#1c2333" strokeWidth="1.8"/>
            <line x1="4" y1="15" x2="26" y2="15" stroke="#9b7a42" strokeWidth="1.5"/>
            <path d="M8.5 15 A6.5 6.5 0 0 1 21.5 15" stroke="#9b7a42" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <line x1="6" y1="19" x2="24" y2="19" stroke="#9b7a42" strokeWidth="0.7" opacity="0.5"/>
            <line x1="8" y1="22.5" x2="22" y2="22.5" stroke="#9b7a42" strokeWidth="0.7" opacity="0.28"/>
          </svg>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', color: 'var(--midnight)' }}>Open <span style={{ color: 'var(--prairie)' }}>Acre</span></span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/blog" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', textDecoration: 'none', cursor: 'pointer' }}>Blog</a>
          <button style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', background: 'none', border: 'none', cursor: 'pointer' }}>Are you a provider?</button>
          <button style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Get a free quote</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(to right, rgba(20,26,38,0.72) 0%, rgba(20,26,38,0.42) 55%, rgba(20,26,38,0.10) 100%), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80") center / cover', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '640px', padding: '44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.28)', color: '#e8d9b8', fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', padding: '5px 12px', borderRadius: '20px', marginBottom: '18px', width: 'fit-content' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7ec87e' }}></div>
            SEPTIC SYSTEM GUIDES & TOOLS
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '44px', fontWeight: 'normal', color: '#f4f0e8', lineHeight: 1.12, marginBottom: '14px', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            Everything you need to know about your septic system.
          </h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'rgba(220,215,200,0.9)', lineHeight: 1.65, marginBottom: '28px', maxWidth: '430px' }}>
            Free tools to understand your system, find licensed contractors, and learn best practices for maintenance and repairs.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#tools" style={{ display: 'inline-block', background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '14px', fontWeight: 600, padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', cursor: 'pointer' }}>
              Try Our Tools →
            </a>
            <a href="/blog" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: '#f4f0e8', fontFamily: 'system-ui, sans-serif', fontSize: '14px', fontWeight: 600, padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', cursor: 'pointer' }}>
              Read the Blog →
            </a>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '14px 44px', display: 'flex', gap: '28px', alignItems: 'center' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate-light)', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></div>
          Verified contractor directory nationwide
        </div>
        <div style={{ width: '1px', height: '18px', background: 'var(--birch)' }}></div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate-light)', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></div>
          DOH & L&I verified
        </div>
        <div style={{ width: '1px', height: '18px', background: 'var(--birch)' }}></div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate-light)', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></div>
          Free quotes, no obligation
        </div>
      </div>

      {/* TOOLS SECTION */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'var(--prairie)', marginBottom: '12px' }}>
            FREE TOOLS
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '10px' }}>
            Tools to help you manage your septic system.
          </div>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '600px' }}>
            No signup required. Get instant answers to common septic questions, completely free.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Tool Card 1: Pump Calculator */}
            <a href="/tools/pump-calculator" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 12px rgba(155, 122, 66, 0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="13" r="6" stroke="#c8a96e" strokeWidth="1.5"/>
                    <path d="M12 7 L12 3" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 4.5 Q12 2 16 4.5" stroke="#c8a96e" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                    <circle cx="12" cy="13" r="2" fill="#c8a96e" opacity="0.4"/>
                  </svg>
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '17px', color: 'var(--midnight)', marginBottom: '6px' }}>Pump-Out Calculator</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.6 }}>Find out when your septic tank needs pumping based on household size and tank capacity.</div>
              </div>
            </a>

            {/* Tool Card 2: License Verifier */}
            <a href="/tools/license-verifier" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 12px rgba(155, 122, 66, 0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12 Q6 6 12 6 Q18 6 18 12 Q18 18 12 18 Q6 18 6 12Z" stroke="#c8a96e" strokeWidth="1.4" fill="none"/>
                    <path d="M9 12 L11 14 L15 10" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '17px', color: 'var(--midnight)', marginBottom: '6px' }}>Verify Contractor License</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.6 }}>Check a contractor's license status, bond, and insurance directly from Washington L&I.</div>
              </div>
            </a>

            {/* Tool Card 3: Compliance Checker */}
            <a href="/tools/compliance-checker" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 12px rgba(155, 122, 66, 0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="12" width="16" height="8" rx="1.5" stroke="#c8a96e" strokeWidth="1.4"/>
                    <path d="M4 12 L12 6 L20 12" stroke="#c8a96e" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
                    <path d="M9 17 L11 19 L15 15" stroke="#c8a96e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '17px', color: 'var(--midnight)', marginBottom: '6px' }}>Compliance Checker</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.6 }}>Verify your property has a compliant septic inspection for sale or transfer.</div>
              </div>
            </a>

            {/* Tool Card 4: Risk Assessment */}
            <a href="/tools/failure-risk-assessment" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 12px rgba(155, 122, 66, 0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19 L8 10 L13 14 L20 6" stroke="#c8a96e" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
                    <circle cx="12" cy="12" r="10" stroke="#c8a96e" strokeWidth="1.3" fill="none" opacity="0.4"/>
                  </svg>
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '17px', color: 'var(--midnight)', marginBottom: '6px' }}>Risk Assessment</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.6 }}>Answer 8 questions to assess your septic system's failure risk.</div>
              </div>
            </a>

            {/* Tool Card 5: County Requirements */}
            <a href="/tools/county-requirements" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 12px rgba(155, 122, 66, 0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 8 L19 8 L19 19 Q19 20 18 20 L6 20 Q5 20 5 19 Z" stroke="#c8a96e" strokeWidth="1.4" fill="none"/>
                    <path d="M9 8 L9 5 Q9 4 10 4 L14 4 Q15 4 15 5 L15 8" stroke="#c8a96e" strokeWidth="1.3" fill="none"/>
                    <line x1="9" y1="12" x2="15" y2="12" stroke="#c8a96e" strokeWidth="1.2"/>
                    <line x1="9" y1="16" x2="15" y2="16" stroke="#c8a96e" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '17px', color: 'var(--midnight)', marginBottom: '6px' }}>County Requirements</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.6 }}>Look up septic inspection requirements for any Washington county.</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'var(--midnight)', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#e8e4dc' }}>
          Open <span style={{ color: 'var(--fieldstone)' }}>Acre</span>
        </div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: '#4a5568', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span>Serving {DEFAULT_MARKET.name}, {DEFAULT_MARKET.state} · Septic Services · © 2026 Open Acre</span>
          <div style={{ display: 'flex', gap: '12px', borderLeft: '1px solid #4a5568', paddingLeft: '16px' }}>
            <a href="/privacy" style={{ color: '#4a5568', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#4a5568', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}
