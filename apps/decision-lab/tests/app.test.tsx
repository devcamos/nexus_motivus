import { after, afterEach, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { act } from 'react';
import type { Root } from 'react-dom/client';
import { App } from '../src/App.tsx';
import { freshDraft, parseProgress, STORAGE_KEY } from '../src/model.ts';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://decision-lab.example/' });
let root: Root;
let createRoot: typeof import('react-dom/client').createRoot;
before(async () => {
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Event: dom.window.Event, IS_REACT_ACT_ENVIRONMENT: true });
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
  dom.window.scrollTo = () => undefined;
  dom.window.confirm = () => true;
  ({ createRoot } = await import('react-dom/client'));
});
beforeEach(() => { dom.window.localStorage.clear(); root = createRoot(document.getElementById('root')!); });
afterEach(async () => { await act(async () => root.unmount()); });
after(() => dom.window.close());

async function mount() { await act(async () => root.render(<App />)); }
function button(text: string) {
  const found = [...document.querySelectorAll<HTMLButtonElement>('button')].find(b => b.textContent?.trim() === text);
  assert(found, `Button not found: ${text}`); return found;
}
async function click(element: HTMLElement) { await act(async () => element.click()); }
async function write(id: string, text: string) {
  const input = document.getElementById(id) as HTMLTextAreaElement;
  assert(input, `Field not found: ${id}`);
  await act(async () => {
    const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLTextAreaElement.prototype, 'value')!.set!;
    setter.call(input, text);
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  });
}

test('a complete practice session persists its action, allows application and supports retry comparison', async () => {
  await mount();
  assert.equal(document.querySelectorAll('.scenario-card').length, 8);
  await click(button('Start a 5-minute practice'));
  assert(button('Explain my choice').disabled);
  await click(document.querySelector<HTMLInputElement>('input[name="approach"]')!);
  await click(button('Explain my choice'));
  assert(button('Review my approach').disabled);
  for (const field of ['reasoning', 'evidence', 'consequences', 'people']) await write(`reflection-${field}`, 'I would clarify the deadline, protect commitments and explain the trade-off.');
  await click(button('Review my approach'));
  assert.equal(document.querySelectorAll('.coaching-card').length, 4);
  assert(document.body.textContent?.includes('not an AI assessment'));
  await click(button('Choose an action'));
  assert(button('Complete practice').disabled);
  await write('intention', 'In my next request, I will ask about the smallest useful outcome and deadline.');
  await click(button('Complete practice'));
  assert.equal(document.querySelectorAll('.journal-entry').length, 1);
  let persisted = parseProgress(dom.window.localStorage.getItem(STORAGE_KEY));
  assert.equal(persisted.attempts.length, 1);
  assert.equal(persisted.draft, null);
  await click(button('Mark action applied'));
  persisted = parseProgress(dom.window.localStorage.getItem(STORAGE_KEY));
  assert(persisted.attempts[0].appliedAt);
  await click(button('Practise again'));
  await click(document.querySelectorAll<HTMLInputElement>('input[name="approach"]')[1]);
  await click(button('Explain my choice'));
  for (const field of ['reasoning', 'evidence', 'consequences', 'people']) await write(`reflection-${field}`, 'On a second attempt, I would consider the earlier promise more carefully.');
  await click(button('Review my approach'));
  assert(document.body.textContent?.includes('Compare with your last completed attempt'));
  assert.equal(parseProgress(dom.window.localStorage.getItem(STORAGE_KEY)).attempts.length, 1);
});

test('an unfinished scenario resumes after remount with the chosen approach and reflection intact', async () => {
  const draft = freshDraft('say-no');
  draft.approachId = 'small-help'; draft.step = 1; draft.reflections.reasoning = 'A bounded contribution could protect both commitments.';
  dom.window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, attempts: [], draft }));
  await mount();
  await click(button('Resume practice'));
  assert.equal((document.getElementById('reflection-reasoning') as HTMLTextAreaElement).value, draft.reflections.reasoning);
  assert(document.body.textContent?.includes('Offer a bounded contribution'));
});

test('track filtering returns the correct scenarios and progress starts without invented achievements', async () => {
  await mount();
  await click([...document.querySelectorAll<HTMLButtonElement>('.track-filters button')].find(b => b.textContent?.includes('Communication'))!);
  assert.equal(document.querySelectorAll('.scenario-card').length, 4);
  assert([...document.querySelectorAll('.scenario-card')].every(card => card.classList.contains('communication')));
  await click(button('My progress'));
  assert(document.body.textContent?.includes('0 completed sessions'));
  assert.equal(document.querySelectorAll('.journal-entry').length, 0);
});

test('unavailable device storage is surfaced without crashing the practice UI', async () => {
  const descriptor = Object.getOwnPropertyDescriptor(dom.window, 'localStorage')!;
  Object.defineProperty(dom.window, 'localStorage', { configurable: true, get: () => { throw new Error('Storage blocked'); } });
  try {
    await mount();
    assert(document.querySelector('[role="alert"]')?.textContent?.includes('Device storage is unavailable'));
    await click(button('Start a 5-minute practice'));
    assert(document.getElementById('scenario-title'));
  } finally { Object.defineProperty(dom.window, 'localStorage', descriptor); }
});

test('clearing progress requires a deliberate confirmation and only affects this application', async () => {
  dom.window.localStorage.setItem('another-app', 'keep-me');
  await mount(); await click(button('My progress')); await click(button('Clear local progress'));
  assert(document.body.textContent?.includes('Clear all completed sessions'));
  await click(button('Keep progress'));
  assert(!document.body.textContent?.includes('Clear all completed sessions'));
  await click(button('Clear local progress')); await click(button('Clear everything'));
  assert.equal(dom.window.localStorage.getItem('another-app'), 'keep-me');
  assert.equal(parseProgress(dom.window.localStorage.getItem(STORAGE_KEY)).attempts.length, 0);
});
