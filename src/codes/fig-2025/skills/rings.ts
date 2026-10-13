// FIG 2025–2028 Still Rings skill catalog.
// Reference: PDF Section 12 (pages 59–79).

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
  id: `${FIG_2025_ID}:SR:${codeIdentificationNumber}`,
  codeIdentificationNumber,
  codeId: FIG_2025_ID,
  event: "SR",
  elementGroup,
  name,
  difficulty,
  pageRef,
  ...extras,
});

// ── EG I — Kip and swing elements (incl. swings to handstand) ────────────────
const egI: Skill[] = [
  make("I.1", "I", "Uprise fwd. to support", "A", 63),
  make("I.7", "I", "From support scale/swallow/swing bwd. in support, roll fwd. to bwd. swing in hang", "A", 63),
  make("I.8", "I", "Uprise fwd. and counter salto fwd. to bwd. swing in hang", "B", 63, {
    eponym: "Chechi",
  }),
  make("I.19", "I", "From hang, felge upward to support", "A", 63),
  make("I.20", "I", "Swing fwd. through handstand", "B", 63),
  make("I.21", "I", "Tucked double salto bwd. to hang", "C", 63, { eponym: "Guczoghy" }),
  make("I.22", "I", "Piked or straight double salto bwd. to hang", "D", 63),
  make("I.25", "I", "Dislocate bwd. piked or straight", "A", 64),
  make("I.31", "I", "Uprise bwd. to support", "A", 64),
  make("I.32", "I", "Uprise bwd. straight through handstand", "B", 64),
  make("I.37", "I", "Inlocate piked or straight", "A", 64),
  make("I.38", "I", "Backward swing to salto fwd. piked to support", "B", 64),
  make("I.39", "I", "Honma straight", "C", 64, { eponym: "Honma" }),
  make("I.43", "I", "Slow inlocate from hang", "A", 64),
  make("I.44", "I", "Double salto fwd. tucked to hang", "B", 64, { eponym: "Yamawaki" }),
  make("I.45", "I", "Double salto fwd. piked or straight to hang", "C", 64, { eponym: "Jonasson" }),
  make("I.49", "I", "Kip to support", "A", 65),
  make("I.55", "I", "Back kip with bent arms to support", "A", 65),
  make("I.56", "I", "Back kip to support", "B", 65),
  make("I.61", "I", "Fwd. swing to swing bwd. in hang", "A", 65),
  make("I.63", "I", "Bwd. swing, salto piked to support", "C", 65),
  make("I.67", "I", "From support or cross, felge bwd. piked or straight with bent arms to support", "A", 65),
  make("I.74", "I", "Back kip or roll bwd. straight with bent arms to handstand (2 s.)", "B", 66),
  make("I.75", "I", "Swing fwd. to handstand or giant swing bwd. to handstand (2 s.)", "C", 66),
  make("I.81", "I", "Uprise bwd. to handstand or giant swing fwd. to handstand (2 s.)", "C", 66),
  make("I.86", "I", "From support swing bwd. to handstand (2 s.)", "B", 66),
  make("I.87", "I", "Honma and swing bwd. to handstand (2 s.)", "C", 66),
  make("I.88", "I", "Honma straight and swing bwd. to handstand (2 s.)", "D", 66),
];

// ── EG II — Strength & hold elements (2 s.) ──────────────────────────────────
const egII: Skill[] = [
  // Basic holds
  make("II.1", "II", "L-sit (2 s.) or straddled L-sit (2 s.)", "A", 67, {
    flags: { isStrengthElement: true },
  }),
  make("II.2", "II", "V-sit (2 s.)", "B", 67, { flags: { isStrengthElement: true } }),
  make("II.4", "II", "Inverted cross (2 s.)", "D", 67, { flags: { isStrengthElement: true } }),
  make("II.7", "II", "Hanging scale rearways (back lever) (2 s.)", "B", 67, {
    flags: { isStrengthElement: true },
  }),
  make("II.9", "II", "Support scale (planche) (2 s.)", "C", 67, {
    flags: { isStrengthElement: true },
  }),
  make("II.10", "II", "Support scale at ring height (Swallow / Maltese cross) (2 s.)", "D", 67, {
    eponym: "Hirondelle",
    flags: { isStrengthElement: true },
  }),
  make("II.11", "II", "Inverted swallow (2 s.)", "E", 67, { flags: { isStrengthElement: true } }),
  make("II.13", "II", "Hanging scale frontways (front lever) (2 s.)", "C", 67, {
    flags: { isStrengthElement: true },
  }),
  make("II.15", "II", "Any cross (2 s.) or V cross (2 s.)", "C", 67, {
    flags: { isStrengthElement: true },
  }),
  make("II.19", "II", "Support scale straddled (2 s.)", "A", 67, {
    flags: { isStrengthElement: true },
  }),
  make("II.22", "II", "V cross, press to V-sit (2 s.)", "D", 67, {
    eponym: "Tsukahara 3",
    flags: { isStrengthElement: true },
  }),
  make("II.23", "II", "Vertical pull up with straight arms to V-cross (2 s.)", "E", 67, {
    eponym: "Colak",
    flags: { isStrengthElement: true },
  }),
  // Presses
  make("II.25", "II", "Press to hdst. with bent body and bent arms (2 s.)", "A", 68, {
    flags: { isStrengthElement: true },
  }),
  make("II.26", "II", "Press to hdst. with straight body and bent arms, etc. (2 s.) — also straddled", "B", 68, {
    flags: { isStrengthElement: true },
  }),
  make("II.27", "II", "Press to hdst. with straight body and arms from support or support scale (2 s.)", "C", 68, {
    flags: { isStrengthElement: true },
  }),
  make("II.28", "II", "Press to hdst. with straight body and arms from swallow (2 s.)", "D", 68, {
    flags: { isStrengthElement: true },
  }),
  // Slow rolls
  make("II.31", "II", "Slow roll fwd. piked with bent arms, to support", "A", 68),
  make("II.32", "II", "Slow roll fwd. straight with bent arms, to support", "B", 68),
  make("II.38", "II", "Slow roll bwd. slowly and straight body to L-sit (2 s.)", "B", 68, {
    flags: { isStrengthElement: true },
  }),
  make("II.39", "II", "Slow roll fwd. straight to cross or L-cross (2 s.)", "C", 68, {
    flags: { isStrengthElement: true },
  }),
  make("II.50", "II", "Vertical pull up with bent arms to hanging scale rearways (2 s.)", "B", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.51", "II", "Vertical pull up with straight arms to hanging scale rearways (2 s.)", "C", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.52", "II", "Slow roll bwd. with straight body to cross / L-cross / V-cross (2 s.)", "C", 69, {
    eponym: "Azarian",
    flags: { isStrengthElement: true },
  }),
  // Crosses & lifts
  make("II.56", "II", "From front cross / L-cross, move fwd. to back lever (2 s.)", "B", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.57", "II", "Vertical pull up to L-sit (2 s.)", "C", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.58", "II", "From or through hanging scale rearways, pull to cross / L-cross / V-cross (2 s.)", "D", 69, {
    eponym: "Nakayama",
    flags: { isStrengthElement: true },
  }),
  make("II.60", "II", "Through hanging scale rearways, pull with straight body through cross to inverted swallow (2 s.)", "F", 69, {
    eponym: "Zahran / NG Kiu Chung",
    flags: { isStrengthElement: true },
  }),
  make("II.62", "II", "From handstand, lower horizontally to back lever (2 s.)", "B", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.63", "II", "From support or cross, lower slowly to hang, pull with str. arms to cross (2 s.)", "C", 69, {
    eponym: "Li Xiaoshuang",
    flags: { isStrengthElement: true },
  }),
  make("II.64", "II", "Vertical pull up to cross or L-cross (2 s.)", "D", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.65", "II", "From planche, lower to hanging scale rearways, press to swallow (2 s.)", "E", 69, {
    eponym: "Van Gelder",
    flags: { isStrengthElement: true },
  }),
  make("II.66", "II", "From hang, vertical pull up slowly through cross to inverted swallow (2 s.)", "G", 69, {
    eponym: "Tulloch 2",
    flags: { isStrengthElement: true },
  }),
  make("II.68", "II", "From handstand, lower slowly through inverted cross to inverted hang", "B", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.70", "II", "From swallow, press to support scale (2 s.)", "D", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.71", "II", "From swallow, lower slowly to hanging scale rearways, press to swallow (2 s.)", "E", 69, {
    flags: { isStrengthElement: true },
  }),
  make("II.72", "II", "From hanging scale rearways press to swallow (also to support scale) (2 s.)", "F", 69, {
    eponym: "Zanetti",
    flags: { isStrengthElement: true },
  }),
  make("II.75", "II", "From cross or L-cross, press to L-sit (2 s.)", "C", 70, {
    flags: { isStrengthElement: true },
  }),
  make("II.77", "II", "From L-cross, press with bent body to inverted cross (2 s.)", "E", 70, {
    flags: { isStrengthElement: true },
  }),
  make("II.78", "II", "From cross, press with straight body to inverted cross (2 s.)", "F", 70, {
    flags: { isStrengthElement: true },
  }),
  make("II.84", "II", "From swallow, press to inverted cross (2 s.)", "F", 70, {
    flags: { isStrengthElement: true },
  }),
  make("II.88", "II", "From cross, press to planche without first going to support (2 s.)", "D", 70, {
    flags: { isStrengthElement: true },
  }),
  make("II.89", "II", "From cross, press to swallow (2 s.)", "E", 70, {
    flags: { isStrengthElement: true },
  }),
  make("II.90", "II", "Through hang rearways press and straight body to inverted cross (2 s.)", "G", 70, {
    eponym: "Carmona",
    flags: { isStrengthElement: true },
  }),
  make("II.94", "II", "From inverted cross lower to inverted hang and felge bwd. slowly to cross (2 s.)", "D", 70, {
    eponym: "Vorobiov / Zou",
    flags: { isStrengthElement: true },
  }),
  make("II.95", "II", "From inverted cross lower to inverted hang and felge bwd. slowly to swallow / support scale (2 s.)", "E", 70, {
    eponym: "Jotchev / Zou 2",
    flags: { isStrengthElement: true },
  }),
  make("II.101", "II", "Roll bwd. slowly with straight arms and body to free support scale (2 s.)", "E", 71, {
    eponym: "Yan Mijayoung",
    flags: { isStrengthElement: true },
  }),
  make("II.107", "II", "Slow roll bwd. with straight body to swallow (2 s.)", "E", 71, {
    flags: { isStrengthElement: true },
  }),
  make("II.108", "II", "Slow roll bwd. straight to inverted cross through swallow", "F", 71, {
    eponym: "Simonov",
    flags: { isStrengthElement: true },
  }),
  make("II.118", "II", "Slow roll fwd. straight through cross, press to support scale without support (2 s.)", "D", 71, {
    eponym: "Ng Kiu Chung 2",
    flags: { isStrengthElement: true },
  }),
  make("II.119", "II", "Slow roll fwd. straight through cross to inverted cross (2 s.)", "E", 71, {
    eponym: "Wynn",
    flags: { isStrengthElement: true },
  }),
  make("II.120", "II", "Azarian to inverted swallow (2 s.)", "F", 71, {
    eponym: "Tulloch",
    flags: { isStrengthElement: true },
  }),
  make("II.124", "II", "Slow roll fwd. straight to cross or L-cross (2 s.), also from inverted hang", "D", 72, {
    eponym: "Davtyan",
    flags: { isStrengthElement: true },
  }),
  make("II.125", "II", "Slow roll fwd. straight through cross to swallow (2 s.)", "E", 72, {
    eponym: "Pham 2",
    flags: { isStrengthElement: true },
  }),
  make("II.130", "II", "From hang vertical pull up to support and press to hdst. with straight body and arms", "D", 72, {
    eponym: "Cingolani",
    flags: { isStrengthElement: true },
  }),
  make("II.132", "II", "From hang vertical pull up to swallow (2 s.)", "E", 72, {
    eponym: "Balandin 1",
    flags: { isStrengthElement: true },
  }),
  make("II.137", "II", "From hang vertical pull up through swallow to support scale (2 s.)", "E", 72, {
    eponym: "Balandin 3",
    flags: { isStrengthElement: true },
  }),
  make("II.138", "II", "From hang vertical pull up to inverted cross (2 s.)", "F", 72, {
    eponym: "Balandin 2",
    flags: { isStrengthElement: true },
  }),
];

// ── EG III — Swing to strength hold elements (2 s.) ─────────────────────────
const egIII: Skill[] = [
  make("III.2", "III", "Uprise fwd. to L-sit (2 s.)", "B", 73),
  make("III.3", "III", "Uprise fwd. to V-sit (2 s.)", "C", 73),
  make("III.4", "III", "Front uprise fwd. to V-cross (2 s.)", "D", 73),
  make("III.8", "III", "Kip to L-sit (2 s.)", "B", 73),
  make("III.9", "III", "Kip to V-sit (2 s.)", "C", 73),
  make("III.14", "III", "Honma to L-sit (2 s.)", "B", 73, { eponym: "Gracia" }),
  make("III.15", "III", "Honma to V-sit (2 s.)", "C", 73),
  make("III.16", "III", "Honma to cross / L-cross (2 s.)", "D", 73),
  make("III.17", "III", "Honma to V-cross (2 s.)", "E", 73, { eponym: "Tanaka" }),
  make("III.22", "III", "Bwd. swing, salto fwd. piked to cross or L-cross (2 s.)", "D", 73),
  make("III.27", "III", "Uprise fwd. to cross or L-cross (2 s.)", "C", 74),
  make("III.33", "III", "Uprise bwd. to cross or L-cross (2 s.)", "C", 74),
  make("III.39", "III", "Kip to cross or L-cross (2 s.)", "C", 74),
  make("III.40", "III", "Kip to V-cross (2 s.)", "D", 74, { eponym: "Molinari" }),
  make("III.42", "III", "Kip to inverted swallow (2 s.)", "F", 74),
  make("III.45", "III", "Back kip to cross or L-cross (2 s.)", "C", 74),
  make("III.46", "III", "Back kip to support scale (2 s.)", "D", 74),
  make("III.47", "III", "Back kip to swallow (2 s.)", "E", 74),
  make("III.50", "III", "Felge upward to support straddled above the rings (2 s.)", "B", 75, {
    eponym: "Deltchev",
  }),
  make("III.53", "III", "Back kip to inverted cross (2 s.)", "C", 75),
  make("III.56", "III", "Felge upward to support scale straddled (2 s.)", "B", 75),
  make("III.57", "III", "Felge upward to cross or L-cross (2 s.)", "C", 75),
  make("III.58", "III", "Felge upward to support scale (2 s.)", "D", 75),
  make("III.59", "III", "Felge upward to swallow (2 s.)", "E", 75),
  make("III.60", "III", "Uprise forward to inverted swallow (2 s.)", "F", 75, {
    eponym: "Rodrigues",
  }),
  make("III.65", "III", "Felge upward to inverted cross (2 s.)", "E", 75),
  make("III.68", "III", "Uprise bwd. to support scale straddled (2 s.)", "B", 75),
  make("III.70", "III", "Uprise bwd. to support scale (2 s.)", "D", 75),
  make("III.71", "III", "Uprise bwd. to swallow (2 s.)", "E", 75),
  make("III.77", "III", "Uprise bwd. to inverted cross (2 s.)", "E", 76),
  make("III.82", "III", "Felge bwd. straight to free support scale (2 s.)", "D", 76),
];

// ── EG IV — Dismounts ────────────────────────────────────────────────────────
const egIV: Skill[] = [
  make("IV.1", "IV", "Salto fwd. piked or straight, also with ½ turn", "A", 77),
  make("IV.2", "IV", "Salto fwd. piked or straight with 1/1 turn", "B", 77),
  make("IV.3", "IV", "Salto fwd. piked or straight with 3/2 turn", "C", 77),
  make("IV.4", "IV", "Salto fwd. piked or straight with 2/1 turn", "D", 77),
  make("IV.9", "IV", "Double salto fwd. tucked or tucked with ½ turn", "C", 77),
  make("IV.10", "IV", "Double salto fwd. tucked with 3/2 turn (also 1/1 t.)", "D", 77, {
    eponym: "Fischer",
  }),
  make("IV.16", "IV", "Double salto fwd. piked or piked with ½ turn", "D", 77, {
    eponym: "Balabanov",
  }),
  make("IV.17", "IV", "Double salto fwd. piked with 3/2 turn (also 1/1 t.)", "E", 77),
  make("IV.18", "IV", "Double salto fwd. piked with ½ turn", "F", 77, {
    eponym: "Dalaloyan",
  }),
  make("IV.25", "IV", "Salto bwd. piked or straight, also with ½ turn", "A", 78),
  make("IV.26", "IV", "Salto bwd. straight with 1/1 turn", "B", 78),
  make("IV.27", "IV", "Salto bwd. straight with 2/1 or 3/2 turn", "C", 78),
  make("IV.29", "IV", "Salto bwd. straight with 3/1 turn", "E", 78, { eponym: "Kan" }),
  make("IV.32", "IV", "Double salto bwd. tucked or piked", "B", 78),
  make("IV.33", "IV", "Double salto bwd. straight", "C", 78),
  make("IV.36", "IV", "Triple salto bwd. tucked", "G", 78),
  make("IV.42", "IV", "Triple salto bwd. piked", "I", 78, { eponym: "Whittenburg" }),
  make("IV.45", "IV", "Double salto bwd. tucked with ½ or 1/1 turn", "C", 78),
  make("IV.47", "IV", "Double salto bwd. tucked with 2/1 turn", "D", 78),
  make("IV.48", "IV", "Double salto bwd. tucked with 5/2 turn", "E", 78, {
    eponym: "Tuuha",
  }),
  make("IV.51", "IV", "Salto bwd. straight with 1/1 t. and salto t.", "C", 79),
  make("IV.52", "IV", "Double salto bwd. straight with ½ or 1/1 turn", "D", 79),
  make("IV.54", "IV", "Double salto bwd. straight with 3/2 or 2/1 turn", "E", 79),
  make("IV.60", "IV", "Double salto bwd. tucked with 3/1 turn", "G", 79),
];

export const ringsSkills: Skill[] = [...egI, ...egII, ...egIII, ...egIV];
