import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import PostCanvas from './PostCanvas'

const ALL_POSTS = [
  { id: 1, template: 'Headline', headline: 'We build digital foundations for businesses ready to grow.', subtext: 'Websites. E-commerce. Admin panels. Mobile apps. Built properly, the first time.', cta: '', caption: "Layer1 Studio is officially on LinkedIn. We're a Sri Lanka-based tech studio that builds clean, functional digital products for SMEs and startups. No fluff. Just solid builds. If you're building something — let's talk. layer1.studio" },
  { id: 2, template: 'Insight', headline: 'Built by developers who hold their work to an international standard.', subtext: "We've worked in enterprise data teams and published AI research. That's the bar we bring to every build.", cta: '', caption: 'Layer1 Studio was founded by developers who also publish AI research and work at enterprise-level data teams. Every client project — however big or small — gets that same standard. layer1.studio' },
  { id: 3, template: 'Insight', headline: 'Your online store should work as hard as you do.', subtext: 'We build e-commerce platforms that are fast, easy to manage, and built to convert.', cta: '', caption: "We've built e-commerce solutions for food brands, lifestyle businesses, and creative entrepreneurs across Sri Lanka. Every store comes with a custom admin panel so you're always in control. layer1.studio" },
  { id: 4, template: 'Headline', headline: 'Stop managing your business on WhatsApp.', subtext: 'A custom admin panel puts you in control — orders, inventory, customers, all in one place.', cta: '', caption: 'Most small businesses are running their operations across WhatsApp, spreadsheets, and sticky notes. We build custom admin panels that bring everything together. Clean. Simple. Yours. layer1.studio' },
  { id: 5, template: 'Insight', headline: 'A website is just the start.', subtext: 'The businesses growing fastest online have systems — not just pages.', cta: '', caption: "Most SMEs stop at a website. The ones winning digitally have built systems — inventory management, order tracking, customer dashboards. That's what we build at Layer1. layer1.studio" },
  { id: 6, template: 'Headline', headline: 'Your customers are on their phones. Are you?', subtext: "We build mobile apps that give your business a presence in your customer's pocket.", cta: '', caption: "A mobile app isn't just for big companies anymore. We build clean, functional apps for gyms, retailers, and service businesses that want to stay connected with their customers. layer1.studio" },
  { id: 7, template: 'Insight', headline: 'From kitchen to checkout in one build.', subtext: "We built Ambrosia's full e-commerce platform and admin panel so they could sell and manage — all in one place.", cta: '', caption: "Ambrosia needed more than a pretty website. They needed a system. We built their full e-commerce platform with a custom admin panel so their team could manage products, orders, and customers without any technical knowledge. layer1.studio" },
  { id: 8, template: 'Insight', headline: 'Premium chocolate deserves a premium digital presence.', subtext: 'We built an e-commerce store and admin system that matches the quality of the product.', cta: '', caption: "When a premium chocolate brand comes to you, the build has to match the product. We built Chocolatier's full e-commerce platform and admin panel — clean, fast, and built to convert. layer1.studio" },
  { id: 9, template: 'Insight', headline: 'Art deserves to be seen. We built the platform to show it.', subtext: 'Portfolio meets e-commerce — a complete digital home for a creative business.', cta: '', caption: 'A painter needed both a portfolio and a store. We built both — a beautiful portfolio that showcases the work and an e-commerce system that sells it. One platform. One build. layer1.studio' },
  { id: 10, template: 'Insight', headline: "From website to app — one client's full digital journey.", subtext: 'We built the website first. Then the app. Now their members never need to call.', cta: '', caption: 'A local gym came to us for a website. A few months later they came back for a mobile app. Now their members book classes, track sessions, and get updates — all from their phone. layer1.studio' },
  { id: 11, template: 'Headline', headline: 'The cheapest website will cost you the most.', subtext: "A site that breaks, loads slowly, or can't be updated will lose you customers daily.", cta: '', caption: "We see it constantly — businesses that went cheap on their website and are now paying twice to fix it. A digital foundation built properly the first time saves you money, customers, and stress. layer1.studio" },
  { id: 12, template: 'Headline', headline: 'What if you could run your whole business from one screen?', subtext: 'No more juggling apps. No more WhatsApp chaos. Just one clean dashboard.', cta: '', caption: "An admin panel isn't a luxury — it's the difference between a business you control and one that controls you. Every website we build at Layer1 comes with a custom admin panel built around how you actually work. layer1.studio" },
  { id: 13, template: 'Insight', headline: 'Most Sri Lankan e-commerce sites lose customers at checkout.', subtext: 'Slow load times, confusing navigation, and no mobile optimisation. We fix all three.', cta: '', caption: "We've audited enough local e-commerce sites to know the three things that kill conversions — slow loading, bad mobile experience, and a checkout process that has too many steps. We build to avoid all three from day one. layer1.studio" },
  { id: 14, template: 'Insight', headline: "We don't just build what you ask for.", subtext: 'We ask why first. Then we build what you actually need.', cta: '', caption: "Every Layer1 project starts with one question — what problem are we actually solving? Not what does the website need to look like. What does your business need to do. That question changes everything about the build. layer1.studio" },
  { id: 15, template: 'Insight', headline: 'We build with tools that last.', subtext: "No trendy frameworks that break in a year. Just clean, maintainable code built to grow with your business.", cta: '', caption: "We're opinionated about our stack — not because we're rigid, but because we've seen what happens when businesses are locked into technology that can't scale. We build with tools your business won't outgrow. layer1.studio" },
  { id: 16, template: 'Headline', headline: 'We invest in the next generation of Sri Lankan developers.', subtext: "Our interns don't make coffee. They ship code.", cta: '', caption: 'At Layer1 we mentor young Sri Lankan developers by giving them real work on real projects. Our interns contribute to live client builds from day one. Because the best way to learn is to build something that actually matters. layer1.studio' },
  { id: 17, template: 'Insight', headline: 'Technology built for people who care for people.', subtext: "We built Connect to Care's digital presence to help them reach the communities they serve.", cta: '', caption: "Connect to Care needed a digital platform that reflected their mission. We built a clean, accessible website that communicates their work clearly and makes it easy for people to find the support they need. layer1.studio" },
  { id: 18, template: 'CTA', headline: "Have an idea? Let's shape it into something real.", subtext: 'We take your brief from concept to launched product — on time, on budget, built to last.', cta: "Book a call. Let's build it.", caption: "If you have a business idea that needs a digital foundation — a website, an app, an e-commerce store, or all three — let's talk. We'll tell you honestly what you need and build it properly. layer1.studio" },
  { id: 19, template: 'Insight', headline: 'We build websites. We also publish AI research.', subtext: 'That combination means we think differently about technology — and build accordingly.', cta: '', caption: "Layer1's technical co-founder also publishes AI research at international IEEE conferences. That's not a coincidence — it's why we approach every build with the same rigour we'd apply to a research problem. layer1.studio" },
  { id: 20, template: 'Headline', headline: "Sri Lanka's digital economy is growing. Is your business ready?", subtext: 'The businesses that build their digital foundation now will lead their industry in five years.', cta: '', caption: "Sri Lanka's e-commerce and digital services sector is growing fast. The businesses investing in proper digital infrastructure today — clean websites, apps, systems — are the ones that will own their markets in five years. We build those foundations. layer1.studio" },
]

const TEMPLATES = ['Headline', 'CTA', 'Insight']

export default function App() {
  const [tab, setTab] = useState('single')

  // Single post
  const [template, setTemplate] = useState('Headline')
  const [headline, setHeadline] = useState('')
  const [subtext, setSubtext] = useState('')
  const [cta, setCta] = useState('')
  const [caption, setCaption] = useState('')
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const canvasRef = useRef(null)

  // Bulk
  const [bulkProgress, setBulkProgress] = useState(null)
  const [activeBulkPost, setActiveBulkPost] = useState(null)
  const bulkRef = useRef(null)

  function loadPost(post) {
    setTemplate(post.template)
    setHeadline(post.headline)
    setSubtext(post.subtext)
    setCta(post.cta || '')
    setCaption(post.caption)
    setTab('single')
  }

  async function downloadSingle() {
    if (!canvasRef.current) return
    setDownloading(true)
    try {
      await document.fonts.ready
      const canvas = await html2canvas(canvasRef.current, {
        width: 1080, height: 1080, scale: 1, useCORS: true, backgroundColor: null, logging: false,
      })
      const link = document.createElement('a')
      link.download = `layer1-post-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  function copyCaption() {
    if (!caption) return
    navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function bulkGenerate() {
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    await document.fonts.ready

    for (let i = 0; i < ALL_POSTS.length; i++) {
      const post = ALL_POSTS[i]
      setBulkProgress({ current: i + 1, total: ALL_POSTS.length, label: post.headline })
      setActiveBulkPost(post)
      await new Promise(r => setTimeout(r, 200))

      if (bulkRef.current) {
        const canvas = await html2canvas(bulkRef.current, {
          width: 1080, height: 1080, scale: 1, useCORS: true, backgroundColor: null, logging: false,
        })
        const data = canvas.toDataURL('image/png').split(',')[1]
        const slug = post.headline.slice(0, 35).replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/-+/g, '-')
        zip.file(`${String(post.id).padStart(2, '0')}-${slug}.png`, data, { base64: true })
      }
    }

    setActiveBulkPost(null)
    setBulkProgress(null)

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `layer1-20-posts.zip`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D1117', color: '#fff', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #1A2332', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#fff' }}>layer1</span><span style={{ color: '#4A90D9' }}>.studio</span>
          <span style={{ color: '#4A90D9', fontSize: 12, fontWeight: 300, marginLeft: 12 }}>post generator</span>
        </div>
        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 4, background: '#1A2332', padding: 4, borderRadius: 8 }}>
          {['single', 'bulk'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: tab === t ? '#4A90D9' : 'transparent',
              border: 'none', color: tab === t ? '#fff' : '#718096',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {t === 'single' ? 'Single Post' : 'Bulk Generate'}
            </button>
          ))}
        </div>
      </header>

      {/* Hidden canvas for bulk export */}
      {activeBulkPost && (
        <div style={{ position: 'fixed', left: -9999, top: -9999, width: 1080, height: 1080, zIndex: -1, pointerEvents: 'none' }}>
          <PostCanvas ref={bulkRef} template={activeBulkPost.template} headline={activeBulkPost.headline} subtext={activeBulkPost.subtext} cta={activeBulkPost.cta || ''} />
        </div>
      )}

      {tab === 'single' ? (
        <SingleTab
          template={template} setTemplate={setTemplate}
          headline={headline} setHeadline={setHeadline}
          subtext={subtext} setSubtext={setSubtext}
          cta={cta} setCta={setCta}
          caption={caption} setCaption={setCaption}
          copied={copied} downloading={downloading}
          canvasRef={canvasRef}
          onDownload={downloadSingle}
          onCopy={copyCaption}
          onLoad={loadPost}
        />
      ) : (
        <BulkTab onGenerate={bulkGenerate} progress={bulkProgress} onLoad={loadPost} />
      )}
    </div>
  )
}

function SingleTab({ template, setTemplate, headline, setHeadline, subtext, setSubtext, cta, setCta, caption, setCaption, copied, downloading, canvasRef, onDownload, onCopy, onLoad }) {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>

      {/* Input */}
      <div style={{ width: 380, minWidth: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Quick load — all 20 */}
        <div>
          <p style={label}>Quick load</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 220, overflowY: 'auto', paddingRight: 4 }}>
            {ALL_POSTS.map(post => (
              <button key={post.id} onClick={() => onLoad(post)} style={chipStyle}>
                <span style={{ color: '#4A90D9', minWidth: 22, fontSize: 10 }}>#{post.id}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.headline}</span>
                <span style={{ color: '#4a5568', fontSize: 10, marginLeft: 6 }}>{post.template}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template */}
        <div>
          <p style={label}>Template</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {TEMPLATES.map(t => (
              <button key={t} onClick={() => setTemplate(t)} style={{
                flex: 1, padding: '8px 0', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                background: template === t ? '#4A90D9' : '#1A2332',
                border: template === t ? '1px solid #4A90D9' : '1px solid #2a3a50',
                color: '#fff',
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p style={label}>Headline <span style={{ color: '#4a5568' }}>({headline.length}/60)</span></p>
          <textarea value={headline} onChange={e => setHeadline(e.target.value.slice(0, 60))} rows={2} placeholder="Your bold headline here…" style={ta} />
        </div>

        <div>
          <p style={label}>Subtext <span style={{ color: '#4a5568' }}>({subtext.length}/120)</span></p>
          <textarea value={subtext} onChange={e => setSubtext(e.target.value.slice(0, 120))} rows={3} placeholder="Supporting text…" style={ta} />
        </div>

        {template === 'CTA' && (
          <div>
            <p style={label}>CTA Line</p>
            <input value={cta} onChange={e => setCta(e.target.value)} placeholder="Book a call. Build with confidence." style={{ ...ta, padding: '8px 12px' }} />
          </div>
        )}

        <div>
          <p style={label}>LinkedIn Caption</p>
          <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={5} placeholder="Your LinkedIn post text…" style={ta} />
        </div>
      </div>

      {/* Preview */}
      <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={label}>Preview <span style={{ color: '#4a5568' }}>(1080×1080px)</span></p>

        <div style={{ width: '100%', maxWidth: 540, aspectRatio: '1/1', position: 'relative', margin: '0 auto' }}>
          <ScaledCanvas canvasRef={canvasRef} template={template} headline={headline} subtext={subtext} cta={cta} />
        </div>

        <div style={{ display: 'flex', gap: 10, maxWidth: 540, margin: '0 auto', width: '100%' }}>
          <button onClick={onDownload} disabled={downloading} style={primaryBtn}>
            {downloading ? 'Exporting…' : 'Download PNG'}
          </button>
          <button onClick={onCopy} style={secondaryBtn}>
            {copied ? 'Copied!' : 'Copy Caption'}
          </button>
        </div>
        <p style={{ color: '#4a5568', fontSize: 11, textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          Post image + caption together on LinkedIn
        </p>
      </div>
    </div>
  )
}

function BulkTab({ onGenerate, progress, onLoad }) {
  const isRunning = progress !== null

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>

      {/* Info card */}
      <div style={{ background: '#1A2332', border: '1px solid #2a3a50', borderRadius: 10, padding: '24px 28px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Generate all 20 posts in one click</h2>
        <p style={{ color: '#718096', fontSize: 14, lineHeight: 1.6 }}>
          Renders each of the 20 pre-loaded posts as a 1080×1080 PNG and downloads them as a single ZIP file.
          Takes around 30–60 seconds. Don't close the tab while it's running.
        </p>
      </div>

      {/* Progress */}
      {isRunning && (
        <div style={{ background: '#1A2332', border: '1px solid #4A90D9', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: '#4A90D9', fontWeight: 600 }}>Generating post {progress.current} of {progress.total}…</span>
            <span style={{ fontSize: 13, color: '#718096' }}>{Math.round((progress.current / progress.total) * 100)}%</span>
          </div>
          <div style={{ height: 4, background: '#0D1117', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(progress.current / progress.total) * 100}%`, background: '#4A90D9', borderRadius: 2, transition: 'width 0.2s' }} />
          </div>
          <p style={{ fontSize: 12, color: '#4a5568', marginTop: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {progress.label}
          </p>
        </div>
      )}

      {/* Generate button */}
      <button onClick={onGenerate} disabled={isRunning} style={{
        width: '100%', padding: '16px 0', borderRadius: 8,
        background: isRunning ? '#2a3a50' : '#4A90D9',
        border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, cursor: isRunning ? 'not-allowed' : 'pointer',
        marginBottom: 32,
      }}>
        {isRunning ? `Generating ${progress.current}/${progress.total}…` : 'Generate All 20 Posts → ZIP'}
      </button>

      {/* Post list */}
      <p style={label}>All 20 posts — click any to edit in Single Post mode</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {ALL_POSTS.map(post => (
          <button key={post.id} onClick={() => onLoad(post)} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
            background: '#1A2332', border: '1px solid #2a3a50', borderRadius: 8,
            cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ color: '#4A90D9', fontWeight: 700, fontSize: 12, minWidth: 28, paddingTop: 2 }}>#{post.id}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{post.headline}</div>
              <div style={{ color: '#718096', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.subtext}</div>
            </div>
            <span style={{ fontSize: 10, color: '#4a5568', background: '#0D1117', padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap', marginTop: 2 }}>
              {post.template}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ScaledCanvas({ canvasRef, template, headline, subtext, cta }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(0.5)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.offsetWidth / 1080)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 1080, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
        <PostCanvas ref={canvasRef} template={template} headline={headline} subtext={subtext} cta={cta} />
      </div>
    </div>
  )
}

const label = { fontSize: 11, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 500 }
const ta = { width: '100%', background: '#1A2332', border: '1px solid #2a3a50', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#fff', outline: 'none', resize: 'none', fontFamily: "'Inter', sans-serif" }
const primaryBtn = { flex: 1, padding: '12px 0', borderRadius: 6, background: '#4A90D9', border: 'none', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }
const secondaryBtn = { flex: 1, padding: '12px 0', borderRadius: 6, background: '#1A2332', border: '1px solid #2a3a50', color: '#fff', fontSize: 14, cursor: 'pointer' }
const chipStyle = { display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#1A2332', border: '1px solid #2a3a50', borderRadius: 6, color: '#a0aec0', cursor: 'pointer', fontSize: 12, textAlign: 'left', width: '100%' }
