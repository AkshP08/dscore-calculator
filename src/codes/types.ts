// Shared types across all code-of-points implementations.

export type Difficulty = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

export const DIFFICULTY_VALUES: Record<Difficulty, number> = {
  A: 0.1,
  B: 0.2,
  C: 0.3,
  D: 0.4,
  E: 0.5,
  F: 0.6,
  G: 0.7,
  H: 0.8,
  I: 0.9,
  J: 1.0,
};

export const ALL_DIFFICULTIES: Difficulty[] = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
];

export type GymEvent = "FX" | "PH" | "SR" | "VT" | "PB" | "HB";

export const EVENT_NAMES: Record<GymEvent, string> = {
  FX: "Floor Exercise",
  PH: "Pommel Horse",
  SR: "Still Rings",
  VT: "Vault",
  PB: "Parallel Bars",
  HB: "Horizontal Bar",
};

export type ElementGroup = "I" | "II" | "III" | "IV" | "V";

/** Element groups used by every apparatus except Vault. */
export const ALL_ELEMENT_GROUPS: ElementGroup[] = ["I", "II", "III", "IV"];

/** Vault has 5 vault groups instead of 4 element groups. */
export const ALL_VAULT_GROUPS: ElementGroup[] = ["I", "II", "III", "IV", "V"];

// FX-specific flags that affect scoring. Other events may add their own flag
// sets in their own modules — kept here as optional fields to keep the
// `Skill` shape uniform across codes.
export interface SkillFlags {
  /** Salto with two or more rotations — required as the dismount for senior FX. */
  isMultiSalto?: boolean;
  /** Element 1.61 / 1.62 style: counts toward the FX "balance on one leg" requirement. */
  isBalanceOnOneLeg?: boolean;
  /** Strength element under EG I (FX special-repetition rule). */
  isStrengthElement?: boolean;
  /** Circle / flair / Russian wendeswing on FX (special-repetition rule). */
  isCircleFlairRussian?: boolean;
  /** Counter-salto — excluded from FX connection-value bonuses. */
  isCounterSalto?: boolean;
  /** Single salto with twist (FX EG IV) — excluded from CV when directly connected to another. */
  isSingleSaltoWithTwist?: boolean;
  /** A handspring or other linking acro skill that can be used in connections. */
  isLinkingSkill?: boolean;
}

export interface Skill {
  /** Globally unique id: `${codeId}:${event}:${codeIdentificationNumber}`. */
  id: string;
  /** Code-of-points identifier the FIG document uses, e.g. "I.79", "II.13". */
  codeIdentificationNumber: string;
  codeId: string;
  event: GymEvent;
  elementGroup: ElementGroup;
  name: string;
  /** Common eponym, e.g. "Tsukahara". */
  eponym?: string;
  difficulty: Difficulty;
  /**
   * Explicit numeric value, used only for Vault where the FIG value table
   * publishes values directly (e.g. 2.4, 4.8) rather than via the A–J scale.
   * When present, this is the authoritative value for scoring; the
   * `difficulty` letter is still used for UI grouping.
   */
  numericValue?: number;
  /** PDF page number in the FIG 2025–2028 Code of Points where the skill diagram appears. */
  pageRef?: number;
  /** Path to a still-frame diagram if available (e.g. cropped from the CoP PDF). */
  imageUrl?: string;
  /** Free-form description / coaching cue. */
  notes?: string;
  flags?: SkillFlags;
}

export interface RoutineSkill {
  /** Lightweight client-side id for ordering / drag-handle use. */
  uid: string;
  skillId: string;
  /** "Connected to previous skill" — drives connection-value computation. */
  connectedToPrevious: boolean;
}

export interface Routine {
  id: string;
  name: string;
  codeId: string;
  event: GymEvent;
  skills: RoutineSkill[];
  /** Free-form notes (training cues, video links, etc.). */
  notes?: string;
  updatedAt: number;
}

export interface ElementGroupBonus {
  elementGroup: ElementGroup;
  bonus: number;
  /** Skill id that fulfilled the group (highest-value counting skill in this EG). */
  fulfilledBySkillId?: string;
}

export interface ConnectionBonus {
  fromSkillId: string;
  toSkillId: string;
  /** Bonus value awarded (0, 0.1, or 0.2). */
  value: number;
  /** Empty array means CV was awarded; otherwise a list of reasons the pair was excluded. */
  reasons: string[];
}

export interface ScoreBreakdown {
  /** Sum of difficulty values of the 8 counting skills (top 7 + dismount). */
  difficultyValue: number;
  /** Sum of element-group bonuses (0.3 or 0.5 per fulfilled group). */
  elementGroupBonus: number;
  /** Sum of connection-value bonuses. */
  connectionValue: number;
  /** Total start value (= D + EG + CV). */
  startValue: number;
  /** Routine-skill uids that counted toward D (in order). */
  countingUids: string[];
  /** Routine-skill uids that were dropped (excess past top-7 or rule-excluded). */
  droppedUids: string[];
  /** Dismount's routine-skill uid, if identifiable. */
  dismountUid?: string;
  elementGroups: ElementGroupBonus[];
  connections: ConnectionBonus[];
  /** Compositional warnings (missing required elements, etc.). */
  warnings: string[];
}

/**
 * One element of a compulsory routine. Compulsories prescribe the routine,
 * so the gymnast doesn't compose anything — they perform fixed parts in
 * order, with optional Specified Bonus (SB) and Value Increase (V) parts
 * that earn extra credit if achieved cleanly.
 */
export interface CompulsoryPart {
  /** "1", "2", … for required parts; "SB1", "SB2", … for specified bonuses; "V1", "V2", … for value increases. */
  number: string;
  kind: "element" | "specified-bonus" | "value-increase";
  description: string;
  /** Bonus added if cleanly performed (SB usually +0.5, V usually +0.1). */
  bonusValue?: number;
  /** Performance criteria coaching cue. */
  criteria?: string;
  /** Notes about deductions, restrictions, or sequencing requirements. */
  notes?: string;
  /**
   * Bonus parts that share an `exclusiveGroup` (within one routine) are
   * mutually exclusive: the source manual credits only the single
   * highest-value member, even if several are performed. Used for the
   * "only one of SB 3A / 3B …" clauses in the MDP compulsory routines.
   */
  exclusiveGroup?: string;
  /** Junior Elite Tech Sequences only: this box contains a Major Element (worth 2.0; missing it is −1.0). */
  isMajor?: boolean;
  /** Junior Elite Tech Sequences only: comma-separated list of technical reference items being practised. */
  technicalReference?: string;
}

export interface CompulsoryRoutine {
  level: number;
  event: GymEvent;
  /** Base SV before any bonuses or deductions (usually 10.0). */
  baseStartValue: number;
  parts: CompulsoryPart[];
  /** General notes about the routine (apparatus setup, special rules). */
  routineNotes?: string;
  /** Citation / version of the source these parts were transcribed from. */
  sourceNote: string;
  /** JE Tech Sequence only: global technical emphasis deductions ("Specific Technical Emphasis Elements"). */
  technicalEmphasis?: string[];
  /** Display label override: "Tech Sequence" vs "Compulsory Routine". */
  routineType?: "compulsory" | "tech-sequence";
}

export interface CodeOfPoints {
  id: string;
  name: string;
  /** Short tag e.g. "FIG 2025–2028". */
  shortName: string;
  enabled: boolean;
  /** Whether this code uses fixed compulsory routines (true) or lets the user compose (false). */
  isCompulsory?: boolean;
  /** Events implemented under this code. Events not in this list show as "coming soon". */
  supportedEvents: GymEvent[];
  getSkillCatalog(event: GymEvent): Skill[];
  calculateStartValue(routine: Routine, allSkills: Skill[]): ScoreBreakdown;
  /** Compulsory-only: returns the fixed routine for the given event. */
  getCompulsoryRoutine?(event: GymEvent): CompulsoryRoutine | undefined;
}
