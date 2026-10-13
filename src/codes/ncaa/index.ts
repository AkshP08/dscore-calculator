// NCAA Men's Gymnastics scoring.
//
// Sources for the 2025-26 NCAA Men's Gymnastics Rules Modifications:
//   - NCAA 2025-26 Men's Gymnastics Rules Modifications (s3.amazonaws.com)
//     https://ncaaorg.s3.amazonaws.com/championships/sports/gymnastics/rules/2025-26PRMGY_RulesMods.pdf
//   - College Gym News "New NCAA Gymnastics Rules ... for 2026" (Oct 2025)
//     https://collegegymnews.com/2025/10/02/new-ncaa-gymnastics-rules-modifications-and-what-they-all-mean-for-the-2026-season/
//
// The NCAA men's program uses the FIG Code of Points as its base, with
// modifications to element-group requirements, special-requirement
// deductions, and judging procedure. For 2025-26, the modification that
// previously made the NCAA more lenient than FIG (C-value element awarded
// full EG-II/III/IV bonus) has been REMOVED, so 2025-26 NCAA EG bonus rules
// now mirror FIG senior 2025-2028 exactly:
//   - D+ element fulfilling EG II/III/IV → 0.5
//   - A/B/C element fulfilling EG II/III/IV → 0.3
//   - EG I always full 0.5 for any skill
//
// What still differs from FIG senior in NCAA (and surfaces as warnings, not
// score differences, in this implementation):
//   - Special-requirement deduction structure (-0.2 for missing release
//     min-difficulty on HB, dismount min-difficulty, etc.)
//   - Different judge composition / inquiry rules (administrative; no SV impact)
//   - Some events have NCAA-specific composition requirements
//
// Implementation strategy: delegate to the FIG senior rules engine and
// catalog, then append NCAA-specific composition warnings.

import type { CodeOfPoints, GymEvent, Routine, ScoreBreakdown, Skill } from "../types";
import { fig2025 } from "../fig-2025";

export const NCAA_ID = "ncaa-men";

function ncaaWarnings(routine: Routine, allSkills: Skill[]): string[] {
  const warnings: string[] = [];
  const skills = routine.skills
    .map((rs) => allSkills.find((s) => s.id === rs.skillId))
    .filter(Boolean) as Skill[];

  // HB release-element minimum difficulty: at least D + C (raised from
  // C+C or D+B in earlier seasons). Missing this is a -0.2 SR deduction.
  if (routine.event === "HB") {
    const releaseElements = skills.filter((s) => s.elementGroup === "II");
    if (releaseElements.length < 2) {
      warnings.push(
        "NCAA HB: routines need at least 2 release elements (EG II); missing a D + C combination is a −0.2 SR deduction.",
      );
    }
  }

  // Dismount minimum difficulty: must end with a C connected to a C
  // dismount, OR a D/E dismount, to avoid a -0.2 SR deduction.
  const lastSkill = skills[skills.length - 1];
  if (lastSkill && ["D", "E", "F", "G", "H", "I", "J"].includes(lastSkill.difficulty)) {
    // OK — D+ dismount satisfies the requirement on its own.
  } else if (lastSkill && lastSkill.difficulty === "C") {
    const prev = skills[skills.length - 2];
    const isConnected = routine.skills[routine.skills.length - 1]?.connectedToPrevious;
    if (!prev || prev.difficulty < "C" || !isConnected) {
      warnings.push(
        "NCAA: dismount minimum is a C directly connected to a C, OR a D/E dismount. Otherwise −0.2 SR deduction.",
      );
    }
  } else if (lastSkill) {
    warnings.push(
      "NCAA: dismount minimum is a C directly connected to a C, OR a D/E dismount. Otherwise −0.2 SR deduction.",
    );
  }

  return warnings;
}

export const ncaa: CodeOfPoints = {
  id: NCAA_ID,
  name: "NCAA Men's Gymnastics 2025–26",
  shortName: "NCAA Men's",
  enabled: true,
  supportedEvents: ["FX", "PH", "SR", "VT", "PB", "HB"],

  getSkillCatalog(event: GymEvent) {
    // Same catalog as FIG senior — NCAA does not maintain a separate skill
    // database; it scores against FIG values.
    return fig2025.getSkillCatalog(event);
  },

  calculateStartValue(routine: Routine, allSkills: Skill[]): ScoreBreakdown {
    const figBreakdown = fig2025.calculateStartValue(routine, allSkills);
    return {
      ...figBreakdown,
      warnings: [...figBreakdown.warnings, ...ncaaWarnings(routine, allSkills)],
    };
  },
};
