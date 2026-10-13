// Per-event scoring configuration for FIG 2025–2028.
//
// All apparatus except Vault share the same fundamental D-score algorithm:
//   top 7 skills + dismount (= 8 counting), max 4 per element group, plus EG
//   bonuses and connection-value bonuses. The differences between apparatus
//   live in: which EGs are dismount-eligible, how the dismount's EG bonus is
//   computed, and which compositional warnings apply. Vault is a different
//   model entirely (pick 1–2 vaults from a value table).

import type { ElementGroup, GymEvent } from "../types";

export interface EventConfig {
  event: GymEvent;
  /** Display labels for each EG on this event. */
  egNames: Record<ElementGroup, string>;
  /**
   * Which EGs are valid for the dismount. On FX the dismount can come from
   * II/III/IV (any acrobatic group). On every other apparatus the dismount is
   * specifically EG IV ("Dismounts").
   */
  dismountEligibleGroups: ElementGroup[];
  /**
   * On non-FX apparatus, the dismount's EG bonus equals the dismount's own
   * difficulty value (Section 7.2.8). On FX, the dismount counts like any
   * other element for EG-bonus purposes (0.5 for D+, 0.3 for A/B/C, 0.5 if
   * EG I is fulfilled — though FX dismounts aren't from EG I).
   */
  dismountEgValueEqualsDifficulty: boolean;
  /** PH does not award a stick bonus (Section 7.2.9). */
  stickBonusApplies: boolean;
  /** Composition warnings specific to this apparatus. */
  customWarnings?: CustomWarningGenerator;
}

export interface CustomWarningInput {
  allResolved: { skill: import("../types").Skill; index: number }[];
  countingResolved: { skill: import("../types").Skill }[];
  dismountIndex?: number;
}

export type CustomWarningGenerator = (input: CustomWarningInput) => string[];

const fxWarnings: CustomWarningGenerator = ({ allResolved, dismountIndex }) => {
  const out: string[] = [];

  if (dismountIndex !== undefined) {
    const dismount = allResolved[dismountIndex];
    if (!dismount.skill.flags?.isMultiSalto) {
      out.push(
        "Senior FX requires a multi-salto dismount (Section 10.2.2.3). Current dismount is a single salto.",
      );
    }
  }

  const hasBalance = allResolved.some((rs) => rs.skill.flags?.isBalanceOnOneLeg);
  if (!hasBalance) {
    out.push(
      "Missing required balance element on one leg (Section 10.2.2.6.m). Neutral deduction −0.3.",
    );
  }

  const strengthCount = allResolved.filter((rs) => rs.skill.flags?.isStrengthElement).length;
  if (strengthCount > 1) {
    out.push(
      `Special repetition: ${strengthCount} strength elements present; only 1 may count for difficulty (Section 10.2.2.7.a).`,
    );
  }
  const cfrCount = allResolved.filter((rs) => rs.skill.flags?.isCircleFlairRussian).length;
  if (cfrCount > 1) {
    out.push(
      `Special repetition: ${cfrCount} circle/flair/Russian elements present; only 1 may count for difficulty (Section 10.2.2.7.b).`,
    );
  }

  return out;
};

const ringsWarnings: CustomWarningGenerator = ({ countingResolved }) => {
  const out: string[] = [];
  const hasSwingToHandstand = countingResolved.some((rs) =>
    /to handstand|swing.*hdst|uprise.*hdst/i.test(rs.skill.name),
  );
  if (!hasSwingToHandstand) {
    out.push(
      "Rings requires one swing-to-handstand (2 s. hold) element inside the 8 counting (Section 12.2.2.2).",
    );
  }
  return out;
};

export const EVENT_CONFIGS: Record<Exclude<GymEvent, "VT">, EventConfig> = {
  FX: {
    event: "FX",
    egNames: {
      I: "Non-acrobatic",
      II: "Acrobatic forward",
      III: "Acrobatic backward",
      IV: "Single salto fwd/bwd with turns",
      V: "—",
    },
    dismountEligibleGroups: ["II", "III", "IV"],
    dismountEgValueEqualsDifficulty: false,
    stickBonusApplies: true,
    customWarnings: fxWarnings,
  },
  PH: {
    event: "PH",
    egNames: {
      I: "Single leg swings & scissors",
      II: "Circles & flairs (with handstands, spindles, Russian wendeswings, flops)",
      III: "Travel type elements",
      IV: "Dismounts",
      V: "—",
    },
    dismountEligibleGroups: ["IV"],
    dismountEgValueEqualsDifficulty: true,
    stickBonusApplies: false,
  },
  SR: {
    event: "SR",
    egNames: {
      I: "Kip & swing elements (incl. swings to handstand)",
      II: "Strength & hold elements (2 s.)",
      III: "Swing to strength hold elements (2 s.)",
      IV: "Dismounts",
      V: "—",
    },
    dismountEligibleGroups: ["IV"],
    dismountEgValueEqualsDifficulty: true,
    stickBonusApplies: true,
    customWarnings: ringsWarnings,
  },
  PB: {
    event: "PB",
    egNames: {
      I: "Elements starting in upper arm position",
      II: "Elements in support or through support on 2 bars",
      III: "Long swings in hang on 1 or 2 bars / underswings",
      IV: "Dismounts",
      V: "—",
    },
    dismountEligibleGroups: ["IV"],
    dismountEgValueEqualsDifficulty: true,
    stickBonusApplies: true,
  },
  HB: {
    event: "HB",
    egNames: {
      I: "Long hang swings with & without turns",
      II: "Flight elements",
      III: "In-bar & Adler elements",
      IV: "Dismounts",
      V: "—",
    },
    dismountEligibleGroups: ["IV"],
    dismountEgValueEqualsDifficulty: true,
    stickBonusApplies: true,
  },
};
