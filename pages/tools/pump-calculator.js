import Head from 'next/head'
import PumpCalculator from '../../components/PumpCalculator'
import ToolWrapper from '../../components/ToolWrapper'

export default function PumpCalculatorPage() {
  return (
    <>
      <Head>
        <title>Septic Pump-Out Calculator — When to Pump Your Tank | Open Acre</title>
        <meta
          name="description"
          content="Calculate when to pump your septic tank based on household size, tank capacity, and last service date. Free, personalized septic maintenance schedule."
        />
        <meta
          name="keywords"
          content="septic pump out frequency, how often pump septic tank, septic tank pumping calculator, septic maintenance schedule Washington"
        />
        {/* JSON-LD for Tool */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Septic Pump-Out Calculator',
              description: 'Calculate when your septic tank needs pumping based on household size and tank capacity',
              url: 'https://openacre.co/tools/pump-calculator',
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
          Tools › <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>Pump Calculator</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'var(--slate)', background: 'none', border: 'none', cursor: 'pointer' }}>Are you a provider?</button>
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
            Septic Pump-Out Calculator
          </h1>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '15px', color: 'var(--slate)', lineHeight: 1.65 }}>
            Enter your household size and tank capacity to find out exactly when you need to pump your septic tank. Based on Washington State Department of Health guidelines.
          </p>
        </div>
      </div>

      {/* Tool */}
      <ToolWrapper toolName="pump-calculator">
        <PumpCalculator embedded={false} />
      </ToolWrapper>

      {/* Why It Matters */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'normal', marginBottom: '24px' }}>
            Why Regular Pumping Matters
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Prevents System Failure</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Solids accumulate in your tank over time. Without regular pumping, they overflow into the drain field, causing expensive damage and system failure.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Protects Groundwater</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                A failing septic system contaminates groundwater and can harm your neighbors' wells. Island County's water table is already shallow — maintenance is critical.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Required for Property Sale</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Most lenders and buyers require proof of recent septic maintenance before closing. Skipping this can delay or kill a sale.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Saves Money Long-Term</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                A $400 pump-out every 3–5 years beats a $15,000 drain field replacement. Prevention is always cheaper than repair.
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
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>How often should I pump?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Washington Department of Health recommends every 3–5 years for typical households. Large families with garbage disposals should pump every 3 years. Small households with large tanks might go 5 years. This calculator gives you a personalized interval.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>What if I don't know my tank size?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Check your property's septic permit with your local county (or city, if you're in an incorporated area). If you can't find it, call a local septic contractor — they can often estimate based on your house's age and size. Most residential tanks are 1,000–1,500 gallons.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>What if I'm overdue?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                Call a licensed septic contractor immediately. Overdue pumping risks system failure, which can cost $10,000–$40,000 to fix. If you're selling your home, a failed inspection can kill the deal.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>How much does pumping cost?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                In Island County, typical pump-outs run $350–$600 depending on tank size and accessibility. This calculator shows you a range. Get quotes from 2–3 contractors to compare.
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>What else can I do to maintain my system?</h3>
              <p style={{ fontSize: '14px', color: 'var(--slate)', lineHeight: 1.6 }}>
                <strong>Do:</strong> Use septic-safe toilet paper, limit water usage, pump regularly, keep records.
                <br />
                <strong>Don't:</strong> Pour grease, paint, or chemicals down the drain. Don't use antibacterial soap excessively. Don't drive or build over the drain field.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--green-light)', borderTop: '1px solid #c4d8c4', padding: '32px 44px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: 'var(--midnight)', marginBottom: '12px' }}>
            Ready to schedule your pump-out?
          </h2>
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px', color: 'var(--slate)', marginBottom: '20px' }}>
            Get free quotes from licensed Island County septic contractors. Compare prices and schedules in minutes.
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
          <span>Based on WA DOH guidelines for Island County · © 2026 Open Acre</span>
          <div style={{ display: 'flex', gap: '10px', borderLeft: '1px solid #4a5568', paddingLeft: '10px' }}>
            <a href="/privacy" style={{ color: '#4a5568', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#4a5568', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </>
  )
}
