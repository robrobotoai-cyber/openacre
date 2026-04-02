import ToolWrapper from '../../components/ToolWrapper'
import Head from 'next/head'
import FailureRiskAssessment from '../../components/FailureRiskAssessment'

export default function FailureRiskPage() {
  return (
    <>
      <Head>
        <title>Septic System Failure Risk Assessment | Open Acre</title>
        <meta name="description" content="Answer 8 questions to assess your septic system's failure risk. Get a personalized risk score and recommendations." />
        <meta name="keywords" content="septic system failure signs, septic problems, drain field failure, septic tank issues" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Failure Risk Assessment', url: 'https://openacre.co/tools/failure-risk-assessment', applicationCategory: 'Utility' }) }} />
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
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: 'var(--slate-light)' }}>Tools › <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>Risk Assessment</span></div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', background: 'none', border: 'none', cursor: 'pointer' }}>Are you a provider?</button>
          <button style={{ background: 'var(--prairie)', color: '#fff', fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Get a free quote</button>
        </div>
      </nav>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '32px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'var(--prairie)', marginBottom: '12px' }}>FREE TOOL</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '12px' }}>Septic System Failure Risk Assessment</h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', lineHeight: 1.65 }}>Answer 8 quick questions to get a personalized risk assessment. Identify problems before they become emergencies.</p>
        </div>
      </div>

      <ToolWrapper toolName="failure-risk-assessment">
        <FailureRiskAssessment embedded={false} />
      </ToolWrapper>

      <div style={{ background: 'var(--parchment)', borderTop: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', marginBottom: '24px' }}>Early Warning Signs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>🚰 Drainage Issues</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>Slow drains in multiple fixtures, especially toilets, are often the first sign of a failing septic system. Don't ignore persistent clogs.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>👃 Odors</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>Sewage smell in your yard or home means gases are escaping the system. This requires immediate attention.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>💧 Wet Patches</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>Unusually wet or green areas over your drain field indicate effluent is surfacing. Your system is failing.</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>📅 System Age</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>Most systems last 25–40 years. If yours is over 30, failure is likely. Get it inspected immediately.</p>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ background: 'var(--midnight)', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#e8e4dc' }}>Open <span style={{ color: 'var(--fieldstone)' }}>Acre</span></div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: '#4a5568', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span>Diagnostic assessment tool · © 2026 Open Acre</span>
          <div style={{ display: 'flex', gap: '10px', borderLeft: '1px solid #4a5568', paddingLeft: '10px' }}>
            <a href="/privacy" style={{ color: '#4a5568', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#4a5568', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}
