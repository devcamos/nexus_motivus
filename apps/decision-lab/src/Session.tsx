import type { FormEvent } from 'react';
import { feedback, reflectionReady } from './model.ts';
import type { Attempt, Draft } from './model.ts';
import { lenses, tracks } from './scenarios.ts';
import type { Scenario } from './scenarios.ts';
import { Icon } from './Icon.tsx';

const steps = ['Consider', 'Explain', 'Reflect', 'Apply'];

export function Session({ scenario, draft, previous, update, finish, leave }: {
  scenario: Scenario; draft: Draft; previous?: Attempt;
  update: (draft: Draft) => void; finish: () => void; leave: () => void;
}) {
  const chosen = scenario.approaches.find(a => a.id === draft.approachId);
  const notes = chosen ? feedback(scenario, chosen.id) : null;
  const changeStep = (step: number) => update({ ...draft, step });
  function explain(event: FormEvent) {
    event.preventDefault();
    if (reflectionReady(draft)) changeStep(2);
  }

  return <section className="session animate-enter" aria-labelledby="scenario-title">
    <div className="session-top">
      <button className="text-button" onClick={leave}><Icon name="back" /> All scenarios</button>
      <span className="eyebrow">{tracks[scenario.track].title} / {scenario.focus}</span>
      <span className="duration"><Icon name="clock" size={16} /> {scenario.minutes} min</span>
    </div>
    <ol className="stepper" aria-label="Practice steps">{steps.map((step, index) => <li key={step} aria-current={draft.step === index ? 'step' : undefined} className={index <= draft.step ? 'active' : ''}><span>{index < draft.step ? <Icon name="check" size={15} /> : index + 1}</span>{step}</li>)}</ol>
    <div className="session-heading"><p className="eyebrow">Step {draft.step + 1} of 4</p><h1 id="scenario-title">{scenario.title}</h1><p>{scenario.description}</p></div>

    {draft.step === 0 && <div className="session-grid">
      <aside className="context-panel"><span className="eyebrow">The situation</span><p className="context-text">{scenario.context}</p><h3>What you know</h3><ul className="fact-list">{scenario.facts.map(f => <li key={f}><Icon name="check" size={16} />{f}</li>)}</ul><div className="unknown"><span className="eyebrow">What remains uncertain</span><p>{scenario.unknown}</p></div></aside>
      <div className="choice-panel"><h2>How would you approach this?</h2><p className="muted">Choose a starting point. You will explain your reasoning next.</p><fieldset className="approaches"><legend className="sr-only">Choose an approach</legend>{scenario.approaches.map((a, i) => <label key={a.id} className={`approach ${draft.approachId === a.id ? 'selected' : ''}`}><input type="radio" name="approach" value={a.id} checked={draft.approachId === a.id} onChange={() => update({ ...draft, approachId: a.id })} className="sr-only" /><span className="choice-letter">{String.fromCharCode(65 + i)}</span><span><strong>{a.title}</strong><span className="option-detail">{a.detail}</span></span><span className="choice-indicator">{draft.approachId === a.id && <Icon name="check" size={15} />}</span></label>)}</fieldset><div className="session-actions"><span className="small muted">Several approaches can be defensible.</span><button className="primary" disabled={!chosen} onClick={() => changeStep(1)}>Explain my choice <Icon name="arrow" /></button></div></div>
    </div>}

    {draft.step === 1 && <form onSubmit={explain} className="reflection-form">
      <div className="chosen-note"><Icon name="compass" /><span>Your starting point: <strong>{chosen?.title}</strong></span><button type="button" className="text-button" onClick={() => changeStep(0)}>Change</button></div>
      <div className="reflection-grid">{lenses.map((lens, i) => <label className="reflection-field" key={lens.id} htmlFor={`reflection-${lens.id}`}><span className="field-heading"><span className="lens-number">0{i + 1}</span><strong>{lens.title}</strong></span><span className="field-prompt">{lens.prompt}</span><textarea id={`reflection-${lens.id}`} required minLength={12} maxLength={1500} value={draft.reflections[lens.id]} placeholder={lens.placeholder} onChange={e => update({ ...draft, reflections: { ...draft.reflections, [lens.id]: e.target.value } })} /><span className="small muted">{draft.reflections[lens.id].trim().length < 12 ? 'Write at least 12 characters.' : `${draft.reflections[lens.id].length} / 1500 characters`}</span></label>)}</div>
      <div className="confidence"><div><label htmlFor="confidence"><strong>How confident are you?</strong></label><p className="small muted">Notice your certainty before reviewing the trade-offs.</p></div><div className="confidence-input"><input id="confidence" type="range" min="1" max="5" value={draft.confidence} onChange={e => update({ ...draft, confidence: Number(e.target.value) })} /><span>{draft.confidence} / 5</span></div></div>
      <div className="session-actions"><button type="button" className="secondary" onClick={() => changeStep(0)}><Icon name="back" /> Back</button><button className="primary" disabled={!reflectionReady(draft)}>Review my approach <Icon name="arrow" /></button></div>
    </form>}

    {draft.step === 2 && notes && <div className="review-panel">
      <div className="review-intro"><span className="icon-tile"><Icon name="spark" /></span><div><h2>A closer look at your approach</h2><p className="muted">Coaching notes explore your chosen approach. Use them to review your written reasoning.</p></div></div>
      <div className="coaching-grid">{lenses.map(lens => <article className={`coaching-card ${lens.id}`} key={lens.id}><span className="eyebrow">{lens.title}</span><p>{notes[lens.id]}</p><details><summary>Your reflection</summary><blockquote>{draft.reflections[lens.id]}</blockquote></details></article>)}</div>
      <div className="next-step"><span className="eyebrow">Make it concrete</span><p>{notes.nextStep}</p></div>
      {previous && <details className="comparison"><summary>Compare with your last completed attempt</summary><p className="small muted">Previous approach: <strong>{scenario.approaches.find(a => a.id === previous.approachId)?.title}</strong></p><blockquote>{previous.reflections.reasoning}</blockquote><p className="small">What changed in your reasoning or the evidence you would seek?</p></details>}
      <p className="small muted feedback-note">These are authored prompts, not an AI assessment of your writing or a score of your character.</p>
      <div className="session-actions"><button className="secondary" onClick={() => changeStep(0)}>Try another approach</button><button className="primary" onClick={() => changeStep(3)}>Choose an action <Icon name="arrow" /></button></div>
    </div>}

    {draft.step === 3 && <form className="apply-panel" onSubmit={e => { e.preventDefault(); if (draft.intention.trim().length >= 12) finish(); }}>
      <span className="large-icon"><Icon name="spark" size={30} /></span><h2>Take one thing into real life.</h2><p className="muted">Choose a small action you can practise in an ordinary situation. You can record when you apply it in your progress journal.</p>
      <label htmlFor="intention">What will you do, and when?</label><textarea id="intention" required minLength={12} maxLength={1500} placeholder="In my next conversation, I will ask one clarifying question before responding..." value={draft.intention} onChange={e => update({ ...draft, intention: e.target.value })} />
      <p className="small muted">Write at least 12 characters. Your notes are saved on this device.</p>
      <div className="session-actions"><button type="button" className="secondary" onClick={() => changeStep(2)}><Icon name="back" /> Back</button><button className="primary" disabled={draft.intention.trim().length < 12}>Complete practice <Icon name="check" /></button></div>
    </form>}
  </section>;
}
