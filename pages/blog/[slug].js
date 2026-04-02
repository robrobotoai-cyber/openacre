import Head from 'next/head'
import Link from 'next/link'
import { getPostBySlug, getAllSlugs } from '../../lib/blog'
import { marked } from 'marked'

export default function BlogPost({ post }) {
  if (!post) {
    return <div>Post not found</div>
  }

  const htmlContent = marked(post.content)

  return (
    <>
      <Head>
        <title>{post.title} | Open Acre Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`septic, ${post.category}, ${post.title}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          author: { '@type': 'Organization', name: post.author },
          datePublished: post.date
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
          <Link href="/blog" style={{ color: 'var(--slate-light)', textDecoration: 'none', marginRight: '12px' }}>Blog</Link>
          <span style={{ color: 'var(--prairie)', fontWeight: 500 }}>{post.category.replace('-', ' ')}</span>
        </div>
      </nav>

      <div style={{ background: 'var(--parchment)', padding: '48px 44px' }}>
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--prairie)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              {post.category.replace('-', ' ')}
            </div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 'normal', color: 'var(--midnight)', marginBottom: '12px', lineHeight: 1.3 }}>
              {post.title}
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--slate-light)', display: 'flex', gap: '16px' }}>
              <span>By {post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <div style={{
            fontSize: '15px',
            color: 'var(--midnight)',
            lineHeight: 1.8,
            background: 'white',
            border: '1px solid var(--birch)',
            borderRadius: '8px',
            padding: '32px'
          }}>
            {/* Markdown content */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} style={{
              '& h2': { fontFamily: 'Georgia, serif', fontSize: '22px', marginTop: '32px', marginBottom: '12px' },
              '& h3': { fontFamily: 'Georgia, serif', fontSize: '18px', marginTop: '24px', marginBottom: '12px' },
              '& h4': { fontFamily: 'Georgia, serif', fontSize: '16px', marginTop: '20px', marginBottom: '12px' },
              '& p': { marginBottom: '16px' },
              '& li': { marginBottom: '8px' },
              '& ul': { marginLeft: '20px', marginBottom: '16px' },
              '& ol': { marginLeft: '20px', marginBottom: '16px' },
              '& table': { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' },
              '& th': { textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--birch)', fontWeight: '600' },
              '& td': { padding: '8px', borderBottom: '1px solid var(--birch)' },
              '& code': { background: 'var(--parchment)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '13px' },
              '& blockquote': { borderLeft: '3px solid var(--prairie)', paddingLeft: '16px', marginLeft: '0', marginBottom: '16px', fontStyle: 'italic' },
              '& a': { color: 'var(--prairie)', textDecoration: 'underline' }
            }} />
          </div>
        </article>
      </div>

      {/* CTA Section */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--birch)', padding: '48px 44px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--parchment)', border: '1px solid var(--birch)', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 'normal', marginBottom: '12px', color: 'var(--midnight)' }}>Ready to assess your system?</h3>
          <p style={{ fontSize: '14px', color: 'var(--slate)', marginBottom: '20px' }}>Use our free tools to evaluate your septic system's health and find licensed contractors in your area.</p>
          <Link href="/" style={{
            display: 'inline-block',
            background: 'var(--prairie)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Try Our Tools →
          </Link>
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

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return { notFound: true }
  }

  return {
    props: { post },
    revalidate: 3600
  }
}

export async function getStaticPaths() {
  const slugs = getAllSlugs()
  
  return {
    paths: slugs.map(slug => ({
      params: { slug }
    })),
    fallback: 'blocking'
  }
}
