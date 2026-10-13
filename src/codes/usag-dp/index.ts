// USA Gymnastics Men's Development Program (MDP) — Levels 7–10.
//
// Sources (all publicly available USAG documents):
//   - MDP Newsletter #4, February 27, 2025 (rules interpretations,
//     standardised across the country and "to be applied immediately"):
//     https://static.usagym.org/PDFs/Men/devprogram/newsletters/2025_feb27.pdf
//   - 2025 Championship Season Directives v.2:
//     https://static.usagym.org/PDFs/Men/devprogram/25directives.pdf
//
// What's verified from the newsletter (item #6 "Element Group Credit
// Explained" and #5 "EG IV credit"):
//
//   LEVEL 7  — EG I/II/III: 0.5 for FIG "A" or higher.
//              EG IV: 0.5 when FIG "A" or higher is performed (FX excepted).
//   LEVEL 8  — EG I/II/III: 0.5 for FIG "A" or higher.
//              EG IV: value of the skill (FX excepted).
//   LEVEL 9  — EG I: 0.5 for FIG "A" or higher.
//              EG II/III: 0.5 for FIG "C" or higher; 0.3 for "A"/"B".
//              EG IV: value of the skill (FX excepted).
//   LEVEL 10 — EG I: 0.5 for FIG "A" or higher.
//              EG II/III: 0.5 for FIG "D" or higher; 0.3 for "A"/"B"/"C".
//              EG IV: value of the skill (FX excepted).
//
// Level 10's EG bonus structure is IDENTICAL to FIG senior 2025-2028.
// Levels 7–9 are progressively more lenient (lower required difficulty
// for full EG credit). Skill catalog is shared with FIG (USAG MDP scores
// against FIG difficulty values).
//
// What's NOT yet encoded (documented as warnings on the routine):
//   - "MDP D & E Bonus Tables" (Attachment B of the directives) — these
//     award additional bonuses beyond the FIG D-score. The actual tables
//     are inside the proprietary Competition Manual (Google Play paywall).
//   - PH circle-handstand exception: large deductions become medium
//     (newsletter PH #7). This affects E-score, not SV, so out of scope.
//   - Rings strength upgrades for Levels 7–9 (newsletter Rings #6.a).
//   - Other level-specific composition exceptions.

import type {
  CodeOfPoints,
  ElementGroupBonus,
  GymEvent,
  Routine,
  ScoreBreakdown,
  Skill,
} from "../types";
import { ALL_ELEMENT_GROUPS, DIFFICULTY_VALUES } from "../types";
import { fig2025 } from "../fig-2025";

export type MdpLevel = 7 | 8 | 9 | 10;

interface LevelRules {
  /** Minimum difficulty letter for full 0.5 EG II/III bonus. */
  egIiiiiThreshold: "A" | "C" | "D";
  /** EG IV: value-of-skill on all events except FX, OR 0.5 for FIG A+. */
  egIvMode: "value-of-skill" | "flat-half";
  notes: string[];
}

const RULES: Record<MdpLevel, LevelRules> = {
  7: {
    egIiiiiThreshold: "A",
    egIvMode: "flat-half",
    notes: ["Level 7 grants 0.5 EG credit for any FIG A or higher skill."],
  },
  8: {
    egIiiiiThreshold: "A",
    egIvMode: "value-of-skill",
    notes: [
      "Level 8 grants 0.5 EG I/II/III credit for any FIG A skill.",
      "Special repetition rules on PH are relaxed (newsletter PH #10–#12).",
    ],
  },
  9: {
    egIiiiiThreshold: "C",
    egIvMode: "value-of-skill",
    notes: [
      "Level 9 grants 0.5 EG II/III credit for FIG C+ skills; 0.3 for A/B.",
    ],
  },
  10: {
    egIiiiiThreshold: "D",
    egIvMode: "value-of-skill",
    notes: [
      "Level 10 EG bonus matches FIG senior 2025-28.",
      "MDP D & E Bonus tables (Attachment B) are not yet implemented — additional bonus points may apply beyond the displayed SV.",
    ],
  },
};

function difficultyMeets(a: string, threshold: "A" | "C" | "D"): boolean {
  const order = "ABCDEFGHIJ";
  return order.indexOf(a) >= order.indexOf(threshold);
}

interface ResolvedSkill {
  skill: Skill;
  isCounting: boolean;
  isDismount: boolean;
}

function recomputeEgBonusesForLevel(
  resolved: ResolvedSkill[],
  routine: Routine,
  rules: LevelRules,
): ElementGroupBonus[] {
  const counting = resolved.filter((r) => r.isCounting);
  const dismount = resolved.find((r) => r.isDismount);

  return ALL_ELEMENT_GROUPS.map((eg): ElementGroupBonus => {
    const inEg = counting.filter((r) => r.skill.elementGroup === eg);
    if (inEg.length === 0) return { elementGroup: eg, bonus: 0 };

    const best = inEg.reduce((acc, r) =>
      DIFFICULTY_VALUES[r.skill.difficulty] > DIFFICULTY_VALUES[acc.skill.difficulty]
        ? r
        : acc,
    );

    // EG IV (non-FX) = value of the dismount itself.
    if (
      routine.event !== "FX" &&
      rules.egIvMode === "value-of-skill" &&
      eg === "IV" &&
      dismount
    ) {
      return {
        elementGroup: eg,
        bonus: DIFFICULTY_VALUES[dismount.skill.difficulty],
        fulfilledBySkillId: dismount.skill.id,
      };
    }

    // EG IV (non-FX) at level 7 = flat 0.5 if any FIG A+ dismount.
    if (
      routine.event !== "FX" &&
      rules.egIvMode === "flat-half" &&
      eg === "IV" &&
      dismount
    ) {
      return {
        elementGroup: eg,
        bonus: 0.5,
        fulfilledBySkillId: dismount.skill.id,
      };
    }

    // EG I always 0.5 if any element is present (matches FIG).
    if (eg === "I") {
      return { elementGroup: eg, bonus: 0.5, fulfilledBySkillId: best.skill.id };
    }

    // EG II / III thresholds (vary by level).
    const meets = difficultyMeets(best.skill.difficulty, rules.egIiiiiThreshold);
    return {
      elementGroup: eg,
      bonus: meets ? 0.5 : 0.3,
      fulfilledBySkillId: best.skill.id,
    };
  });
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function buildMdpCode(level: MdpLevel): CodeOfPoints {
  const rules = RULES[level];

  return {
    id: `usag-dp-l${level}`,
    name: `USAG Development Program — Level ${level}`,
    shortName: `USAG L${level}`,
    enabled: true,
    supportedEvents: ["FX", "PH", "SR", "VT", "PB", "HB"],

    getSkillCatalog(event: GymEvent) {
      return fig2025.getSkillCatalog(event);
    },

    calculateStartValue(routine: Routine, allSkills: Skill[]): ScoreBreakdown {
      // Reuse the FIG engine to identify counting set / dismount / connection
      // value / warnings — then recompute EG bonuses per MDP level rules.
      const fig = fig2025.calculateStartValue(routine, allSkills);

      const countingUids = new Set(fig.countingUids);
      const resolved: ResolvedSkill[] = routine.skills
        .map((rs) => {
          const skill = allSkills.find((s) => s.id === rs.skillId);
          if (!skill) return undefined;
          return {
            skill,
            isCounting: countingUids.has(rs.uid),
            isDismount: rs.uid === fig.dismountUid,
          };
        })
        .filter((x): x is ResolvedSkill => x !== undefined);

      const elementGroups = recomputeEgBonusesForLevel(resolved, routine, rules);
      const elementGroupBonus = round1(
        elementGroups.reduce((sum, g) => sum + g.bonus, 0),
      );
      const startValue = round1(
        fig.difficultyValue + elementGroupBonus + fig.connectionValue,
      );

      return {
        ...fig,
        elementGroupBonus,
        startValue,
        elementGroups,
        warnings: [...fig.warnings, ...rules.notes.map((n) => `[Level ${level}] ${n}`)],
      };
    },
  };
}

export const usagDpL7 = buildMdpCode(7);
export const usagDpL8 = buildMdpCode(8);
export const usagDpL9 = buildMdpCode(9);
export const usagDpL10 = buildMdpCode(10);

// ── Compulsory levels (4, 5, 6) ─────────────────────────────────────────────
// These don't let the gymnast build a routine — they perform the prescribed
// compulsory routine for their level.

import { getCompulsoryRoutine } from "./compulsory-routines";
import type { GymEvent as _GymEvent, ScoreBreakdown as _ScoreBreakdown } from "../types";

function buildCompulsoryCode(level: 4 | 5 | 6): CodeOfPoints {
  return {
    id: `usag-dp-l${level}`,
    name: `USAG Development Program — Level ${level} (Compulsory)`,
    shortName: `USAG L${level}`,
    enabled: true,
    isCompulsory: true,
    supportedEvents: ["FX", "PH", "SR", "VT", "PB", "HB"],

    getSkillCatalog(): Skill[] {
      // Compulsory levels have prescribed routines; users don't pick skills.
      return [];
    },

    calculateStartValue(routine, _allSkills): _ScoreBreakdown {
      // SV for a compulsory routine is the base SV of the prescribed routine
      // for that event (typically 10.0). Bonuses (SBs/Vs) are achievement
      // toggles, not skills picked from a catalog.
      const compulsory = getCompulsoryRoutine(level, routine.event);
      const baseSv = compulsory?.baseStartValue ?? 0;
      return {
        difficultyValue: baseSv,
        elementGroupBonus: 0,
        connectionValue: 0,
        startValue: baseSv,
        countingUids: [],
        droppedUids: [],
        elementGroups: ALL_ELEMENT_GROUPS.map((eg) => ({ elementGroup: eg, bonus: 0 })),
        connections: [],
        warnings: compulsory
          ? [
              `Level ${level} ${routine.event} is a compulsory routine. SV starts at ${baseSv.toFixed(1)} and is increased by any Specified Bonus (+0.5) or Value Increase (+0.1) achievements.`,
            ]
          : [`No compulsory routine defined for Level ${level} ${routine.event}.`],
      };
    },

    getCompulsoryRoutine(event: _GymEvent) {
      return getCompulsoryRoutine(level, event);
    },
  };
}

export const usagDpL4 = buildCompulsoryCode(4);
export const usagDpL5 = buildCompulsoryCode(5);
export const usagDpL6 = buildCompulsoryCode(6);

// Backwards-compat alias for the prior import name.
export const USAG_DP_ID = usagDpL10.id;
