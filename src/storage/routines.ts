// localStorage persistence for saved routines and custom skills.

import type { Routine, Skill } from "../codes/types";

const ROUTINES_KEY = "gym-app:routines:v1";
const CUSTOM_SKILLS_KEY = "gym-app:custom-skills:v1";
const DRAFTS_KEY = "gym-app:drafts:v1";

interface StoredState {
  routines: Routine[];
}

interface StoredCustomSkills {
  skills: Skill[];
}

/**
 * A work-in-progress routine the user is composing but has not saved. Keyed by
 * `${codeId}:${event}` so switching code/event (or closing the tab) never
 * silently discards an in-progress draft — it's restored when you return.
 */
export interface DraftEntry {
  draft: Routine;
  /** The saved-routine id this draft is editing, or null for an unsaved new routine. */
  currentRoutineId: string | null;
}

interface StoredDrafts {
  drafts: Record<string, DraftEntry>;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or private-browsing — non-fatal, the app still works in-memory.
  }
}

export function loadRoutines(): Routine[] {
  return readJson<StoredState>(ROUTINES_KEY, { routines: [] }).routines;
}

export function saveRoutines(routines: Routine[]) {
  writeJson(ROUTINES_KEY, { routines } satisfies StoredState);
}

export function loadCustomSkills(): Skill[] {
  return readJson<StoredCustomSkills>(CUSTOM_SKILLS_KEY, { skills: [] }).skills;
}

export function saveCustomSkills(skills: Skill[]) {
  writeJson(CUSTOM_SKILLS_KEY, { skills } satisfies StoredCustomSkills);
}

export function loadDrafts(): Record<string, DraftEntry> {
  return readJson<StoredDrafts>(DRAFTS_KEY, { drafts: {} }).drafts;
}

export function saveDrafts(drafts: Record<string, DraftEntry>) {
  writeJson(DRAFTS_KEY, { drafts } satisfies StoredDrafts);
}
