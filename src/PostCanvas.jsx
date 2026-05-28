import { forwardRef } from 'react'
import { THEMES } from './data'

const F = { head: "'Space Grotesk', sans-serif", body: "'Inter', sans-serif" }

const Logo = () => (
  <img src={`${import.meta.env.BASE_URL}logo.png`} alt="layer1.studio" style={{ height: 52, width: 'auto', objectFit: 'contain' }} crossOrigin="anonymous" />
)

const Tagline = () => (
  <div style={{ fontFamily: F.body, fontWeight: 300, fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,0.45)', lineHeight: 1 }}>
    Digital foundations, built to last.
  </div>
)

const PostCanvas = forwardRef(function PostCanvas({ template, theme = 'NavyBlue', headline, subtext, cta }, ref) {
  const t = THEMES[theme] || THEMES.NavyBlue
  const p = { headline, subtext, cta, bg: t.bg, accent: t.accent }
  switch (template) {
    case 'Split':       return <SplitPost       ref={ref} {...p} />
    case 'Quote':       return <QuotePost       ref={ref} {...p} />
    case 'Stat':        return <StatPost        ref={ref} {...p} />
    case 'CTA':         return <CTAPost         ref={ref} {...p} />
    case 'Story':       return <StoryPost       ref={ref} {...p} />
    default:            return <BigHeadlinePost ref={ref} {...p} />
  }
})

export default PostCanvas

// ─── 1. Big Headline ────────────────────────────────────────────────────────
const BigHeadlinePost = forwardRef(function BigHeadlinePost({ headline, subtext, bg, accent }, ref) {
  const fs = !headline ? 80 : headline.length > 50 ? 68 : headline.length > 35 ? 78 : 88
  return (
    <div ref={ref} style={{ width:1080, height:1080, background:bg, fontFamily:F.body, position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${accent}06 1px,transparent 1px),linear-gradient(90deg,${accent}06 1px,transparent 1px)`, backgroundSize:'90px 90px' }} />
      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:880 }}>
        <h1 style={{ fontFamily:F.head, fontWeight:700, fontSize:fs, color:'#fff', lineHeight:1.06, letterSpacing:'-0.025em', margin:0 }}>
          {headline || <span style={{ color:'rgba(255,255,255,0.12)' }}>Your headline here</span>}
        </h1>
        <div style={{ width:56, height:3, background:accent, margin:'40px auto 32px' }} />
        {subtext && <p style={{ fontSize:28, color:'#94A3B8', lineHeight:1.5, margin:0 }}>{subtext}</p>}
      </div>
      <div style={{ position:'absolute', bottom:56, left:80, right:80, display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <Tagline /><Logo />
      </div>
    </div>
  )
})

// ─── 2. Split ────────────────────────────────────────────────────────────────
const SplitPost = forwardRef(function SplitPost({ headline, subtext, bg, accent }, ref) {
  const fs = !headline ? 66 : headline.length > 45 ? 54 : headline.length > 30 ? 62 : 70
  return (
    <div ref={ref} style={{ width:1080, height:1080, background:bg, fontFamily:F.body, position:'relative', overflow:'hidden', display:'flex' }}>
      {/* Accent block */}
      <div style={{ width:378, flexShrink:0, background:accent, position:'relative', zIndex:1 }}>
        <div style={{ position:'absolute', right:-30, top:0, bottom:0, width:60, background:bg, transform:'skewX(-2.5deg)', transformOrigin:'top right', zIndex:2 }} />
      </div>
      {/* Content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'80px 80px 80px 64px', position:'relative' }}>
        <div style={{ width:40, height:3, background:accent, marginBottom:28 }} />
        <h1 style={{ fontFamily:F.head, fontWeight:700, fontSize:fs, color:'#fff', lineHeight:1.1, letterSpacing:'-0.02em', margin:'0 0 28px', maxWidth:540 }}>
          {headline || <span style={{ color:'rgba(255,255,255,0.12)' }}>Your headline</span>}
        </h1>
        {subtext && <p style={{ fontSize:24, color:'#94A3B8', lineHeight:1.55, maxWidth:520, margin:0 }}>{subtext}</p>}
      </div>
      <div style={{ position:'absolute', bottom:56, right:80 }}><Logo /></div>
    </div>
  )
})

// ─── 3. Quote ────────────────────────────────────────────────────────────────
const QuotePost = forwardRef(function QuotePost({ headline, subtext, bg, accent }, ref) {
  const fs = !headline ? 60 : headline.length > 60 ? 46 : headline.length > 40 ? 54 : 62
  return (
    <div ref={ref} style={{ width:1080, height:1080, background:bg, fontFamily:F.body, position:'relative', overflow:'hidden', padding:'70px 80px 60px' }}>
      {/* Large quote mark */}
      <div style={{ fontFamily:F.head, fontSize:260, lineHeight:0.85, color:accent, fontWeight:700, marginBottom:0, marginLeft:-8, opacity:0.85, userSelect:'none' }}>"</div>
      {/* Headline */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 20px', marginTop:20 }}>
        <h1 style={{ fontFamily:F.head, fontWeight:700, fontStyle:'italic', fontSize:fs, color:'#fff', lineHeight:1.2, letterSpacing:'-0.02em', margin:0, maxWidth:860 }}>
          {headline || <span style={{ color:'rgba(255,255,255,0.12)' }}>Your quote here</span>}
        </h1>
      </div>
      {/* Rule + attribution */}
      <div style={{ position:'absolute', bottom:160, left:80, right:80, display:'flex', flexDirection:'column', alignItems:'center', gap:28 }}>
        <div style={{ width:120, height:2, background:accent }} />
        {subtext && <p style={{ fontSize:24, color:'#94A3B8', textAlign:'center', margin:0 }}>{subtext}</p>}
        <Logo />
      </div>
      <div style={{ position:'absolute', bottom:52, right:70 }}>
        <span style={{ fontFamily:F.body, fontWeight:300, fontStyle:'italic', fontSize:17, color:'rgba(255,255,255,0.35)' }}>Digital foundations, built to last.</span>
      </div>
    </div>
  )
})

// ─── 4. Stat ─────────────────────────────────────────────────────────────────
const StatPost = forwardRef(function StatPost({ headline, subtext, bg, accent }, ref) {
  const fs = !headline ? 68 : headline.length > 50 ? 54 : headline.length > 35 ? 62 : 72
  const textColor = accent === '#FFFFFF' ? '#FFFFFF' : accent
  return (
    <div ref={ref} style={{ width:1080, height:1080, background:bg, fontFamily:F.body, position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', padding:'80px' }}>
      {/* Top — accent headline */}
      <div style={{ flex:1, display:'flex', alignItems:'flex-end', paddingBottom:52 }}>
        <h1 style={{ fontFamily:F.head, fontWeight:700, fontSize:fs, color:textColor, lineHeight:1.06, letterSpacing:'-0.025em', margin:0, maxWidth:880 }}>
          {headline || <span style={{ opacity:0.2 }}>Your stat or insight</span>}
        </h1>
      </div>
      {/* Rule */}
      <div style={{ height:3, background:`linear-gradient(to right,${accent},${accent}30)`, marginBottom:52, borderRadius:2 }} />
      {/* Bottom — white subtext */}
      <div style={{ flex:0.85, display:'flex', alignItems:'flex-start' }}>
        {subtext
          ? <p style={{ fontSize:30, color:'#fff', lineHeight:1.55, margin:0, maxWidth:820 }}>{subtext}</p>
          : <p style={{ fontSize:30, color:'rgba(255,255,255,0.12)', margin:0 }}>Supporting context appears here</p>
        }
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <Tagline /><Logo />
      </div>
    </div>
  )
})

// ─── 5. CTA ──────────────────────────────────────────────────────────────────
const CTAPost = forwardRef(function CTAPost({ headline, subtext, cta, bg, accent }, ref) {
  const fs = !headline ? 64 : headline.length > 45 ? 54 : headline.length > 30 ? 62 : 70
  return (
    <div ref={ref} style={{ width:1080, height:1080, background:bg, fontFamily:F.body, position:'relative', overflow:'hidden' }}>
      {/* Left border */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:6, background:`linear-gradient(to bottom,${accent},${accent}30)` }} />
      {/* Glow */}
      <div style={{ position:'absolute', top:-280, right:-280, width:680, height:680, borderRadius:'50%', background:`radial-gradient(circle,${accent}14 0%,transparent 70%)` }} />
      <div style={{ display:'flex', flexDirection:'column', height:'100%', padding:'80px 80px 0 90px' }}>
        <div style={{ flex:1, display:'flex', alignItems:'center' }}>
          <h1 style={{ fontFamily:F.head, fontWeight:700, fontSize:fs, color:'#fff', lineHeight:1.08, letterSpacing:'-0.025em', margin:0, maxWidth:860 }}>
            {headline || <span style={{ color:'rgba(255,255,255,0.12)' }}>Your headline</span>}
          </h1>
        </div>
        <div style={{ paddingBottom:56 }}>
          <p style={{ fontFamily:F.head, fontWeight:700, fontSize:36, color:accent, margin:'0 0 20px', lineHeight:1.2 }}>
            {cta || 'Book a call. Build with confidence.'}
          </p>
          {subtext && <p style={{ fontSize:26, color:'#94A3B8', lineHeight:1.5, margin:0, maxWidth:760 }}>{subtext}</p>}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:48 }}>
            <Tagline /><Logo />
          </div>
        </div>
      </div>
    </div>
  )
})

// ─── 6. Story / Editorial ───────────────────────────────────────────────────
const StoryPost = forwardRef(function StoryPost({ headline, subtext, bg, accent }, ref) {
  const fs = !headline ? 56 : headline.length > 50 ? 46 : headline.length > 35 ? 52 : 60
  return (
    <div ref={ref} style={{ width:1080, height:1080, background:'#1A2332', fontFamily:F.body, position:'relative', overflow:'hidden', padding:'80px' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(${accent}0C 1px,transparent 1px)`, backgroundSize:'38px 38px' }} />
      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', height:'100%' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
          {/* Dot + headline */}
          <div style={{ display:'flex', alignItems:'flex-start', gap:22, marginBottom:42 }}>
            <div style={{ width:14, height:14, borderRadius:'50%', background:accent, marginTop:10, flexShrink:0 }} />
            <h1 style={{ fontFamily:F.head, fontWeight:700, fontSize:fs, color:'#fff', lineHeight:1.15, letterSpacing:'-0.02em', margin:0 }}>
              {headline || <span style={{ color:'rgba(255,255,255,0.12)' }}>Your headline here</span>}
            </h1>
          </div>
          {subtext
            ? <p style={{ fontSize:28, color:'#94A3B8', lineHeight:1.7, margin:0, paddingLeft:36, maxWidth:840 }}>{subtext}</p>
            : <p style={{ fontSize:28, color:'rgba(255,255,255,0.1)', margin:0, paddingLeft:36 }}>Supporting text appears here</p>
          }
        </div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
          <Tagline /><Logo />
        </div>
      </div>
    </div>
  )
})
