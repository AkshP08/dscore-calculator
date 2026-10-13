// FIG 2025–2028 Vault scoring.
//
// Vault uses a completely different model: each vault has a single Difficulty
// Value listed in a table (Section 13.3, "FIG MAG Vault Value Table"). For
// Qualifications, Team Final, and All-Around Final the gymnast performs one
// vault and the D-score = that vault's value. For Qualifications-for-Final
// and Apparatus Final the gymnast performs two vaults from different groups
// and the Final Score is the average.

import type { Routine, ScoreBreakdown, Skill } from "../types";
import { ALL_ELEMENT_GROUPS, DIFFICULTY_VALUES } from "../types";

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function calculateVaultStartValue(
  routine: Routine,
  allSkills: Skill[],
): ScoreBreakdown {
  const resolved = routine.skills
    .map((rs) => ({
      uid: rs.uid,
      skill: allSkills.find((s) => s.id === rs.skillId),
    }))
    .filter((x): x is { uid: string; skill: Skill } => x.skill !== undefined);

  const warnings: string[] = [];
  if (resolved.length === 0) {
    warnings.push("No vault selected.");
  } else if (resolved.length > 2) {
    warnings.push("Vault routines list at most 2 vaults (Apparatus Final / Qualifications-for-Final).");
  } else if (resolved.length === 2) {
    if (resolved[0].skill.elementGroup === resolved[1].skill.elementGroup) {
      warnings.push(
        "For Qualifications-for-Final and Apparatus Final, the two vaults must be from different vault groups (Section 13.2.2).",
      );
    }
  }

  const values = resolved.map(
    (r) => r.skill.numericValue ?? DIFFICULTY_VALUES[r.skill.difficulty],
  );
  const sumValues = values.reduce((a, b) => a + b, 0);
  // For 1 vault: SV = vault value. For 2 vaults: report the average (mirrors
  // how the Apparatus Final score works once you add E-scores).
  const startValue = resolved.length === 2 ? sumValues / 2 : sumValues;

  return {
    difficultyValue: round1(startValue),
    elementGroupBonus: 0,
    connectionValue: 0,
    startValue: round1(startValue),
    countingUids: resolved.map((r) => r.uid),
    droppedUids: [],
    elementGroups: ALL_ELEMENT_GROUPS.map((eg) => ({ elementGroup: eg, bonus: 0 })),
    connections: [],
    warnings,
  };
}
