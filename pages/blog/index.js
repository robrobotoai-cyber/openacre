import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { getAllPosts } from '../../lib/blog'

export default function BlogIndex({ posts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [emailInput, setEmailInput] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!emailInput) {
      setSubscriptionStatus({ error: 'Email required' })
      return
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput })
      })

      if (res.ok) {
        setSubscriptionStatus({ success: true })
        setEmailInput('')
      } else {
        setSubscriptionStatus({ error: 'Subscription failed' })
      }
    } catch (err) {
      setSubscriptionStatus({ error: 'Error subscribing' })
    }
  }

  return (
    <>
      <Head>
        <title>Blog | Open Acre — Septic System Knowledge & Best Practices</title>
        <meta name="description" content="Learn about septic systems, maintenance, costs, and local regulations. Expert guides for homeowners and real estate professionals." />
        <meta name="keywords" content="septic blog, septic maintenance, septic repair costs, septic inspection" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Open Acre Blog',
          url: 'https://openacre.co/blog',
          description: 'Septic system guides and knowledge'
        })}} />
      </Head>

      <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '0 28px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
          <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>Blog</span>
        </div>
      </nav>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'normal', marginBottom: '12px', color: 'var(--midnight)' }}>Septic Knowledge</h1>
          <p style={{ fontSize: '16px', color: 'var(--slate)', lineHeight: 1.6 }}>Expert guides on septic systems, maintenance, costs, and regulations. Everything homeowners and real estate professionals need to know.</p>
        </div>
      </div>

      {/* Email Subscription */}
      <div style={{ background: 'var(--parchment)', padding: '32px 44px', borderBottom: '1px solid var(--birch)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: 'white', border: '1px solid var(--birch)', borderRadius: '8px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 'normal', marginBottom: '8px', color: 'var(--midnight)' }}>Get New Posts By Email</h2>
            <p style={{ fontSize: '13px', color: 'var(--slate)', marginBottom: '16px' }}>Subscribe to get the latest septic guides and local regulation updates delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid var(--birch)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'system-ui, sans-serif',
                  boxSizing: 'border-box'
                }}
              />
              <button type="submit" style={{
                background: 'var(--prairie)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                Subscribe
              </button>
            </form>
            {subscriptionStatus?.success && <p style={{ fontSize: '12px', color: 'var(--prairie)', marginTop: '8px' }}>✓ Thank you! Check your email for confirmation.</p>}
            {subscriptionStatus?.error && <p style={{ fontSize: '12px', color: '#8b2e2e', marginTop: '8px' }}>✗ {subscriptionStatus.error}</p>}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--parchment)', padding: '48px 44px', minHeight: 'calc(100vh - 300px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Category Filter */}
          <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedCategory === 'all' ? '1px solid var(--prairie)' : '1px solid var(--birch)',
                background: selectedCategory === 'all' ? 'var(--prairie)' : 'white',
                color: selectedCategory === 'all' ? 'white' : 'var(--midnight)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              All Posts
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedCategory === cat ? '1px solid var(--prairie)' : '1px solid var(--birch)',
                  background: selectedCategory === cat ? 'var(--prairie)' : 'white',
                  color: selectedCategory === cat ? 'white' : 'var(--midnight)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  background: 'white',
                  border: '1px solid var(--birch)',
                  borderRadius: '8px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--prairie)'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(155, 122, 66, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--birch)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--prairie)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {post.category.replace('-', ' ')}
                  </div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 'normal', marginBottom: '8px', color: 'var(--midnight)', lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--slate)', lineHeight: 1.6, marginBottom: '12px', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--slate-light)' }}>
                    <span>{post.date}</span>
                    <span>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
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

export async function getStaticProps() {
  const posts = getAllPosts()
  const categories = [...new Set(posts.map(p => p.category))].sort()

  return {
    props: { posts, categories },
    revalidate: 3600 // Revalidate every hour
  }
}
