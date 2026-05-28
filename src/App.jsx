import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import PostCanvas from './PostCanvas'
import { THEMES, TEMPLATE_LABELS, ALL_POSTS } from './data'

const THEME_KEYS = Object.keys(THEMES)
const TEMPLATE_KEYS = Object.keys(TEMPLATE_LABELS)

// ─── Scaled preview ──────────────────────────────────────────────────────────
function ScaledCanvas({ canvasRef, template, theme, headline, subtext, cta }) {
  const outer = useRef(null)
  const [scale, setScale] = useState(0.46)
  useEffect(() => {
    const el = outer.current; if (!el) return
    const fn = () => setScale(el.offsetWidth / 1080)
    fn()
    const ro = new ResizeObserver(fn); ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={outer} style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden', borderRadius:8 }}>
      <div style={{ width:1080, height:1080, transform:`scale(${scale})`, transformOrigin:'top left', position:'absolute' }}>
        <PostCanvas ref={canvasRef} template={template} theme={theme} headline={headline} subtext={subtext} cta={cta} />
      </div>
    </div>
  )
}

// ─── Thumbnail (bulk grid) ───────────────────────────────────────────────────
const THUMB = 164
function Thumb({ post, onClick }) {
  const sc = THUMB / 1080
  return (
    <button onClick={onClick} style={{ background:'none', border:'1px solid #2a3a50', borderRadius:6, padding:0, cursor:'pointer', overflow:'hidden', width:THUMB, height:THUMB, position:'relative', flexShrink:0 }}>
      <div style={{ width:1080, height:1080, transform:`scale(${sc})`, transformOrigin:'top left', position:'absolute', pointerEvents:'none' }}>
        <PostCanvas template={post.template} theme={post.theme} headline={post.headline} subtext={post.subtext} cta={post.cta||''} />
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'rgba(0,0,0,0.7)', padding:'4px 6px', fontSize:9, color:'#94A3B8', display:'flex', justifyContent:'space-between' }}>
        <span>#{post.id}</span><span style={{ color: THEMES[post.theme]?.accent || '#4A90D9' }}>{post.template}</span>
      </div>
    </button>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('single')
  // Single post
  const [template, setTemplate] = useState('BigHeadline')
  const [theme, setTheme] = useState('NavyBlue')
  const [headline, setHeadline] = useState('')
  const [subtext, setSubtext] = useState('')
  const [cta, setCta] = useState('')
  const [caption, setCaption] = useState('')
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const canvasRef = useRef(null)
  // Bulk
  const [bulkJson, setBulkJson] = useState(() => JSON.stringify(ALL_POSTS, null, 2))
  const [loadedPosts, setLoadedPosts] = useState(ALL_POSTS)
  const [bulkProgress, setBulkProgress] = useState(null)
  const [activeBulkPost, setActiveBulkPost] = useState(null)
  const bulkRef = useRef(null)

  function loadPost(post) {
    setTemplate(post.template); setTheme(post.theme)
    setHeadline(post.headline); setSubtext(post.subtext)
    setCta(post.cta || ''); setCaption(post.caption)
    setTab('single')
  }

  async function downloadSingle() {
    if (!canvasRef.current) return
    setDownloading(true)
    try {
      await document.fonts.ready
      const cv = await html2canvas(canvasRef.current, { width:1080, height:1080, scale:1, useCORS:true, backgroundColor:null, logging:false })
      dl(cv.toDataURL('image/png'), `layer1-post-${Date.now()}.png`)
    } finally { setDownloading(false) }
  }

  function copyCaption() {
    if (!caption) return
    navigator.clipboard.writeText(caption); setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  function loadBulkJson() {
    try { setLoadedPosts(JSON.parse(bulkJson)) } catch { alert('Invalid JSON') }
  }

  async function bulkGenerate() {
    if (!loadedPosts?.length) return
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    await document.fonts.ready
    const date = new Date().toISOString().slice(0,10).replace(/-/g,'')
    for (let i = 0; i < loadedPosts.length; i++) {
      const p = loadedPosts[i]
      setBulkProgress({ current: i+1, total: loadedPosts.length, label: p.headline })
      setActiveBulkPost(p)
      await new Promise(r => setTimeout(r, 180))
      if (bulkRef.current) {
        const cv = await html2canvas(bulkRef.current, { width:1080, height:1080, scale:1, useCORS:true, backgroundColor:null, logging:false })
        const t = THEMES[p.theme] || THEMES.NavyBlue
        const fname = `${String(p.id).padStart(2,'0')}_week${p.week}_${p.template.toLowerCase()}_${t.slug}.png`
        zip.file(fname, cv.toDataURL('image/png').split(',')[1], { base64:true })
      }
    }
    setActiveBulkPost(null); setBulkProgress(null)
    const blob = await zip.generateAsync({ type:'blob' })
    dl(URL.createObjectURL(blob), `layer1_posts_${date}.zip`)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0D1117', color:'#fff', fontFamily:"'Inter',sans-serif" }}>
      {/* Hidden bulk canvas */}
      {activeBulkPost && (
        <div style={{ position:'fixed', left:-9999, top:-9999, width:1080, height:1080, zIndex:-1, pointerEvents:'none' }}>
          <PostCanvas ref={bulkRef} template={activeBulkPost.template} theme={activeBulkPost.theme} headline={activeBulkPost.headline} subtext={activeBulkPost.subtext} cta={activeBulkPost.cta||''} />
        </div>
      )}

      {/* Header */}
      <header style={{ borderBottom:'1px solid #1A2332', padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
        <div style={{ fontSize:18, fontWeight:700, letterSpacing:'-0.02em', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ color:'#fff' }}>layer1</span><span style={{ color:'#4A90D9' }}>.studio</span>
          <span style={{ color:'#4a5568', fontSize:12, fontWeight:400 }}>post generator</span>
        </div>
        <div style={{ display:'flex', gap:2, background:'#1A2332', padding:3, borderRadius:8 }}>
          {[['single','Single Post'],['bulk','Bulk Generate'],['quickload','Quick Load']].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding:'7px 14px', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', background: tab===k ? '#4A90D9' : 'transparent', border:'none', color: tab===k ? '#fff' : '#718096', letterSpacing:'0.03em', whiteSpace:'nowrap' }}>
              {l}
            </button>
          ))}
        </div>
      </header>

      {tab === 'single' && (
        <div style={{ maxWidth:1260, margin:'0 auto', padding:'24px 16px', display:'flex', gap:24, flexWrap:'wrap' }}>
          {/* Input */}
          <div style={{ width:360, minWidth:280, flexShrink:0, display:'flex', flexDirection:'column', gap:16 }}>
            <Row label="Template">
              <select value={template} onChange={e => setTemplate(e.target.value)} style={sel}>
                {TEMPLATE_KEYS.map(k => <option key={k} value={k}>{TEMPLATE_LABELS[k]}</option>)}
              </select>
            </Row>
            <Row label="Colour Theme">
              <select value={theme} onChange={e => setTheme(e.target.value)} style={sel}>
                {THEME_KEYS.map(k => <option key={k} value={k}>{THEMES[k].name}</option>)}
              </select>
            </Row>
            <Row label={`Headline (${headline.length}/80)`}>
              <textarea value={headline} onChange={e => setHeadline(e.target.value.slice(0,80))} rows={2} placeholder="Your bold headline…" style={ta} />
            </Row>
            <Row label={`Subtext (${subtext.length}/140)`}>
              <textarea value={subtext} onChange={e => setSubtext(e.target.value.slice(0,140))} rows={3} placeholder="Supporting text…" style={ta} />
            </Row>
            {template === 'CTA' && (
              <Row label="CTA Line">
                <input value={cta} onChange={e => setCta(e.target.value)} placeholder="Book a call. Build with confidence." style={{ ...ta, padding:'8px 12px' }} />
              </Row>
            )}
            <Row label="LinkedIn Caption">
              <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={6} placeholder="Your LinkedIn post text…" style={ta} />
            </Row>
          </div>

          {/* Preview */}
          <div style={{ flex:1, minWidth:280, display:'flex', flexDirection:'column', gap:14 }}>
            <p style={lbl}>Preview <span style={{ color:'#4a5568' }}>(1080×1080px)</span></p>
            <div style={{ width:'100%', maxWidth:520, aspectRatio:'1/1', margin:'0 auto', position:'relative' }}>
              <ScaledCanvas canvasRef={canvasRef} template={template} theme={theme} headline={headline} subtext={subtext} cta={cta} />
            </div>
            <div style={{ display:'flex', gap:10, maxWidth:520, margin:'0 auto', width:'100%' }}>
              <button onClick={downloadSingle} disabled={downloading} style={primaryBtn}>{downloading ? 'Exporting…' : 'Download PNG'}</button>
              <button onClick={copyCaption} style={secondaryBtn}>{copied ? 'Copied!' : 'Copy Caption'}</button>
            </div>
            <p style={{ color:'#4a5568', fontSize:11, textAlign:'center' }}>Post image + caption together on LinkedIn</p>
          </div>
        </div>
      )}

      {tab === 'bulk' && (
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'24px 16px' }}>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:20 }}>
            <div style={{ flex:1, minWidth:280 }}>
              <p style={lbl}>JSON — edit or paste your posts</p>
              <textarea value={bulkJson} onChange={e => setBulkJson(e.target.value)} rows={10} style={{ ...ta, width:'100%', fontFamily:'monospace', fontSize:11 }} />
              <button onClick={loadBulkJson} style={{ ...secondaryBtn, marginTop:8, width:'100%' }}>Load Posts</button>
            </div>
            <div style={{ flex:2, minWidth:300 }}>
              {bulkProgress && (
                <div style={{ background:'#1A2332', border:`1px solid ${THEMES[loadedPosts[bulkProgress.current-1]?.theme]?.accent || '#4A90D9'}`, borderRadius:8, padding:'16px 20px', marginBottom:16 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <span style={{ fontSize:13, color:'#4A90D9', fontWeight:600 }}>Generating {bulkProgress.current}/{bulkProgress.total}…</span>
                    <span style={{ fontSize:12, color:'#718096' }}>{Math.round(bulkProgress.current/bulkProgress.total*100)}%</span>
                  </div>
                  <div style={{ height:4, background:'#0D1117', borderRadius:2, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${bulkProgress.current/bulkProgress.total*100}%`, background:'#4A90D9', borderRadius:2, transition:'width 0.2s' }} />
                  </div>
                  <p style={{ fontSize:11, color:'#4a5568', marginTop:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{bulkProgress.label}</p>
                </div>
              )}
              <button onClick={bulkGenerate} disabled={!!bulkProgress || !loadedPosts?.length} style={{ ...primaryBtn, width:'100%', marginBottom:20, padding:'14px 0', fontSize:15 }}>
                {bulkProgress ? `Generating ${bulkProgress.current}/${bulkProgress.total}…` : `Generate All ${loadedPosts?.length || 0} Posts → ZIP`}
              </button>
              {/* Thumbnail grid */}
              {loadedPosts?.length > 0 && (
                <>
                  <p style={lbl}>Preview — click any to edit</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                    {loadedPosts.map(p => <Thumb key={p.id} post={p} onClick={() => loadPost(p)} />)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === 'quickload' && (
        <div style={{ maxWidth:900, margin:'0 auto', padding:'24px 16px' }}>
          <p style={{ ...lbl, marginBottom:16 }}>20 pre-loaded posts — click any to edit in Single Post mode</p>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {ALL_POSTS.map(p => {
              const t = THEMES[p.theme] || THEMES.NavyBlue
              return (
                <button key={p.id} onClick={() => loadPost(p)} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'13px 16px', background:'#1A2332', border:'1px solid #2a3a50', borderRadius:8, cursor:'pointer', textAlign:'left', width:'100%' }}>
                  <span style={{ color:'#4A90D9', fontWeight:700, fontSize:13, minWidth:30, paddingTop:1 }}>#{p.id}</span>
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <div style={{ color:'#fff', fontSize:13, fontWeight:500, marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.headline}</div>
                    <div style={{ color:'#718096', fontSize:11, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.subtext}</div>
                  </div>
                  <div style={{ display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
                    <span style={{ fontSize:10, color:'#4a5568', background:'#0D1117', padding:'2px 8px', borderRadius:3 }}>{p.template}</span>
                    <span style={{ fontSize:10, color: t.accent, background:'#0D1117', padding:'2px 8px', borderRadius:3, border:`1px solid ${t.accent}30` }}>{t.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function dl(href, name) {
  const a = document.createElement('a'); a.href = href; a.download = name; a.click()
  if (href.startsWith('blob:')) setTimeout(() => URL.revokeObjectURL(href), 1000)
}

function Row({ label, children }) {
  return (
    <div>
      <p style={lbl}>{label}</p>
      {children}
    </div>
  )
}

const lbl = { fontSize:11, color:'#718096', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6, fontWeight:500, margin:'0 0 6px' }
const ta = { width:'100%', background:'#1A2332', border:'1px solid #2a3a50', borderRadius:6, padding:'8px 12px', fontSize:13, color:'#fff', outline:'none', resize:'none', fontFamily:"'Inter',sans-serif", boxSizing:'border-box' }
const sel = { ...ta, padding:'9px 12px', cursor:'pointer', appearance:'auto' }
const primaryBtn = { flex:1, padding:'12px 0', borderRadius:6, background:'#4A90D9', border:'none', color:'#fff', fontWeight:600, fontSize:14, cursor:'pointer' }
const secondaryBtn = { flex:1, padding:'12px 0', borderRadius:6, background:'#1A2332', border:'1px solid #2a3a50', color:'#fff', fontSize:14, cursor:'pointer' }
