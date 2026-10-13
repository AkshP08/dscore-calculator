// FIG 2025–2028 Floor Exercise skill catalog.
//
// Page references point at the FIG MAG 2025–2028 Code of Points PDF, where
// each skill's stick-figure diagram appears (Section 10, pages 28–38). The
// catalog covers every named element listed in the difficulty tables.
//
// Code identification numbers (e.g. "I.79") are the FIG-canonical IDs from
// the Difficulty Tables. Difficulty values reflect the column the skill
// occupies in the FIG table (A=0.1 … F=0.6 … J=1.0); for the rightmost
// column the PDF prints an explicit letter beside the skill (e.g. "G" on
// Goshima).

import type { Skill } from "../../types";
import { FIG_2025_ID } from "../constants";

const make = (
  codeIdentificationNumber: string,
  elementGroup: Skill["elementGroup"],
  name: string,
  difficulty: Skill["difficulty"],
  pageRef: number,
  extras: Partial<Pick<Skill, "eponym" | "notes" | "flags">> = {},
): Skill => ({
  id: `${FIG_2025_ID}:FX:${codeIdentificationNumber}`,
  codeIdentificationNumber,
  codeId: FIG_2025_ID,
  event: "FX",
  elementGroup,
  name,
  difficulty,
  pageRef,
  ...extras,
});

// ── EG I — Non-acrobatic elements (strength holds, balances, flairs, turns) ──
const egI: Skill[] = [
  // Row 1
  make("I.1", "I", "From hdst. lower to L-sit or straddle L-sit (2 s.)", "A", 28, {
    flags: { isStrengthElement: true },
  }),
  make("I.2", "I", "V-sit (2 s.)", "B", 28, { flags: { isStrengthElement: true } }),
  make("I.3", "I", "V-sit with legs horizontal — Manna (2 s.)", "C", 28, {
    eponym: "Manna",
    flags: { isStrengthElement: true },
  }),
  // Row 2
  make("I.7", "I", "From stand, Swiss press to handstand (2 s.)", "A", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.8", "I", "Piked or bent-arm press to handstand, legs together (2 s.)", "B", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.9", "I", "V-sit (2 s.) and press to handstand (2 s.) — also straddled finish", "C", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.10", "I", "Manna (2 s.) and press to handstand (2 s.) — also straddled finish", "D", 29, {
    flags: { isStrengthElement: true },
  }),
  // Row 3
  make("I.13", "I", "Rock to handstand from prone position (2 s.)", "A", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.14", "I", "Press from split, L-sit straddle or front support (2 s.)", "B", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.16", "I", "From Manna (2 s.), turn over (dislocation) to handstand (2 s.)", "D", 29, {
    flags: { isStrengthElement: true },
  }),
  // Row 4
  make("I.19", "I", "Handstand (2 s.)", "A", 29),
  make("I.20", "I", "Press, lower, or swing to Japanese handstand (2 s.)", "B", 29),
  make("I.21", "I", "From split press to Japanese handstand (2 s.)", "C", 29),
  // Row 5
  make("I.25", "I", "Planche, legs straddle (2 s.)", "A", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.27", "I", "Planche (2 s.) / Swallow (2 s.)", "C", 29, {
    flags: { isStrengthElement: true },
  }),
  // Row 6
  make("I.31", "I", "½ or 1/1 turn in handstand or to handstand", "B", 29),
  make("I.32", "I", "From straddled planche (2 s.), press to handstand (2 s.)", "B", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.34", "I", "From planche (2 s.), press to handstand (2 s.)", "D", 29, {
    flags: { isStrengthElement: true },
  }),
  make("I.35", "I", "From swallow (2 s.) press to Japanese handstand (2 s.)", "E", 29, {
    eponym: "Alvariño",
    flags: { isStrengthElement: true },
  }),
  // Row 7
  make("I.37", "I", "From L-sit etc., turn over backward to stand", "A", 29),
  // Row 8
  make("I.44", "I", "Endo roll to handstand (2 s.)", "B", 29),
  make("I.45", "I", "Endo roll piked to handstand legs together (2 s.)", "C", 29),
  // Row 9
  make("I.49", "I", "Forward walkover", "A", 30),
  // Row 10
  make("I.55", "I", "Cross or side split (stop required)", "A", 30),
  // Row 11 — balance on one leg requirement
  make("I.61", "I", "Any standing scale (2 s.)", "A", 30, {
    flags: { isBalanceOnOneLeg: true },
  }),
  make("I.62", "I", "Standing scale with 180° straddle, no hand hold (2 s.)", "B", 30, {
    flags: { isBalanceOnOneLeg: true },
  }),
  // Row 12
  make("I.67", "I", "Jump bwd. to front support", "A", 30),
  make("I.68", "I", "Jump bwd. with pike-stretch or 1/1 turn to front support", "B", 30, {
    eponym: "Endo",
  }),
  // Row 13
  make("I.73", "I", "Butterfly", "A", 31),
  make("I.74", "I", "Butterfly with 1/1 twist forward or backward", "B", 31, {
    eponym: "Tong Fei",
  }),
  make("I.75", "I", "Butterfly with 2/1 twist", "C", 31),
  // Row 14
  make("I.79", "I", "1 circle or flair", "A", 31, {
    flags: { isCircleFlairRussian: true },
  }),
  make("I.80", "I", "Circles or flair to handstand", "B", 31, {
    flags: { isCircleFlairRussian: true },
  }),
  make("I.81", "I", "Flair or circle to hdst., continue to flair or circle", "C", 31, {
    eponym: "Gogoladze",
    flags: { isCircleFlairRussian: true },
  }),
  make("I.82", "I", "Flair hopping with 360° t. bwd. through hdst. back to flair (2 hops)", "D", 31, {
    flags: { isCircleFlairRussian: true },
  }),
  // Row 15
  make("I.86", "I", "Lower from handstand to flair or circle", "B", 31, {
    flags: { isCircleFlairRussian: true },
  }),
  // Row 16
  make("I.91", "I", "Flair with ½ spindle", "A", 31, {
    flags: { isCircleFlairRussian: true },
  }),
  make("I.92", "I", "Flair with 1/1 spindle (in 2 circles)", "B", 31, {
    flags: { isCircleFlairRussian: true },
  }),
  make("I.93", "I", "Flair with >270° spindle (in 2 circles) directly to handstand", "C", 31, {
    flags: { isCircleFlairRussian: true },
  }),
  // Row 17
  make("I.98", "I", "Flair with ½ spindle to handstand", "B", 32, {
    flags: { isCircleFlairRussian: true },
  }),
  make("I.100", "I", "Flair with >270° spindle to handstand, continue to circle or flair", "D", 32, {
    flags: { isCircleFlairRussian: true },
  }),
  // Row 18
  make("I.103", "I", "Russian wendeswing with 360° or 540°", "A", 32, {
    flags: { isCircleFlairRussian: true },
  }),
  make("I.104", "I", "Russian wendeswing with 720° or 900°", "B", 32, {
    flags: { isCircleFlairRussian: true },
  }),
  make("I.105", "I", "Russian wendeswing with 1080° or more", "C", 32, {
    eponym: "Fedorchenko",
    flags: { isCircleFlairRussian: true },
  }),
  // Row 19
  make("I.109", "I", "Roll bwd. through hdst. with ½ turn", "A", 32),
  make("I.110", "I", "Roll bwd. with hop 1/1 turn through hdst.", "B", 32),
];

// ── EG II — Acrobatic elements forward ───────────────────────────────────────
const egII: Skill[] = [
  make("II.1", "II", "Forward handspring or flyspring", "A", 33, {
    flags: { isLinkingSkill: true },
  }),
  make("II.4", "II", "Handspring + salto fwd. tucked", "D", 33, { eponym: "Morandi" }),
  make("II.7", "II", "Dive roll", "A", 33, { flags: { isLinkingSkill: true } }),
  make("II.13", "II", "Salto fwd. tucked or piked, also with ½ turn", "C", 33),
  make("II.14", "II", "Salto fwd. straight, also with ½ turn", "D", 33),
  make("II.16", "II", "Double salto fwd. tucked, also with ½ turn", "D", 33, {
    flags: { isMultiSalto: true },
  }),
  make("II.17", "II", "Double salto fwd. piked, also with ½ turn", "E", 33, {
    flags: { isMultiSalto: true },
  }),
  make("II.36", "II", "Double salto fwd. tucked with 1/1 turn", "F", 34, {
    flags: { isMultiSalto: true },
  }),
  make("II.38", "II", "Salto fwd. t. or p. to front support", "B", 34),
  make("II.42", "II", "Double salto fwd. tucked with 3/2 turn", "F", 34, {
    eponym: "Zapata",
    flags: { isMultiSalto: true },
  }),
  make("II.46", "II", "Jump fwd. with ½ turn to dbl. salto bwd. tucked", "E", 34, {
    eponym: "Deferr",
    flags: { isMultiSalto: true, isCounterSalto: true },
  }),
  make("II.48", "II", "Double salto fwd. piked or straight with 3/2 turn", "G", 34, {
    eponym: "Zapata 2",
    flags: { isMultiSalto: true },
  }),
];

// ── EG III — Acrobatic elements backward ─────────────────────────────────────
const egIII: Skill[] = [
  make("III.1", "III", "Salto bwd. tucked or piked", "A", 35),
  make("III.2", "III", "Salto bwd. straight or Tempo salto bwd.", "B", 35, {
    flags: { isLinkingSkill: true },
  }),
  make("III.3", "III", "Double salto bwd. tucked", "C", 35, {
    flags: { isMultiSalto: true },
  }),
  make("III.4", "III", "Salto bwd. with 1/1 t. and salto bwd.", "D", 35, {
    eponym: "Tsukahara",
    flags: { isMultiSalto: true },
  }),
  make("III.4b", "III", "Arabian jump bwd. to double salto fwd. tucked (also w/ ½ t.)", "D", 35, {
    flags: { isMultiSalto: true, isCounterSalto: true },
    notes: "Same FIG cell as III.4 (Tsukahara) — Arabian-entry variant.",
  }),
  make("III.5", "III", "Double salto bwd. tucked with 2/1 or 3/2 turn", "E", 35, {
    flags: { isMultiSalto: true },
  }),
  make("III.5b", "III", "Salto bwd. straight 3/2 turn → salto fwd. tucked", "E", 35, {
    flags: { isMultiSalto: true, isCounterSalto: true },
  }),
  make("III.6", "III", "Double salto bwd. tucked with 3/1 turn", "G", 35, {
    eponym: "Ri Jong Song",
    flags: { isMultiSalto: true },
  }),
  make("III.6b", "III", "Arabian to double salto fwd. tucked with 3/2 turn", "G", 35, {
    eponym: "Korosteljev",
    flags: { isMultiSalto: true, isCounterSalto: true },
  }),
  make("III.7", "III", "Salto bwd. tucked/piked with ½ turn or Arabian", "B", 35),
  make("III.8", "III", "Salto bwd. straight with ½ turn", "C", 35),
  make("III.11", "III", "Arabian jump bwd. to double salto fwd. piked (also w/ ½ t.)", "E", 35, {
    flags: { isMultiSalto: true, isCounterSalto: true },
  }),
  make("III.12", "III", "Double salto bwd. tucked with 5/2 turn", "F", 35, {
    flags: { isMultiSalto: true },
  }),
  make("III.13", "III", "Back handspring", "A", 35, {
    flags: { isLinkingSkill: true },
  }),
  make("III.16", "III", "Double salto bwd. piked", "D", 35, {
    flags: { isMultiSalto: true },
  }),
  make("III.18", "III", "Triple salto bwd. tucked", "I", 35, {
    eponym: "Liukin",
    flags: { isMultiSalto: true },
  }),
  make("III.24", "III", "Triple salto bwd. piked", "J", 35, {
    eponym: "Nagornyy",
    flags: { isMultiSalto: true },
  }),
  make("III.29", "III", "Double salto bwd. straddled with 1/1 turn", "E", 36, {
    eponym: "Lou Yun",
    flags: { isMultiSalto: true },
  }),
  make("III.30", "III", "Double salto bwd. straight with 5/2 turn", "H", 36, {
    flags: { isMultiSalto: true },
  }),
  make("III.31", "III", "Jump bwd. with ½ turn to roll forward", "A", 36),
  make("III.35", "III", "Salto bwd. straight with 1/1 t. → salto bwd. piked", "E", 36, {
    flags: { isMultiSalto: true },
  }),
  make("III.36", "III", "Salto bwd. straight with 2/1 t. → salto bwd. piked", "F", 36, {
    eponym: "Kolyvanov",
    flags: { isMultiSalto: true },
  }),
  make("III.41", "III", "Double salto bwd. straight (or with ½ turn)", "E", 36, {
    flags: { isMultiSalto: true },
  }),
  make("III.41b", "III", "Arabian jump bwd. to dbl. salto fwd. straight", "E", 36, {
    flags: { isMultiSalto: true, isCounterSalto: true },
  }),
  make("III.42", "III", "Double salto bwd. straight with 3/2 turn", "G", 36, {
    eponym: "Tamayo",
    flags: { isMultiSalto: true },
  }),
  make("III.42b", "III", "Arabian to dbl. salto fwd. straight with 1/1 turn", "G", 36, {
    eponym: "Hypolito",
    flags: { isMultiSalto: true, isCounterSalto: true },
  }),
  make("III.48", "III", "Double salto bwd. straight with 1/1 turn", "F", 36, {
    flags: { isMultiSalto: true },
  }),
  make("III.48b", "III", "Arabian to dbl. salto fwd. straight with ½ turn", "F", 36, {
    eponym: "Penev",
    flags: { isMultiSalto: true, isCounterSalto: true },
  }),
  make("III.54", "III", "Double salto bwd. straight with 2/1 turn", "G", 37, {
    flags: { isMultiSalto: true },
  }),
  make("III.60", "III", "Double salto bwd. tucked with 7/2 turn", "H", 37, {
    eponym: "Minami",
    flags: { isMultiSalto: true },
  }),
  make("III.66", "III", "Double salto bwd. straight with 3/1 turn", "I", 37, {
    eponym: "Shirai 3",
    flags: { isMultiSalto: true },
  }),
  make("III.72", "III", "Double salto bwd. straight with 7/2 turn", "J", 37, {
    eponym: "Jarman",
    flags: { isMultiSalto: true },
  }),
];

// ── EG IV — Single salto fwd/bwd with 1+ turns ──────────────────────────────
const egIV: Skill[] = [
  make("IV.2", "IV", "Salto fwd. tucked with 1/1 t., also with 3/2 t.", "B", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.3", "IV", "Salto fwd. straight with 1/1 t., also with 3/2 t.", "C", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.4", "IV", "Salto fwd. straight with 2/1 turn", "D", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.5", "IV", "Salto fwd. straight with 5/2 turn", "E", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.6", "IV", "Salto fwd. straight with 3/1 turn", "F", 38, {
    eponym: "Shirai 2",
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.8", "IV", "Salto bwd. straight with 1/1 turn", "B", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.9", "IV", "Salto bwd. straight with 3/2 or 2/1 turn", "C", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.10", "IV", "Salto bwd. straight with 5/2 turn", "D", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.11", "IV", "Salto bwd. straight with 7/2 turn", "E", 38, {
    eponym: "González",
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.12", "IV", "Salto fwd. straight with 7/2 turn", "G", 38, {
    eponym: "Goshima",
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.14", "IV", "Salto bwd. tucked with 3/2 turn", "B", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.22", "IV", "Salto bwd. straight with 3/1 turn", "D", 38, {
    flags: { isSingleSaltoWithTwist: true },
  }),
  make("IV.24", "IV", "Salto bwd. straight with 4/1 turn", "F", 38, {
    eponym: "Shirai / Nguyen",
    flags: { isSingleSaltoWithTwist: true },
  }),
];

export const floorSkills: Skill[] = [...egI, ...egII, ...egIII, ...egIV];
