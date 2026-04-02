import Head from 'next/head'
import LicenseVerifier from '../../components/LicenseVerifier'

export default function LicenseVerifierPage() {
  return (
    <>
      <Head>
        <title>Verify Septic Contractor License — WA L&I Database | Open Acre</title>
        <meta
          name="description"
          content="Check a septic contractor's license status, bond, and insurance directly from the Washington Department of Labor & Industries. Free, real-time verification."
        />
        <meta
          name="keywords"
          content="verify contractor license Washington, WA L&I license check, septic contractor verification, contractor credentials"
        />
        {/* JSON-LD for Tool */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Contractor License Verifier',
              description: 'Look up and verify contractor licenses, bonds, and insurance from Washington Department of Labor & Industries',
              url: 'https://openacre.co/tools/license-verifier',
              applicationCategory: 'Utility',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
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
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: 'var(--slate-light)' }}>
          Tools › <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>License Verifier</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', background: 'none' }}>Are you a provider?</button>
          <button style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Get a free quote</button>
        </div>
      </nav>

      {/* Page Header */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '32px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'var(--prairie)', marginBottom: '12px' }}>
            FREE TOOL
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '12px' }}>
            Verify Contractor License
          </h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', lineHeight: 1.65 }}>
            Before hiring a septic contractor, verify their license status, bond, and insurance directly from the Washington Department of Labor & Industries. All data is public and updated daily.
          </p>
        </div>
      </div>

      {/* Tool Component */}
      <LicenseVerifier embedded={false} />

      {/* How It Works */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', marginBottom: '24px' }}>
            What This Tool Checks
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>License Status</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Confirms the contractor holds a valid, active license from the Washington Department of Labor & Industries.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>License Type</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Shows whether the contractor is licensed for general construction, electrical, plumbing, or specialized services.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Bond Coverage</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Verifies the contractor has a current surety bond covering their work and protecting you if things go wrong.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Insurance</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Confirms current liability and workers' compensation insurance, if applicable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: 'var(--parchment)', borderTop: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', marginBottom: '24px' }}>
            Common Questions
          </h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Is this data current?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Yes. This tool pulls directly from the Washington Department of Labor & Industries database, which is updated daily. Bond and insurance information is updated 3x per day.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>What if a contractor isn't found?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                If a contractor isn't found in the L&I database, they don't hold a current license from the State of Washington. This doesn't necessarily mean they're unlicensed — they might be licensed at the city or county level — but you should verify directly with your city or county before hiring.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Can I see violations or complaints?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                This tool shows license, bond, and insurance status only. For detailed violation history or complaints, contact the Washington Department of Labor & Industries directly at <a href="tel:+1-360-902-5800" style={{ color: 'var(--prairie)' }}>360-902-5800</a> or visit <a href="https://www.lni.wa.gov" style={{ color: 'var(--prairie)' }}>lni.wa.gov</a>.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Is there a fee to use this?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                No. This tool is completely free. Open Acre doesn't store your searches or sell your data. We just help you verify public information quickly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--green-light)', borderTop: '1px solid #c4d8c4', padding: '32px 44px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: 'var(--midnight)', marginBottom: '12px' }}>
            Found a contractor you trust?
          </h2>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px', color: 'var(--slate)', marginBottom: '20px' }}>
            Get a free quote and compare options from multiple contractors to ensure you're getting the right price.
          </p>
          <button style={{ background: 'var(--midnight)', color: 'var(--birch)', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '11px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
            Get free quotes →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'var(--midnight)', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#e8e4dc' }}>
          Open <span style={{ color: 'var(--fieldstone)' }}>Acre</span>
        </div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: '#4a5568', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span>Data from WA Department of Labor & Industries · © 2026 Open Acre</span>
          <div style={{ display: 'flex', gap: '10px', borderLeft: '1px solid #4a5568', paddingLeft: '10px' }}>
            <a href="/privacy" style={{ color: '#4a5568', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#4a5568', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}
