import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.tsx';
import { Session } from './Session.tsx';
import { completeAttempt, freshDraft, freshProgress, parseProgress, stats, STORAGE_KEY } from './model.ts';
import type { Draft, Progress } from './model.ts';
import { scenarios, tracks } from './scenarios.ts';
import type { Scenario, Track } from './scenarios.ts';

type View = 'practice' | 'progress' | 'guide';
function readProgress(): Progress {
  try { return parseProgress(window.localStorage.getItem(STORAGE_KEY)); } catch { return freshProgress(); }
}
const dateLabel = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(date));

export function App() {
  const [progress, setProgress] = useState(readProgress);
  const [view, setView] = useState<View>('practice');
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<Track | 'all'>('all');
  const [notice, setNotice] = useState('');
  const [storageFailed, setStorageFailed] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); setStorageFailed(false); }
    catch { setStorageFailed(true); }
  }, [progress]);
  useEffect(() => {
    function sync(event: StorageEvent) { if (event.key === STORAGE_KEY) setProgress(parseProgress(event.newValue)); }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {
    main.current?.focus({ preventScroll: true });
    if (typeof window.scrollTo === 'function') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view, active, progress.draft?.step]);

  const total = stats(progress.attempts);
  const scenario = scenarios.find(s => s.id === active);
  const completed = new Set(progress.attempts.map(a => a.scenarioId));
  const recommended = scenarios.find(s => !completed.has(s.id)) ?? scenarios[0];
  const currentDraft = scenario && progress.draft?.scenarioId === scenario.id ? progress.draft : null;

  function navigate(next: View) { setView(next); setActive(null); setNotice(''); }
  function start(s: Scenario) {
    if (progress.draft && progress.draft.scenarioId !== s.id && !window.confirm('Replace your unfinished scenario? Completed practice sessions will be kept.')) return;
    setProgress(p => ({ ...p, draft: p.draft?.scenarioId === s.id ? p.draft : freshDraft(s.id) }));
    setActive(s.id); setView('practice'); setNotice('');
  }
  function update(draft: Draft) { setProgress(p => ({ ...p, draft })); }
  function finish() {
    if (!currentDraft) return;
    const attempt = completeAttempt(currentDraft, crypto.randomUUID());
    setProgress(p => ({ ...p, attempts: [...p.attempts, attempt].slice(-1000), draft: null }));
    setActive(null); setView('progress'); setNotice('Practice complete. Your action is ready to take into real life.');
  }
  function exportProgress() {
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' }));
    link.href = url; link.download = `decision-lab-progress-${new Date().toISOString().slice(0, 10)}.json`; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="app-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><button className="brand" onClick={() => navigate('practice')} aria-label="Decision Lab home"><span className="brand-mark"><Icon name="compass" size={25} /></span><span>Decision<span className="brand-light"> Lab</span><small>BY NEXUS MOTIVUS</small></span></button><nav aria-label="Main navigation">{([{ id: 'practice', label: 'Practice' }, { id: 'progress', label: 'My progress' }, { id: 'guide', label: 'How it works' }] as const).map(n => <button key={n.id} aria-current={view === n.id ? 'page' : undefined} className={view === n.id ? 'current' : ''} onClick={() => navigate(n.id)}>{n.label}</button>)}</nav><span className="header-pill"><span /> Human skills, practised.</span></header>
    <main id="main" ref={main} tabIndex={-1}>
      {storageFailed && <div role="alert" className="alert">Device storage is unavailable. You can practise, but your notes will be lost when you leave. Export your progress to keep a copy.</div>}
      {notice && <div role="status" className="notice"><Icon name="check" />{notice}<button aria-label="Dismiss message" onClick={() => setNotice('')}><Icon name="close" size={16} /></button></div>}

      {view === 'practice' && scenario && currentDraft ? <Session scenario={scenario} draft={currentDraft} previous={[...progress.attempts].reverse().find(a => a.scenarioId === scenario.id)} update={update} finish={finish} leave={() => setActive(null)} /> : null}

      {view === 'practice' && !(scenario && currentDraft) && <div className="animate-enter">
        <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="tiny-spark">✳</span> A sandbox for being human</p><h1>Better decisions.<br /><span>Stronger conversations.</span></h1><p className="hero-description">Practise the moments that matter. Explore a real-life scenario, examine your thinking, and take one useful action into your day.</p><div className="hero-actions"><button className="primary" onClick={() => start(progress.draft ? scenarios.find(s => s.id === progress.draft!.scenarioId)! : recommended)}>{progress.draft ? 'Resume practice' : 'Start a 5-minute practice'}<Icon name="arrow" /></button><span className="small muted">Small practice. Everyday application.</span></div></div><div className="decision-board" aria-hidden="true"><div className="board-top"><span>THE DECISION SPACE</span><span>01 / 04</span></div><div className="board-orbit"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><span className="orbit-label label-evidence">Evidence</span><span className="orbit-label label-people">People</span><span className="orbit-label label-impact">Consequences</span><div className="orbit-core"><Icon name="compass" size={45} /><span>Your next move</span></div><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /></div><div className="board-bottom"><span className="board-dot" /> Pause. Consider. Choose.</div></div></section>
        <section className="stats-strip" aria-label="Your practice summary"><div><span className="stat-number">{total.sessions.toString().padStart(2, '0')}</span><span>Practice sessions</span></div><div><span className="stat-number">{total.scenarios}<small> / {scenarios.length}</small></span><span>Scenarios explored</span></div><div><span className="stat-number">{total.applied.toString().padStart(2, '0')}</span><span>Actions applied</span></div><p><Icon name="book" /><span>Your thinking improves through<br /><strong>practice, reflection and application.</strong></span></p></section>
        <section className="practice-library" aria-labelledby="library-heading"><div className="section-heading"><div><p className="eyebrow">Your practice space</p><h2 id="library-heading">Choose a moment to work through.</h2></div><span className="small muted">{scenarios.length} scenarios · 2 foundations</span></div><div className="library-layout"><aside className="track-sidebar"><p className="eyebrow">Foundations</p><div className="track-filters" aria-label="Filter scenarios">{(['all', 'judgment', 'communication'] as const).map(t => <button key={t} aria-pressed={filter === t} className={filter === t ? 'active' : ''} onClick={() => setFilter(t)}><Icon name={t === 'communication' ? 'chat' : t === 'all' ? 'spark' : 'compass'} /><span>{t === 'all' ? 'All scenarios' : tracks[t].title}</span><small>{t === 'all' ? scenarios.length : scenarios.filter(s => s.track === t).length}</small></button>)}</div><div className="sidebar-note"><span className="eyebrow">The principle</span><p>Good judgment asks better questions. Good communication makes space for other people.</p><button className="text-button" onClick={() => navigate('guide')}>Explore the method <Icon name="arrow" size={16} /></button></div></aside><div className="scenario-grid">{scenarios.filter(s => filter === 'all' || s.track === filter).map((s, index) => <article key={s.id} className={`scenario-card ${s.track}`}><div className="card-top"><span className="track-tag"><Icon name={s.track === 'judgment' ? 'compass' : 'chat'} size={15} />{tracks[s.track].title}</span><span className="card-index">{String(index + 1).padStart(2, '0')}</span></div><h3>{s.title}</h3><p>{s.description}</p><div className="card-bottom"><span className="small muted"><Icon name="clock" size={14} />{s.minutes} min<span className="divider-dot">·</span>{s.focus}</span><button className="card-action" aria-label={`${completed.has(s.id) ? 'Practise again' : 'Practise'}: ${s.title}`} onClick={() => start(s)}>{completed.has(s.id) ? <Icon name="check" size={18} /> : <Icon name="arrow" size={18} />}</button></div></article>)}</div></div></section>
        <section className="closing-note"><Icon name="spark" size={23} /><p>You do not need a perfect answer.<br /><strong>You need a thoughtful next move.</strong></p><button className="text-button" onClick={() => navigate('guide')}>See how practice works <Icon name="arrow" size={17} /></button></section>
      </div>}

      {view === 'progress' && <section className="progress-page animate-enter" aria-labelledby="progress-heading"><div className="section-heading"><div><p className="eyebrow">Your practice journal</p><h1 id="progress-heading">Small steps, made visible.</h1><p className="muted">Track practice and real-life application. Completion counts reflect activity, not mastery.</p></div><button className="secondary" onClick={exportProgress}><Icon name="download" /> Export progress</button></div><div className="progress-summary">{Object.entries(tracks).map(([id, track]) => { const result = stats(progress.attempts, id as Track); return <article className="progress-track" key={id}><Icon name={id === 'judgment' ? 'compass' : 'chat'} size={25} /><h2>{track.title}</h2><p>{result.scenarios} of 4 scenarios explored</p><progress value={result.scenarios} max={4} aria-label={`${track.title} scenarios explored`} /><span className="small muted">{result.sessions} sessions · {result.applied} actions applied</span></article>; })}</div><div className="section-heading journal-heading"><h2>From reflection to action</h2><span className="small muted">{total.sessions} completed sessions</span></div>{progress.attempts.length === 0 ? <div className="empty-state"><span className="large-icon"><Icon name="book" size={28} /></span><h2>Your first entry starts with a choice.</h2><p className="muted">Complete a scenario and choose an action. Your practice will appear here.</p><button className="primary" onClick={() => start(recommended)}>Explore a scenario <Icon name="arrow" /></button></div> : <div className="journal-list">{[...progress.attempts].reverse().map(a => { const s = scenarios.find(s => s.id === a.scenarioId)!; return <article className="journal-entry" key={a.id}><div className="journal-top"><span className="track-tag">{tracks[s.track].title}</span><span className="small muted">{dateLabel(a.completedAt)}</span></div><h3>{s.title}</h3><p className="small muted">Chosen approach: {s.approaches.find(o => o.id === a.approachId)?.title} · Initial confidence {a.confidence}/5</p><div className="action-note"><span className="eyebrow">Your real-life action</span><p>{a.intention}</p></div><div className="journal-bottom"><button className={a.appliedAt ? 'applied-button' : 'secondary'} onClick={() => setProgress(p => ({ ...p, attempts: p.attempts.map(item => item.id === a.id ? { ...item, appliedAt: item.appliedAt ? null : new Date().toISOString() } : item) }))}><Icon name="check" size={17} />{a.appliedAt ? `Applied ${dateLabel(a.appliedAt)}` : 'Mark action applied'}</button><button className="text-button" onClick={() => start(s)}>Practise again <Icon name="arrow" size={16} /></button></div><details className="saved-reflections"><summary>Review your reflections</summary>{Object.entries(a.reflections).map(([key, value]) => <div key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong><p>{value}</p></div>)}</details></article>; })}</div>}<div className="data-note"><p className="small muted">Progress stays in this browser on this device. Export a copy before changing devices. The journal keeps your most recent 1,000 completed sessions.</p>{!confirmReset ? <button className="text-button muted" onClick={() => setConfirmReset(true)}>Clear local progress</button> : <div className="reset-confirm" role="alert"><p>Clear all completed sessions and your unfinished scenario on this device?</p><button className="secondary" onClick={() => setConfirmReset(false)}>Keep progress</button><button className="danger-button" onClick={() => { setProgress(freshProgress()); setConfirmReset(false); setNotice('Local progress cleared.'); }}>Clear everything</button></div>}</div></section>}

      {view === 'guide' && <section className="guide-page animate-enter" aria-labelledby="guide-heading"><p className="eyebrow">The practice method</p><h1 id="guide-heading">A little space before your next move.</h1><p className="guide-lead">Decision Lab is a human skills sandbox. Work through ordinary situations and practise how you think, communicate and act.</p><div className="method-grid">{[{ title: 'Consider', text: 'Read the situation. Separate what you know from what remains uncertain.' }, { title: 'Explain', text: 'Choose an approach and write your reasoning through four lenses.' }, { title: 'Reflect', text: 'Use coaching notes to examine evidence, consequences and your treatment of people.' }, { title: 'Apply', text: 'Commit to one practical action. Record when you use it in real life.' }].map((step, i) => <article key={step.title}><span className="lens-number">0{i + 1}</span><h2>{step.title}</h2><p>{step.text}</p></article>)}</div><div className="guide-explanation"><div><h2>Several answers can make sense.</h2><p>A good choice depends on goals, evidence and constraints. The coaching prompts discuss the strengths and risks of each approach. They do not decide whether your personal values are correct.</p></div><div><h2>Practice becomes useful through application.</h2><p>Finishing a scenario records practice, not proven skill. Try your action, notice what happened and revisit your reasoning. You can complete the same scenario again and compare it with your previous attempt.</p></div><div><h2>Your notes stay with you.</h2><p>Written reflections and progress are stored in your browser. This release has no account or cloud sync. Coaching is authored, not generated by AI, and your writing is not sent to an AI service.</p></div><div><h2>Start with two foundations.</h2><p>Judgment and communication are available now. Emotional regulation, learning and numeracy are future tracks, rather than features you need to unlock.</p></div></div><button className="primary" onClick={() => start(recommended)}>Try your first scenario <Icon name="arrow" /></button></section>}
    </main>
    <footer className="site-footer"><span className="footer-brand">NEXUS MOTIVUS <span>/</span> Decision Lab</span><span>Consider carefully. Communicate clearly. Act deliberately.</span><button className="text-button" onClick={() => navigate('guide')}>About your data</button></footer>
  </div>;
}
