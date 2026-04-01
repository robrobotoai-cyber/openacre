import Head from 'next/head'
import { DEFAULT_MARKET } from '../config/markets'

export default function Home() {
  return (
    <>
      <Head>
        <title>{DEFAULT_MARKET.meta.title}</title>
        <meta name="description" content={DEFAULT_MARKET.meta.description} />
        <meta name="keywords" content={DEFAULT_MARKET.meta.keywords} />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Open Acre',
              description: 'Septic contractor directory and tools for Island County, WA',
              url: 'https://openacre.co',
              areaServed: {
                '@type': 'Place',
                name: 'Island County, WA',
              },
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
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: 'var(--slate-light)' }}>
          Services › <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>Septic</span> › {DEFAULT_MARKET.name}, {DEFAULT_MARKET.state}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', background: 'none' }}>Are you a provider?</button>
          <button style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '6px', border: 'none' }}>Get a free quote</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(to right, rgba(20,26,38,0.72) 0%, rgba(20,26,38,0.42) 55%, rgba(20,26,38,0.10) 100%), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80") center / cover', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '640px', padding: '44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.28)', color: '#e8d9b8', fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', padding: '5px 12px', borderRadius: '20px', marginBottom: '18px', width: 'fit-content' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7ec87e' }}></div>
            {DEFAULT_MARKET.name.toUpperCase()}, {DEFAULT_MARKET.state} · SEPTIC SERVICES
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '44px', fontWeight: 'normal', color: '#f4f0e8', lineHeight: 1.12, marginBottom: '14px', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            Septic pros who know<br /><em style={{ color: 'var(--fieldstone)', fontStyle: 'italic' }}>{DEFAULT_MARKET.region}.</em>
          </h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'rgba(220,215,200,0.9)', lineHeight: 1.65, marginBottom: '28px', maxWidth: '430px' }}>
            Installation, repair, pumping, and inspections from licensed local contractors — on {DEFAULT_MARKET.region.split(' & ').join(', ')} and surrounding areas.
          </p>
          <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.22)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 16px', flex: 1, borderRight: '1px solid var(--birch)' }}>
              <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: 'var(--prairie)', marginBottom: '3px' }}>WHAT DO YOU NEED?</div>
              <input style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px', color: 'var(--slate)', border: 'none', outline: 'none', background: 'none' }} placeholder="e.g. septic inspection, pump-out…" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 16px', flex: '0 0 148px', borderRight: 'none' }}>
              <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: 'var(--prairie)', marginBottom: '3px' }}>ZIP CODE</div>
              <input style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px', color: 'var(--slate)', border: 'none', outline: 'none', background: 'none' }} placeholder="e.g. 98277" />
            </div>
            <button style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '14px', fontWeight: 600, padding: '0 22px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Find pros →</button>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '14px 44px', display: 'flex', gap: '28px', alignItems: 'center' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate-light)', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></div>
          {DEFAULT_MARKET.contractors_count} licensed providers in {DEFAULT_MARKET.name}
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

      {/* PLACEHOLDER: Tools CTA */}
      <div style={{ background: 'var(--parchment)', padding: '48px 44px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '10px' }}>Free septic tools coming this week</div>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto' }}>
          Pump-out calculator, license verifier, and property transfer compliance checker launching soon.
        </p>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'var(--midnight)', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#e8e4dc' }}>
          Open <span style={{ color: 'var(--fieldstone)' }}>Acre</span>
        </div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: '#4a5568' }}>
          Serving {DEFAULT_MARKET.name}, {DEFAULT_MARKET.state} · Septic Services · © 2026 Open Acre
        </div>
      </footer>
    </>
  )
}
