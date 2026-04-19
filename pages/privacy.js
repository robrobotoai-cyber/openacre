import Head from 'next/head'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Open Acre</title>
        <meta name="description" content="Privacy policy for Open Acre septic tools." />
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
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'normal', marginBottom: '24px' }}>Privacy Policy</h1>
          
          <div style={{ fontSize: '14px', color: 'var(--midnight)', lineHeight: 1.8 }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>1. Information We Collect</h2>
            <p>Open Acre collects minimal personal information. When you use our tools, we may collect:</p>
            <ul style={{ marginLeft: '20px' }}>
              <li>Information you voluntarily provide (e.g., household size, tank capacity in the Pump Calculator)</li>
              <li>Usage analytics (page views, tool interactions) via standard web analytics</li>
              <li>Technical information (IP address, browser type) for security and debugging</li>
            </ul>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>2. How We Use Your Information</h2>
            <p>We use information to:</p>
            <ul style={{ marginLeft: '20px' }}>
              <li>Provide and improve our tools</li>
              <li>Track usage patterns to understand what's helpful</li>
              <li>Prevent fraud and abuse</li>
              <li>Comply with legal requirements</li>
            </ul>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>3. Data Retention</h2>
            <p>Information you provide to our tools is processed client-side and not stored on our servers. Analytics data is retained for up to 90 days.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>4. Third-Party Data</h2>
            <p>Our License Verifier tool queries the Washington State Department of Licensing public database. See L&I's privacy policy for information about how they handle data.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>5. SMS/Text Messaging</h2>
            <p>If you provide a phone number and opt in via our quote request form, Open Acre (a service of Meridian Automation LLC) may send you SMS messages related to your request. These messages include appointment scheduling, job status updates, quote follow-ups, and support replies.</p>
            <ul style={{ marginLeft: '20px' }}>
              <li><strong>Consent:</strong> We will only send SMS messages to users who have explicitly opted in via our web form.</li>
              <li><strong>Frequency:</strong> Message frequency varies based on your request activity.</li>
              <li><strong>Cost:</strong> Message and data rates may apply (charged by your carrier).</li>
              <li><strong>Opt-out:</strong> Reply STOP, UNSUBSCRIBE, CANCEL, END, or QUIT to any message at any time to unsubscribe. Reply HELP for assistance.</li>
              <li><strong>No sharing:</strong> Mobile phone numbers and consent records are not shared with third parties for marketing purposes. They are used only to communicate with you about your quote request and to connect you with contractors you explicitly approve.</li>
              <li><strong>Sender:</strong> SMS messages originate from Meridian Automation LLC via a Twilio-provisioned 10DLC phone number.</li>
            </ul>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>6. Cookies and Tracking</h2>
            <p>We use essential cookies only (for session management and analytics). We do not use tracking cookies or sell your data to third parties.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>7. Your Rights</h2>
            <p>You have the right to access, correct, or delete any personal information we hold. Contact us at hello@openacre.co to exercise these rights.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>8. Security</h2>
            <p>We take reasonable measures to protect your information, including encryption and secure hosting. However, no system is completely secure, and we cannot guarantee absolute security.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>9. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last updated" date.</p>

            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginTop: '24px', marginBottom: '12px' }}>10. Contact Us</h2>
            <p>If you have questions about this privacy policy, please contact us at hello@openacre.co.</p>

            <p style={{ marginTop: '32px', fontSize: '12px', color: 'var(--slate)', borderTop: '1px solid var(--birch)', paddingTop: '16px' }}>
              Last updated: April 19, 2026
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
