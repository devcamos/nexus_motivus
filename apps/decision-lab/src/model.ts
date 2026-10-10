import { lenses, scenarios } from './scenarios.ts';
import type { Lens, Scenario, Track } from './scenarios.ts';

export interface Draft {
  scenarioId: string;
  approachId: string;
  reflections: Record<Lens, string>;
  confidence: number;
  intention: string;
  step: number;
}
export interface Attempt extends Draft {
  id: string;
  completedAt: string;
  appliedAt: string | null;
}
export interface Progress {
  version: 1;
  attempts: Attempt[];
  draft: Draft | null;
}
export const STORAGE_KEY = 'nexus-decision-lab-v1';
export const freshProgress = (): Progress => ({ version: 1, attempts: [], draft: null });
export const freshDraft = (scenarioId: string): Draft => ({ scenarioId, approachId: '', reflections: { reasoning: '', evidence: '', consequences: '', people: '' }, confidence: 3, intention: '', step: 0 });

export function validDraft(value: unknown): value is Draft {
  if (!value || typeof value !== 'object') return false;
  const d = value as Partial<Draft>;
  const scenario = scenarios.find(s => s.id === d.scenarioId);
  return Boolean(scenario && typeof d.approachId === 'string' && (d.approachId === '' || scenario.approaches.some(a => a.id === d.approachId)) &&
    Number.isInteger(d.step) && d.step! >= 0 && d.step! <= 3 &&
    Number.isInteger(d.confidence) && d.confidence! >= 1 && d.confidence! <= 5 &&
    typeof d.intention === 'string' && d.intention.length <= 1500 &&
    d.reflections && lenses.every(l => typeof d.reflections?.[l.id] === 'string' && d.reflections[l.id].length <= 1500));
}

export function reflectionReady(draft: Draft): boolean {
  return Boolean(draft.approachId && lenses.every(l => draft.reflections[l.id].trim().length >= 12));
}

export function parseProgress(raw: string | null): Progress {
  if (!raw) return freshProgress();
  try {
    const data = JSON.parse(raw) as Partial<Progress>;
    if (data.version !== 1 || !Array.isArray(data.attempts)) return freshProgress();
    const ids = new Set<string>();
    const attempts = data.attempts.filter(a => {
      if (!validDraft(a) || !a.id || typeof a.id !== 'string' || ids.has(a.id) || !reflectionReady(a) || a.intention.trim().length < 12 ||
        typeof a.completedAt !== 'string' || !Number.isFinite(Date.parse(a.completedAt)) ||
        (a.appliedAt !== null && (typeof a.appliedAt !== 'string' || !Number.isFinite(Date.parse(a.appliedAt))))) return false;
      ids.add(a.id);
      return true;
    }).slice(-1000);
    const draft = validDraft(data.draft) ? data.draft : null;
    if (draft && draft.step > 0 && !draft.approachId) draft.step = 0;
    if (draft && draft.step > 1 && !reflectionReady(draft)) draft.step = 1;
    return { version: 1, attempts, draft };
  } catch { return freshProgress(); }
}

export function completeAttempt(draft: Draft, id: string, date = new Date()): Attempt {
  if (!validDraft(draft) || !reflectionReady(draft) || draft.intention.trim().length < 12) throw new Error('Choose an approach, complete your reflections, and add a practical action.');
  return { ...draft, reflections: { ...draft.reflections }, intention: draft.intention.trim(), id, step: 3, completedAt: date.toISOString(), appliedAt: null };
}

export function stats(attempts: Attempt[], track?: Track) {
  const filtered = track ? attempts.filter(a => scenarios.find(s => s.id === a.scenarioId)?.track === track) : attempts;
  return { sessions: filtered.length, scenarios: new Set(filtered.map(a => a.scenarioId)).size, applied: filtered.filter(a => a.appliedAt).length };
}

export function feedback(scenario: Scenario, approachId: string): Record<Lens, string> & { nextStep: string } {
  const approach = scenario.approaches.find(a => a.id === approachId);
  if (!approach) throw new Error('Choose a valid approach for this scenario.');
  return { reasoning: approach.strength, evidence: scenario.evidencePrompt, consequences: approach.risk, people: scenario.peoplePrompt, nextStep: approach.nextStep };
}
