import Head from 'next/head'
import Link from 'next/link'
import { getMarket } from '../config/markets'

const market = getMarket('island-county')

export default function IslandCounty() {
  return (
    <>
      <Head>
        <title>{market.meta.title}</title>
        <meta name="description" content={market.meta.description} />
        <meta name="keywords" content={market.meta.keywords} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Open Acre',
          description: `Septic contractor directory for ${market.name}`,
          areaServed: { '@type': 'Place', name: market.name },
          url: 'https://openacre.co/island-county'
        })}} />
      </Head>

      {/* NAV */}
      <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: '58px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13" stroke="#1c2333" strokeWidth="1.8"/>
            <line x1="4" y1="15" x2="26" y2="15" stroke="#9b7a42" strokeWidth="1.5"/>
            <path d="M8.5 15 A6.5 6.5 0 0 1 21.5 15" stroke="#9b7a42" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <line x1="6" y1="19" x2="24" y2="19" stroke="#9b7a42" strokeWidth="0.7" opacity="0.5"/>
            <line x1="8" y1="22.5" x2="22" y2="22.5" stroke="#9b7a42" strokeWidth="0.7" opacity="0.28"/>
          </svg>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', color: 'var(--midnight)' }}>Open <span style={{ color: 'var(--prairie)' }}>Acre</span></span>
        </Link>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: 'var(--slate-light)' }}>
          <Link href="/" style={{ color: 'var(--slate-light)', textDecoration: 'none', marginRight: '12px' }}>Home</Link>
          <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>{market.name}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', background: 'none', border: 'none', cursor: 'pointer' }}>Are you a provider?</button>
          <a href="/get-quote" style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '6px', textDecoration: 'none', display: 'inline-block' }}>Get a free quote</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(to right, rgba(20,26,38,0.72) 0%, rgba(20,26,38,0.42) 55%, rgba(20,26,38,0.10) 100%), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80") center / cover', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '640px', padding: '44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.28)', color: '#e8d9b8', fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', padding: '5px 12px', borderRadius: '20px', marginBottom: '18px', width: 'fit-content' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7ec87e' }}></div>
            {market.name.toUpperCase()} · SEPTIC SERVICES
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '44px', fontWeight: 'normal', color: '#f4f0e8', lineHeight: 1.12, marginBottom: '14px', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            Septic pros who know<br /><em style={{ color: 'var(--fieldstone)', fontStyle: 'italic' }}>{market.region}.</em>
          </h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'rgba(220,215,200,0.9)', lineHeight: 1.65, marginBottom: '28px', maxWidth: '430px' }}>
            Installation, repair, pumping, and inspections from licensed local contractors — on {market.region} and surrounding areas.
          </p>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '20px 44px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate-light)', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></div>
            {market.contractors_count} licensed providers in {market.name}
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
      </div>

      {/* TOOLS SECTION */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'var(--prairie)', marginBottom: '12px' }}>FREE TOOLS</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '28px' }}>Tools to help you manage your septic system.</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <Link href="/tools/pump-calculator" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '8px', padding: '20px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 8px rgba(155,122,66,0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: 'var(--midnight)', marginBottom: '6px' }}>Pump-Out Calculator</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.5 }}>Know when your tank needs pumping.</div>
              </div>
            </Link>
            <Link href="/tools/license-verifier" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '8px', padding: '20px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 8px rgba(155,122,66,0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: 'var(--midnight)', marginBottom: '6px' }}>Verify Contractor License</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.5 }}>Check license status + insurance.</div>
              </div>
            </Link>
            <Link href="/tools/compliance-checker" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '8px', padding: '20px', cursor: 'pointer', transition: 'all 0.15s', height: '100%' }} onMouseEnter={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--prairie)', boxShadow: '0 2px 8px rgba(155,122,66,0.1)' })} onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--birch)', boxShadow: 'none' })}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: 'var(--midnight)', marginBottom: '6px' }}>Compliance Checker</div>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', lineHeight: 1.5 }}>Verify property transfer compliance.</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--parchment)', padding: '48px 44px', borderTop: '1px solid var(--birch)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', marginBottom: '12px', color: 'var(--midnight)' }}>Ready to find a contractor?</h2>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px', color: 'var(--slate)', marginBottom: '20px' }}>Get free quotes from licensed {market.name} septic professionals.</p>
          <button style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '14px', fontWeight: 600, padding: '12px 28px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
            Get a free quote
          </button>
        </div>
      </div>

      <footer style={{ background: 'var(--midnight)', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#e8e4dc' }}>Open <span style={{ color: 'var(--fieldstone)' }}>Acre</span></div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: '#4a5568', display: 'flex', gap: '12px' }}>
          <span>© 2026 Open Acre</span>
          <div style={{ display: 'flex', gap: '10px', borderLeft: '1px solid #4a5568', paddingLeft: '10px' }}>
            <Link href="/privacy" style={{ color: '#4a5568', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ color: '#4a5568', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
