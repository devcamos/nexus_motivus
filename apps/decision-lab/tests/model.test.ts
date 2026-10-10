import test from 'node:test';
import assert from 'node:assert/strict';
import { completeAttempt, feedback, freshDraft, freshProgress, parseProgress, reflectionReady, stats } from '../src/model.ts';
import { lenses, scenarios } from '../src/scenarios.ts';

function readyDraft(id = scenarios[0].id) {
  const draft = freshDraft(id);
  draft.approachId = scenarios.find(s => s.id === id)!.approaches[0].id;
  for (const lens of lenses) draft.reflections[lens.id] = 'I would check the facts and consider the effects before deciding.';
  draft.intention = 'In my next conversation, I will ask what is essential before committing.';
  return draft;
}

test('scenario catalogue has unique identities and actionable feedback for every approach', () => {
  assert.equal(new Set(scenarios.map(s => s.id)).size, 8);
  assert.equal(scenarios.filter(s => s.track === 'judgment').length, 4);
  assert.equal(scenarios.filter(s => s.track === 'communication').length, 4);
  for (const scenario of scenarios) {
    assert.equal(new Set(scenario.approaches.map(a => a.id)).size, 3);
    for (const option of scenario.approaches) {
      const notes = feedback(scenario, option.id);
      assert(lenses.every(lens => notes[lens.id].length > 30));
      assert(notes.nextStep.length > 30);
      assert(!Object.keys(notes).includes('score'));
    }
  }
});
test('completion rejects missing approach, incomplete reflection and an empty action', () => {
  assert.throws(() => completeAttempt(freshDraft(scenarios[0].id), 'a'));
  const draft = readyDraft();
  draft.reflections.evidence = '    ';
  assert.equal(reflectionReady(draft), false);
  assert.throws(() => completeAttempt(draft, 'a'));
  draft.reflections.evidence = 'Check the actual deadline and effort needed.';
  draft.intention = '    ';
  assert.throws(() => completeAttempt(draft, 'a'));
});
test('a completed attempt preserves an independent copy of the reflection', () => {
  const draft = readyDraft();
  const attempt = completeAttempt(draft, 'a', new Date('2026-10-10T19:00:00Z'));
  draft.reflections.reasoning = 'Changed in a later retry';
  assert.notEqual(attempt.reflections.reasoning, draft.reflections.reasoning);
  assert.equal(attempt.appliedAt, null);
  assert.equal(attempt.completedAt, '2026-10-10T19:00:00.000Z');
});
test('corrupt storage and unsupported versions recover to empty progress', () => {
  for (const raw of ['broken{', 'null', '[]', '{"version":9,"attempts":[]}']) assert.deepEqual(parseProgress(raw), freshProgress());
});
test('storage rejects unknown scenarios and invalid approaches while preserving valid entries', () => {
  const good = completeAttempt(readyDraft(), 'good');
  const raw = JSON.stringify({ version: 1, attempts: [good, { ...good, id: 'bad1', scenarioId: 'unknown' }, { ...good, id: 'bad2', approachId: 'unknown' }, null], draft: null });
  assert.deepEqual(parseProgress(raw).attempts.map(a => a.id), ['good']);
});
test('storage rejects impossible confidence, timestamps and overlong reflections', () => {
  const good = completeAttempt(readyDraft(), 'good');
  const bad = [
    { ...good, confidence: 6 }, { ...good, confidence: 1.2 }, { ...good, completedAt: 'invalid' },
    { ...good, appliedAt: 'invalid' }, { ...good, reflections: { ...good.reflections, people: 'x'.repeat(1501) } },
  ];
  for (const attempt of bad) assert.equal(parseProgress(JSON.stringify({ version: 1, attempts: [attempt] })).attempts.length, 0);
});
test('duplicate completion identities do not inflate progress', () => {
  const attempt = completeAttempt(readyDraft(), 'same');
  const result = parseProgress(JSON.stringify({ version: 1, attempts: [attempt, attempt] }));
  assert.equal(result.attempts.length, 1);
});
test('restored drafts cannot skip an unchosen approach or missing reflection', () => {
  const draft = { ...freshDraft(scenarios[0].id), step: 3 };
  assert.equal(parseProgress(JSON.stringify({ version: 1, attempts: [], draft })).draft!.step, 0);
  draft.approachId = scenarios[0].approaches[0].id;
  assert.equal(parseProgress(JSON.stringify({ version: 1, attempts: [], draft })).draft!.step, 1);
});
test('practice counts distinct scenarios separately from sessions and real-life application', () => {
  const a = completeAttempt(readyDraft(), 'a');
  const b = { ...completeAttempt(readyDraft(), 'b'), appliedAt: new Date().toISOString() };
  const c = completeAttempt(readyDraft('say-no'), 'c');
  assert.deepEqual(stats([a, b, c]), { sessions: 3, scenarios: 2, applied: 1 });
  assert.deepEqual(stats([a, b, c], 'judgment'), { sessions: 2, scenarios: 1, applied: 1 });
});
test('valid progress round-trips with a resumable draft and completed action', () => {
  const state = { version: 1, attempts: [completeAttempt(readyDraft(), 'a')], draft: { ...readyDraft('say-no'), step: 2 } };
  assert.deepEqual(parseProgress(JSON.stringify(state)), state);
});
test('coaching rejects an approach from another scenario', () => {
  assert.throws(() => feedback(scenarios[0], 'not-an-approach'));
});
