// FIG 2025–2028 Code of Points — generic D-score calculator for
// FX / PH / SR / PB / HB. Vault uses a separate code path (see rules-vault.ts).
//
// Reference: FIG MAG 2025–2028 Code of Points (April 2025).
//   Section 6 (Evaluation of Competition Exercises),
//   Section 7 (Regulations Governing the D-score),
//   Section 10–15 (per-apparatus rules).

import type {
  Difficulty,
  ElementGroup,
  Routine,
  Skill,
  ScoreBreakdown,
  ElementGroupBonus,
  ConnectionBonus,
} from "../types";
import { DIFFICULTY_VALUES, ALL_ELEMENT_GROUPS } from "../types";
import { EVENT_CONFIGS } from "./event-configs";
import type { EventConfig } from "./event-configs";

const MAX_PER_EG_IN_COUNTING = 4;
const TOP_NON_DISMOUNT = 7;

interface RoutineSkillResolved {
  uid: string;
  skill: Skill;
  connectedToPrevious: boolean;
  index: number;
}

function difficultyToNumber(d: Difficulty): number {
  return DIFFICULTY_VALUES[d];
}

function isDPlus(d: Difficulty): boolean {
  return difficultyToNumber(d) >= DIFFICULTY_VALUES.D;
}

function findDismountIndex(
  skills: RoutineSkillResolved[],
  eligibleGroups: ElementGroup[],
): number | undefined {
  for (let i = skills.length - 1; i >= 0; i--) {
    if (eligibleGroups.includes(skills[i].skill.elementGroup)) return i;
  }
  return undefined;
}

function pickTopSeven(
  candidates: RoutineSkillResolved[],
  dismountEg: ElementGroup | undefined,
): { counted: RoutineSkillResolved[]; dropped: RoutineSkillResolved[] } {
  const egCount: Record<ElementGroup, number> = { I: 0, II: 0, III: 0, IV: 0, V: 0 };
  if (dismountEg) egCount[dismountEg] = 1;

  const sorted = [...candidates].sort((a, b) => {
    const dv = difficultyToNumber(b.skill.difficulty) - difficultyToNumber(a.skill.difficulty);
    if (dv !== 0) return dv;
    return a.index - b.index;
  });

  const counted: RoutineSkillResolved[] = [];
  const dropped: RoutineSkillResolved[] = [];

  for (const rs of sorted) {
    const eg = rs.skill.elementGroup;
    if (counted.length < TOP_NON_DISMOUNT && egCount[eg] < MAX_PER_EG_IN_COUNTING) {
      counted.push(rs);
      egCount[eg] += 1;
    } else {
      dropped.push(rs);
    }
  }

  return { counted, dropped };
}

function computeEgBonuses(
  counting: RoutineSkillResolved[],
  dismount: RoutineSkillResolved | undefined,
  config: EventConfig,
): ElementGroupBonus[] {
  return ALL_ELEMENT_GROUPS.map((eg): ElementGroupBonus => {
    const inEg = counting.filter((rs) => rs.skill.elementGroup === eg);
    if (inEg.length === 0) {
      return { elementGroup: eg, bonus: 0 };
    }

    const best = inEg.reduce((acc, rs) =>
      difficultyToNumber(rs.skill.difficulty) > difficultyToNumber(acc.skill.difficulty)
        ? rs
        : acc,
    );

    // Section 7.2.8: on non-FX apparatus the dismount EG's bonus = the
    // dismount's own difficulty value. e.g. F dismount → 0.6 EG IV bonus.
    if (
      config.dismountEgValueEqualsDifficulty &&
      dismount !== undefined &&
      eg === dismount.skill.elementGroup
    ) {
      return {
        elementGroup: eg,
        bonus: difficultyToNumber(dismount.skill.difficulty),
        fulfilledBySkillId: dismount.skill.id,
      };
    }

    // Section 7.2.5–7.2.6: D+ → 0.5; A/B/C → 0.3 (except EG I which is always 0.5).
    const dPlus = isDPlus(best.skill.difficulty);
    const bonus = dPlus ? 0.5 : eg === "I" ? 0.5 : 0.3;

    return { elementGroup: eg, bonus, fulfilledBySkillId: best.skill.id };
  });
}

function computeConnections(
  skills: RoutineSkillResolved[],
  countingUids: Set<string>,
): ConnectionBonus[] {
  const out: ConnectionBonus[] = [];

  for (let i = 1; i < skills.length; i++) {
    const cur = skills[i];
    if (!cur.connectedToPrevious) continue;
    const prev = skills[i - 1];

    const reasons: string[] = [];

    if (!countingUids.has(prev.uid) || !countingUids.has(cur.uid)) {
      reasons.push("one or both skills are not inside the 8 counting elements");
    }
    if (prev.skill.flags?.isCounterSalto || cur.skill.flags?.isCounterSalto) {
      reasons.push("counter-salto connections do not earn CV");
    }
    if (
      prev.skill.flags?.isSingleSaltoWithTwist &&
      cur.skill.flags?.isSingleSaltoWithTwist
    ) {
      reasons.push("two directly-connected single saltos with twists do not earn CV");
    }

    let value = 0;
    if (reasons.length === 0) {
      const a = prev.skill.difficulty;
      const b = cur.skill.difficulty;
      const aDPlus = isDPlus(a);
      const bDPlus = isDPlus(b);
      const aBC = a === "B" || a === "C";
      const bBC = b === "B" || b === "C";

      if (aDPlus && bDPlus) value = 0.2;
      else if ((aDPlus && bBC) || (bDPlus && aBC)) value = 0.1;
      else reasons.push("connection does not meet a D+ paired with B/C/D+ requirement");
    }

    out.push({
      fromSkillId: prev.skill.id,
      toSkillId: cur.skill.id,
      value,
      reasons,
    });
  }

  return out;
}

function generateGenericWarnings(
  resolved: RoutineSkillResolved[],
  counting: RoutineSkillResolved[],
  dismountIndex: number | undefined,
  config: EventConfig,
): string[] {
  const warnings: string[] = [];

  if (dismountIndex === undefined) {
    warnings.push(
      `No dismount detected: routine must end with a skill from EG ${config.dismountEligibleGroups.join("/")}.`,
    );
  } else if (dismountIndex !== resolved.length - 1) {
    warnings.push(
      "Dismount is not the final skill in the routine — score is computed treating the last dismount-eligible skill as the dismount.",
    );
  }

  const egPresent = new Set(counting.map((rs) => rs.skill.elementGroup));
  for (const eg of ALL_ELEMENT_GROUPS) {
    if (!egPresent.has(eg)) {
      warnings.push(
        `Element Group ${eg} (${config.egNames[eg]}) is not represented in the counting 8 — no EG bonus awarded.`,
      );
    }
  }

  // Run apparatus-specific warning generator if provided.
  if (config.customWarnings) {
    warnings.push(
      ...config.customWarnings({
        allResolved: resolved.map((r) => ({ skill: r.skill, index: r.index })),
        countingResolved: counting.map((r) => ({ skill: r.skill })),
        dismountIndex,
      }),
    );
  }

  return warnings;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Generic FIG D-score calculator for any apparatus except Vault.
 * Picks the correct event config from `EVENT_CONFIGS` based on the routine.
 */
export function calculateGenericStartValue(
  routine: Routine,
  allSkills: Skill[],
): ScoreBreakdown {
  if (routine.event === "VT") {
    throw new Error("Use calculateVaultStartValue for vault routines.");
  }

  const config = EVENT_CONFIGS[routine.event];

  const resolved: RoutineSkillResolved[] = routine.skills
    .map((rs, index) => {
      const skill = allSkills.find((s) => s.id === rs.skillId);
      if (!skill) return undefined;
      return { uid: rs.uid, skill, connectedToPrevious: rs.connectedToPrevious, index };
    })
    .filter((x): x is RoutineSkillResolved => x !== undefined);

  if (resolved.length === 0) {
    return {
      difficultyValue: 0,
      elementGroupBonus: 0,
      connectionValue: 0,
      startValue: 0,
      countingUids: [],
      droppedUids: [],
      elementGroups: ALL_ELEMENT_GROUPS.map((eg) => ({ elementGroup: eg, bonus: 0 })),
      connections: [],
      warnings: ["Routine has no skills."],
    };
  }

  const dismountIndex = findDismountIndex(resolved, config.dismountEligibleGroups);
  const dismount = dismountIndex !== undefined ? resolved[dismountIndex] : undefined;

  const candidates = resolved.filter((_, i) => i !== dismountIndex);
  const { counted, dropped } = pickTopSeven(candidates, dismount?.skill.elementGroup);
  const counting = dismount ? [...counted, dismount] : counted;

  const difficultyValue = counting.reduce(
    (sum, rs) => sum + difficultyToNumber(rs.skill.difficulty),
    0,
  );

  const elementGroups = computeEgBonuses(counting, dismount, config);
  const elementGroupBonus = elementGroups.reduce((sum, g) => sum + g.bonus, 0);

  const countingUids = new Set(counting.map((rs) => rs.uid));
  const connections = computeConnections(resolved, countingUids);
  const connectionValue = connections.reduce((sum, c) => sum + c.value, 0);

  const startValue = difficultyValue + elementGroupBonus + connectionValue;
  const warnings = generateGenericWarnings(resolved, counting, dismountIndex, config);

  return {
    difficultyValue: round1(difficultyValue),
    elementGroupBonus: round1(elementGroupBonus),
    connectionValue: round1(connectionValue),
    startValue: round1(startValue),
    countingUids: counting.map((rs) => rs.uid),
    droppedUids: dropped.map((rs) => rs.uid),
    dismountUid: dismount?.uid,
    elementGroups,
    connections,
    warnings,
  };
}
