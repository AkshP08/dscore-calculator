// localStorage persistence for saved routines and custom skills.

import type { Routine, Skill } from "../codes/types";

const ROUTINES_KEY = "gym-app:routines:v1";
const CUSTOM_SKILLS_KEY = "gym-app:custom-skills:v1";

interface StoredState {
  routines: Routine[];
}

interface StoredCustomSkills {
  skills: Skill[];
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
