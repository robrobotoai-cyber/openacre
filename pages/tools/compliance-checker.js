import Head from 'next/head'
import ComplianceChecker from '../../components/ComplianceChecker'

export default function ComplianceCheckerPage() {
  return (
    <>
      <Head>
        <title>Septic Inspection Compliance Checker — Property Transfer | Open Acre</title>
        <meta name="description" content="Check if your property has a compliant septic inspection on file for sale or transfer. Verify inspection requirements by Washington county." />
        <meta name="keywords" content="septic inspection property transfer, Washington septic compliance, pre-sale septic inspection, property transfer requirements" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Septic Compliance Checker', url: 'https://openacre.co/tools/compliance-checker', applicationCategory: 'Utility', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }) }} />
      </Head>

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
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: 'var(--slate-light)' }}>Tools › <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>Compliance Checker</span></div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', background: 'none', border: 'none', cursor: 'pointer' }}>Are you a provider?</button>
          <button style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Get a free quote</button>
        </div>
      </nav>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '32px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'var(--prairie)', marginBottom: '12px' }}>FREE TOOL</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '12px' }}>Property Transfer Compliance Checker</h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', lineHeight: 1.65 }}>Verify that your property has a compliant septic inspection for sale or transfer. Check local requirements by county.</p>
        </div>
      </div>

      <ComplianceChecker embedded={false} />

      <div style={{ background: 'var(--parchment)', borderTop: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', marginBottom: '24px' }}>Why This Matters</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Lenders Require It</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>Most mortgage lenders won't fund a loan without a recent septic inspection. A compliance check can prevent delays at closing.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Statewide Mandate (Feb 2027)</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>Washington State will require septic inspections for ALL property transfers starting February 1, 2027. Plan ahead now.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Protect Yourself</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>A failing septic system can become your liability after closing. Get it inspected before you buy.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Protect the Environment</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>Failed systems contaminate groundwater. Regular inspections protect your neighbors' wells.</p>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: 'var(--midnight)', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#e8e4dc' }}>Open <span style={{ color: 'var(--fieldstone)' }}>Acre</span></div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: '#4a5568', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span>Property transfer compliance tool · © 2026 Open Acre</span>
          <div style={{ display: 'flex', gap: '10px', borderLeft: '1px solid #4a5568', paddingLeft: '10px' }}>
            <a href="/privacy" style={{ color: '#4a5568', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#4a5568', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}
