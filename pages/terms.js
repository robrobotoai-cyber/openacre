import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Open Acre</title>
        <meta name="description" content="Terms of service for Open Acre septic tools." />
        <meta name="robots" content="noindex" />
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
      </nav>

      <div style={{ background: 'var(--parchment)', padding: '48px 44px', minHeight: 'calc(100vh - 116px)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'normal', marginBottom: '24px' }}>Terms of Service</h1>
          
          <div style={{ fontSize: '14px', color: 'var(--midnight)', lineHeight: 1.8 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>1. Acceptance of Terms</h2>
            <p>By accessing and using Open Acre (openacre.co), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>2. Free Tools and Information</h2>
            <p>Open Acre provides free septic system tools including a pump-out calculator, license verifier, compliance checker, risk assessment, and county requirements lookup. These tools are provided "as-is" for informational purposes only.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>3. No Professional Advice</h2>
            <p>The information provided by Open Acre tools is not a substitute for professional septic system inspection, licensed contractor advice, or legal counsel. Always consult with a licensed septic professional before making decisions about your septic system.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>4. License Verification Data</h2>
            <p>The License Verifier tool pulls data from publicly available Washington State Department of Licensing (L&I) databases. We are not affiliated with L&I and do not guarantee the accuracy or completeness of this data. Always verify contractor credentials directly with L&I before hiring.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>5. Limitation of Liability</h2>
            <p>Open Acre, its owners, and contributors are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or the tools provided, including but not limited to septic system failures, property damage, or financial loss.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>6. User Responsibilities</h2>
            <p>You are responsible for the accuracy of any information you provide to our tools. You agree not to use Open Acre for unlawful purposes or in any way that could harm the service or other users.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>7. Modifications to Service</h2>
            <p>Open Acre reserves the right to modify or discontinue the service at any time, with or without notice.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>8. SMS / Text Messaging</h2>
            <p>If you provide a phone number and opt in via our quote request form, Open Acre (a service of Meridian Automation LLC) may send you SMS messages related to your service request. By opting in you agree to the following:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li><strong>Consent:</strong> SMS messages are sent only to users who have explicitly opted in via the web form at openacre.co/get-quote. Consent is not a condition of any purchase.</li>
              <li><strong>Message types:</strong> Appointment scheduling, job status updates, quote follow-ups, and support replies.</li>
              <li><strong>Frequency:</strong> Message frequency varies based on your request activity.</li>
              <li><strong>Cost:</strong> Msg &amp; data rates may apply (charged by your mobile carrier).</li>
              <li><strong>Opt-out:</strong> Reply STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, or QUIT at any time to stop receiving messages. Reply HELP for assistance.</li>
              <li><strong>No sharing:</strong> Your mobile number and consent records are not shared with third parties for marketing purposes.</li>
              <li><strong>Sender:</strong> Messages originate from Open Acre (Meridian Automation LLC) via a Twilio-provisioned 10DLC number.</li>
            </ul>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>9. Contact</h2>
            <p>For questions about these terms, please contact us at hello@openacre.co.</p>

            <p style={{ marginTop: '32px', fontSize: '12px', color: 'var(--slate)', borderTop: '1px solid var(--birch)', paddingTop: '16px' }}>
              Last updated: April 30, 2026
            </p>
          </div>
        </div>
      </div>

      <footer style={{ background: 'var(--midnight)', padding: '28px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#e8e4dc' }}>Open <span style={{ color: 'var(--fieldstone)' }}>Acre</span></div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', color: '#4a5568' }}>© 2026 Open Acre</div>
      </footer>
    </>
  )
}
