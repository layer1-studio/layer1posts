import { forwardRef } from 'react'

const PostCanvas = forwardRef(function PostCanvas({ template, headline, subtext, cta }, ref) {
  if (template === 'Headline') return <HeadlinePost ref={ref} headline={headline} subtext={subtext} />
  if (template === 'CTA') return <CTAPost ref={ref} headline={headline} subtext={subtext} cta={cta} />
  if (template === 'Insight') return <InsightPost ref={ref} headline={headline} subtext={subtext} />
  return null
})

export default PostCanvas

const Logo = () => (
  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em' }}>
    <span style={{ color: '#fff' }}>layer1</span><span style={{ color: '#4A90D9' }}>.studio</span>
  </span>
)

const Tagline = () => (
  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>
    Digital foundations, built to last.
  </span>
)

// Template 1 — Dark Headline Post
const HeadlinePost = forwardRef(function HeadlinePost({ headline, subtext }, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: 1080, height: 1080,
        background: '#0D1117',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', padding: '80px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(74,144,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,217,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 860 }}>
        {headline ? (
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontWeight: 700, fontSize: headline.length > 40 ? 64 : 76,
            color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: subtext ? 36 : 0,
          }}>
            {headline}
          </h1>
        ) : (
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontWeight: 700, fontSize: 64, color: 'rgba(255,255,255,0.15)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Your headline here
          </h1>
        )}

        {subtext && (
          <p style={{
            fontSize: 30, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5,
            fontWeight: 400,
          }}>
            {subtext}
          </p>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 56, left: 80, right: 80,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <Tagline />
        <Logo />
      </div>
    </div>
  )
})

// Template 2 — CTA Post
const CTAPost = forwardRef(function CTAPost({ headline, subtext, cta }, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: 1080, height: 1080,
        background: '#0D1117',
        display: 'flex', flexDirection: 'column',
        position: 'relative', padding: '80px',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Left accent border */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
        background: 'linear-gradient(to bottom, #4A90D9, rgba(74,144,217,0.2))',
      }} />

      {/* Blue glow top-right */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 70%)',
      }} />

      {/* Headline — top half */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {headline ? (
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontWeight: 700, fontSize: headline.length > 40 ? 62 : 72,
            color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em',
            maxWidth: 860,
          }}>
            {headline}
          </h1>
        ) : (
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontWeight: 700, fontSize: 62, color: 'rgba(255,255,255,0.15)',
            lineHeight: 1.1,
          }}>
            Your headline here
          </h1>
        )}
      </div>

      {/* CTA line — middle */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 48 }}>
        {subtext && (
          <p style={{ fontSize: 28, color: 'rgba(255,255,255,0.55)', marginBottom: 32, lineHeight: 1.5 }}>
            {subtext}
          </p>
        )}
        <p style={{
          fontSize: 38, fontWeight: 700, color: '#4A90D9',
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        }}>
          {cta || 'Book a call. Build with confidence.'}
        </p>
      </div>

      {/* Bottom */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <Tagline />
        <Logo />
      </div>
    </div>
  )
})

// Template 3 — Insight Post
const InsightPost = forwardRef(function InsightPost({ headline, subtext }, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: 1080, height: 1080,
        background: '#1A2332',
        display: 'flex', flexDirection: 'column',
        position: 'relative', padding: '80px',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(74,144,217,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Top stat/headline */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center' }}>
        {headline ? (
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontWeight: 700, fontSize: headline.length > 35 ? 68 : 84,
            color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em',
            maxWidth: 860,
          }}>
            {headline}
          </h1>
        ) : (
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontWeight: 700, fontSize: 80, color: 'rgba(255,255,255,0.12)',
            lineHeight: 1.05,
          }}>
            Your insight here
          </h1>
        )}
      </div>

      {/* Accent rule */}
      <div style={{
        position: 'relative', zIndex: 1,
        height: 3, width: 80, background: '#4A90D9',
        marginBottom: 40,
      }} />

      {/* Body text */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 64 }}>
        {subtext ? (
          <p style={{ fontSize: 30, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 820 }}>
            {subtext}
          </p>
        ) : (
          <p style={{ fontSize: 30, color: 'rgba(255,255,255,0.15)', lineHeight: 1.6 }}>
            Supporting insight text appears here
          </p>
        )}
      </div>

      {/* Bottom */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <Tagline />
        <Logo />
      </div>
    </div>
  )
})
