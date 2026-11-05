import { useCallback, useEffect, useRef, useState } from 'react';
import { Activity, ArrowRight, BadgeCheck, BookOpen, CheckCircle2, ChevronRight, CircleAlert, ClipboardList, CloudUpload, Download, FileImage, FlaskConical, Github, Leaf, LoaderCircle, LockKeyhole, Menu, RotateCcw, ScanSearch, ShieldCheck, Sprout, X } from 'lucide-react';
import { checkHealth, predictImage } from '../services/api';
import type { Health, PredictionResult } from '../types/prediction';

type HistoryItem = { name: string; time: string; label: string; confidence: number };

function readable(raw: string) { return raw.replace(/_/g, ' ').replace(/\s+/g, ' ').trim(); }
function percent(score: number) { return `${(score * 100).toFixed(1)}%`; }
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [serviceError, setServiceError] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mobileNav, setMobileNav] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    checkHealth(controller.signal).then((data) => { setHealth(data); setServiceError(false); }).catch(() => setServiceError(true));
    return () => controller.abort();
  }, []);
  useEffect(() => () => { if (previewRef.current) URL.revokeObjectURL(previewRef.current); abortRef.current?.abort(); }, []);

  const selectFile = useCallback((candidate?: File) => {
    if (!candidate) return;
    if (!ACCEPTED.includes(candidate.type)) { setError('Use a JPEG, PNG or WebP image.'); return; }
    if (candidate.size > MAX_BYTES) { setError('Image exceeds 10 MB. Please choose a smaller file.'); return; }
    abortRef.current?.abort(); setPending(false);
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = URL.createObjectURL(candidate); previewRef.current = url;
    setPreview(url); setFile(candidate); setResult(null); setError('');
  }, []);

  const reset = () => {
    abortRef.current?.abort(); setPending(false);
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null; setPreview(null); setFile(null); setResult(null); setError('');
    if (uploadRef.current) uploadRef.current.value = '';
  };

  const analyze = async () => {
    if (!file || pending) return;
    const controller = new AbortController(); abortRef.current = controller;
    setPending(true); setError(''); setResult(null);
    try {
      const data = await predictImage(file, controller.signal);
      setResult(data);
      setHistory(old => [{name: file.name, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), label: readable(data.prediction.label), confidence: data.prediction.confidence}, ...old].slice(0, 5));
      setServiceError(false);
      checkHealth().then(setHealth).catch(() => {});
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') setError(e.message || 'Analysis failed.');
    } finally { if (abortRef.current === controller) { setPending(false); abortRef.current = null; } }
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify({file_name: file?.name, analyzed_at: new Date().toISOString(), ...result}, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'leafdoctor-screening.json'; a.click(); URL.revokeObjectURL(url);
  };

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#top"><span className="brand-icon"><Leaf size={23} strokeWidth={2.6}/></span><span className="brand-name">leafdoctor<span className="brand-period">.</span><small>lite</small></span></a>
      <div className="sidebar-group"><div className="sidebar-label">WORKSPACE</div><a href="#analysis" className="nav-link active"><ScanSearch size={18}/> Leaf analysis <span className="active-dot"/></a><a href="#how-it-works" className="nav-link"><BookOpen size={18}/> How it works</a><a href="#history" className="nav-link"><ClipboardList size={18}/> Recent activity</a></div>
      <div className="sidebar-group"><div className="sidebar-label">RESOURCES</div><a href="#responsible" className="nav-link"><ShieldCheck size={18}/> Responsible AI</a><a href="https://github.com/MENSTRUE/LeafDoctor-Lite" target="_blank" rel="noreferrer" className="nav-link"><Github size={18}/> GitHub repository</a></div>
      <div className="sidebar-bottom"><div className="sidebar-callout"><span className="mini-icon"><Sprout size={19}/></span><strong>Built for better decisions</strong><p>Early visual screening to support farmers and plant health experts.</p><span>DAY 31 / 100 <ChevronRight size={13}/></span></div><div className="sidebar-footer"><span className="avatar">LD</span><span>LeafDoctor Research<small>Computer vision project</small></span><span className="footer-dots">•••</span></div></div>
    </aside>
    <div className="main-column" id="top">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileNav(!mobileNav)}><Menu size={20}/></button><span className="breadcrumb">Workspace <ChevronRight size={14}/> <strong>Leaf analysis</strong></span></div><div className="topbar-right"><span className={`status-pill ${health?.model_ready ? 'online' : 'standby'}`}><i/>{health?.model_ready ? 'Model ready' : serviceError ? 'API offline' : 'Model not loaded'}</span><span className="topbar-divider"/><span className="research-tag"><FlaskConical size={15}/> Research preview</span></div></header>
      {mobileNav && <nav className="mobile-nav"><a href="#analysis" onClick={() => setMobileNav(false)}>Leaf analysis</a><a href="#how-it-works" onClick={() => setMobileNav(false)}>How it works</a><a href="#history" onClick={() => setMobileNav(false)}>Recent activity</a></nav>}
      <main className="page-content">
        <div className="hero-strip"><span className="eyebrow"><span className="eyebrow-dot"/> AGRICULTURAL INTELLIGENCE <span className="slash">/</span> DAY 31 OF 100</span><h1>Healthier plants start<br/>with <em>better insight.</em></h1><p>Understand visible leaf conditions in seconds. Upload a photo and get AI-assisted screening results you can explore with confidence and care.</p><div className="hero-tags"><span><CheckCircle2 size={15}/> 38 visual classes</span><span><Activity size={15}/> Confidence insights</span><span><ShieldCheck size={15}/> Responsible screening</span></div><div className="hero-leaf"><Leaf size={154} strokeWidth={0.85}/><Leaf size={94} strokeWidth={0.8}/></div></div>
        <section id="analysis" className="analysis-section"><div className="section-heading"><div><div className="section-kicker">01 / ANALYZE</div><h2>Leaf condition screening</h2><p>Upload a clear photograph of a single leaf to begin.</p></div><span className="section-note"><LockKeyhole size={14}/> Image processed in memory</span></div>
          <div className="analysis-grid"><div className="panel upload-panel"><div className="panel-top"><div className="panel-title"><span className="panel-icon"><FileImage size={18}/></span><span>Leaf image</span></div><span className="step-count">STEP 01</span></div>
            <input ref={uploadRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e => selectFile(e.target.files?.[0])}/>
            {preview ? <div className="preview-wrap"><img src={preview} alt="Selected leaf to analyze"/><button className="remove-image" onClick={reset} aria-label="Remove selected image"><X size={17}/></button></div> : <div className={`drop-zone ${dragging ? 'drag-active' : ''}`} role="button" tabIndex={0} onClick={() => uploadRef.current?.click()} onKeyDown={e => {if(e.key === 'Enter' || e.key === ' ') uploadRef.current?.click();}} onDragOver={e => {e.preventDefault();setDragging(true);}} onDragLeave={() => setDragging(false)} onDrop={e => {e.preventDefault();setDragging(false);selectFile(e.dataTransfer.files[0]);}}><div className="upload-glyph"><CloudUpload size={31} strokeWidth={1.7}/></div><strong>Drop your leaf image here</strong><p>or <span>browse from your device</span></p><div className="drop-spec">JPG, PNG, WEBP <span>·</span> MAX 10 MB</div></div>}
            {file && <div className="chosen-file"><FileImage size={16}/><span title={file.name}>{file.name}</span><span>{(file.size/1024/1024).toFixed(2)} MB</span></div>}
            {error && <div className="inline-error" role="alert"><CircleAlert size={17}/>{error}</div>}
            <button className="primary-btn" disabled={!file || pending} onClick={analyze}>{pending ? <><LoaderCircle size={18} className="spin"/> Analyzing leaf…</> : <>Analyze leaf <ArrowRight size={18}/></>}</button><div className="upload-footnote"><ShieldCheck size={15}/> Your image is not stored on the server by this demo.</div>
          </div>
          <div className="panel results-panel"><div className="panel-top"><div className="panel-title"><span className="panel-icon"><Activity size={18}/></span><span>Screening results</span></div><span className="step-count">STEP 02</span></div>
          {pending ? <div className="empty-results"><div className="result-orbit loading"><LoaderCircle size={33} className="spin"/></div><h3>Analyzing visual patterns</h3><p>The model is reviewing your leaf image. Results will appear here.</p></div> : result ? <div className="results-body"><div className="results-eyebrow">TOP MATCH <span className="result-source">UNCALIBRATED SCORES</span></div><div className="result-primary"><div><div className="result-crop">{readable(result.prediction.crop)}</div><h3>{readable(result.prediction.condition)}</h3></div><div className="result-score">{percent(result.prediction.confidence)}<small>model score</small></div></div><div className="confidence-bar"><span style={{width: `${result.prediction.confidence*100}%`}}/></div><div className="rank-list"><div className="rank-title">TOP 3 POSSIBLE CONDITIONS</div>{result.top_predictions.map((item, i) => <div className="rank-item" key={item.label}><span className="rank-index">0{i+1}</span><span className="rank-name">{readable(item.crop)} · {readable(item.condition)}</span><strong>{percent(item.confidence)}</strong></div>)}</div><div className={`result-caution ${result.low_confidence ? 'caution-high' : ''}`}><CircleAlert size={18}/><p>{result.uncertainty_note}</p></div><button onClick={download} className="download-btn"><Download size={16}/> Export screening JSON</button></div> : <div className="empty-results"><div className="result-orbit"><ScanSearch size={37} strokeWidth={1.35}/></div><h3>Your insights appear here</h3><p>Upload and analyze a leaf photo to view likely visual conditions and confidence scores.</p><span className="empty-label"><span/> WAITING FOR IMAGE</span></div>}
          </div></div>
        </section>
        <section id="how-it-works" className="guide-section"><div className="section-heading"><div><div className="section-kicker">02 / PROCESS</div><h2>Simple steps, informed decisions</h2><p>A research tool designed to make first-pass screening easier.</p></div></div><div className="guide-grid"><div className="guide-card"><div className="guide-num">01</div><div className="guide-icon"><FileImage size={23}/></div><h3>Capture a leaf</h3><p>Take a clear, well-lit photo showing the visible condition of the leaf.</p></div><div className="guide-card"><div className="guide-num">02</div><div className="guide-icon"><ScanSearch size={23}/></div><h3>Analyze patterns</h3><p>Our MobileNetV3 research model compares the image against 38 trained categories.</p></div><div className="guide-card"><div className="guide-num">03</div><div className="guide-icon"><BadgeCheck size={23}/></div><h3>Review & consult</h3><p>Explore the results, then consult a qualified expert before taking action.</p></div></div></section>
        <div className="bottom-grid"><section id="history" className="panel history-panel"><div className="panel-top"><div className="panel-title"><span className="panel-icon"><RotateCcw size={18}/></span><span>Recent activity</span></div><span className="step-count">THIS SESSION</span></div>{history.length ? history.map((item,i) => <div className="history-row" key={`${item.time}-${i}`}><span className="history-icon"><Leaf size={18}/></span><div><strong>{item.label}</strong><small>{item.name} · {item.time}</small></div><span className="history-percent">{percent(item.confidence)}</span></div>) : <div className="no-history">No scans yet. Your latest analyses will appear here during this session.</div>}</section><section id="responsible" className="responsible-card"><div className="responsible-icon"><ShieldCheck size={25}/></div><span>RESPONSIBLE AI</span><h3>A helpful signal, never a final diagnosis.</h3><p>Model scores aren't calibrated for real-world farming conditions. Symptoms can overlap; expert review remains essential.</p><a href="https://github.com/MENSTRUE/LeafDoctor-Lite" target="_blank" rel="noreferrer">Read project limitations <ArrowRight size={15}/></a></section></div>
        <footer className="page-footer"><div><Leaf size={17}/> LeafDoctor Lite <span>·</span> Day 31 / 100 Projects</div><span>Research prototype · Not for definitive diagnosis</span></footer>
      </main>
    </div>
  </div>;
}
