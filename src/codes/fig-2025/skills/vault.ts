// FIG 2025–2028 Vault skill catalog.
// Reference: PDF Section 13 (pages 80–91). The Vault Value Table is on page 84.
//
// Vault skills carry their authoritative decimal `numericValue` directly from
// the value table. The `difficulty` letter is set to whatever letter the value
// rounds to on the A–J scale, used only for visual grouping in the picker.

import type { Difficulty, Skill } from "../../types";
import { FIG_2025_ID } from "../constants";

function valueToLetter(v: number): Difficulty {
  if (v >= 1.0) return "J";
  if (v >= 0.9) return "I";
  if (v >= 0.8) return "H";
  if (v >= 0.7) return "G";
  if (v >= 0.6) return "F";
  if (v >= 0.5) return "E";
  if (v >= 0.4) return "D";
  if (v >= 0.3) return "C";
  if (v >= 0.2) return "B";
  return "A";
}

const make = (
  codeIdentificationNumber: string,
  elementGroup: Skill["elementGroup"],
  name: string,
  numericValue: number,
  pageRef: number,
  extras: Partial<Pick<Skill, "eponym" | "notes">> = {},
): Skill => ({
  id: `${FIG_2025_ID}:VT:${codeIdentificationNumber}`,
  codeIdentificationNumber,
  codeId: FIG_2025_ID,
  event: "VT",
  elementGroup,
  name,
  difficulty: valueToLetter(numericValue),
  numericValue,
  pageRef,
  ...extras,
});

// ── Group I — Single salto vaults with complex twists ────────────────────────
const groupI: Skill[] = [
  make("101", "I", "Hdspr. + salto fwd. tucked with ½ turn (Cuervo t.)", 2.4, 85),
  make("102", "I", "Cuervo tucked with 1/1 turn", 2.8, 85),
  make("103", "I", "Cuervo tucked with 3/2 turn", 3.2, 85, { eponym: "Kroll" }),
  make("104", "I", "Cuervo tucked with 2/1 turn", 3.6, 85, { eponym: "Canbas" }),
  make("107", "I", "Cuervo piked", 2.8, 85),
  make("108", "I", "Cuervo piked with 1/1 turn", 3.2, 85),
  make("109", "I", "Cuervo piked with 3/2 turn", 3.6, 85),
  make("113", "I", "Cuervo straight (½ turn)", 3.6, 85),
  make("114", "I", "Cuervo straight with 1/1 turn", 4.0, 85),
  make("115", "I", "Cuervo straight with 3/2 turn", 4.4, 85, { eponym: "Lou Yun" }),
  make("116", "I", "Cuervo straight with 2/1 turn", 4.8, 85),
  make("117", "I", "Cuervo straight with 5/2 turn", 5.2, 85, { eponym: "Yeo 2" }),
  make("118", "I", "Cuervo straight with 3/1 turn", 5.6, 85, { eponym: "Yang Hak Seon" }),
  make("119", "I", "Kasamatsu tucked (Tsuk tucked 1/1)", 2.4, 85),
  make("120", "I", "Tsuk tucked with 3/2 turn", 2.8, 85),
  make("121", "I", "Tsuk tucked with 2/1 turn", 3.2, 85, { eponym: "Barbieri" }),
  make("122", "I", "Tsuk tucked with 5/2 turn", 3.6, 85),
  make("125", "I", "Tsuk straight with 1/1 turn", 3.6, 86),
  make("126", "I", "Tsuk straight with 3/2 turn", 4.0, 86),
  make("127", "I", "Tsuk straight with 2/1 turn", 4.4, 86, { eponym: "Akopian" }),
  make("131", "I", "Tsuk straight with 5/2 turn", 4.8, 86, { eponym: "Driggs" }),
  make("132", "I", "Tsuk straight with 3/1 turn", 5.2, 86, { eponym: "López" }),
  make("133", "I", "Tsuk straight with 7/2 turn", 5.6, 86, { eponym: "Yonekura" }),
];

// ── Group II — Handspring salto vaults with simple twists; all dbl. salto fwd ─
const groupII: Skill[] = [
  make("201", "II", "Handspring", 1.2, 87),
  make("202", "II", "Handspring with ½ turn", 1.4, 87),
  make("203", "II", "Handspring with 1/1 turn", 1.6, 87),
  make("204", "II", "Handspring with 3/2 turn", 1.8, 87),
  make("205", "II", "Handspring with 2/1 turn", 2.0, 87),
  make("206", "II", "Handspring with 5/2 turn", 2.2, 87, { eponym: "Tsygankov" }),
  make("207", "II", "Handspring + salto fwd. tucked", 2.0, 87),
  make("213", "II", "Handspring + salto fwd. piked", 2.4, 87),
  make("219", "II", "Handspring + salto fwd. straight", 3.2, 87),
  make("225", "II", "Handspring + double salto fwd. tucked", 4.8, 88, { eponym: "Roche" }),
  make("226", "II", "Roche with ½ turn", 5.2, 88, { eponym: "Dragulescu" }),
  make("228", "II", "Handspring + salto fwd. tucked with ½ t. and salto bwd. tucked", 5.2, 88, {
    eponym: "Zimmerman",
  }),
  make("231", "II", "Handspring + double salto fwd. piked", 5.2, 88, { eponym: "Blanik" }),
  make("232", "II", "Dragulescu piked", 5.6, 88, { eponym: "RI Se Gwang 2" }),
];

// ── Group III — Handspring sideways / Tsukahara family; all dbl. salto bwd. ─
const groupIII: Skill[] = [
  make("301", "III", "Handspring sideways with ¼ turn", 1.2, 89),
  make("302", "III", "Handspring sideways with ¾ turn", 1.4, 89),
  make("303", "III", "Handspring sideways with 5/4 turn", 1.6, 89),
  make("307", "III", "Tsukahara tucked", 1.8, 89),
  make("308", "III", "Tsukahara piked", 2.0, 89),
  make("309", "III", "Tsukahara tucked with ½ turn", 2.0, 89),
  make("313", "III", "Tsukahara straight", 2.8, 89),
  make("314", "III", "Tsukahara straight with ½ turn", 3.2, 89),
  make("319", "III", "Tsukahara + double salto bwd. tucked", 4.8, 89, { eponym: "Yeo" }),
  make("320", "III", "Tsukahara + double salto bwd. piked", 5.2, 89, { eponym: "Lu Yu Fu" }),
  make("321", "III", "Double Tsukahara with 1/1 turn", 5.6, 89, { eponym: "Ri Se Gwang" }),
];

// ── Group IV — Round-off entry; single salto vaults with complex twists ─────
const groupIV: Skill[] = [
  make("401", "IV", "Yurchenko tucked with 1/1 turn", 2.4, 90),
  make("402", "IV", "Yurchenko tucked with 3/2 turn", 2.8, 90),
  make("403", "IV", "Yurchenko tucked with 2/1 turn", 3.2, 90),
  make("404", "IV", "Yurchenko tucked with 5/2 turn", 3.6, 90),
  make("405", "IV", "Yurchenko straight with 1/1 turn", 3.6, 90),
  make("406", "IV", "Yurchenko straight with 3/2 turn", 4.0, 90),
  make("407", "IV", "Yurchenko straight with 2/1 turn", 4.4, 90),
  make("408", "IV", "Yurchenko straight with 5/2 turn", 4.8, 90, { eponym: "Shewfelt" }),
  make("409", "IV", "Yurchenko straight with 3/1 turn", 5.2, 90, { eponym: "Shirai / Kim Hee Hoon" }),
  make("410", "IV", "Yurchenko straight with 7/2 turn", 5.6, 90, { eponym: "Shirai 2" }),
  make("413", "IV", "Round-off ½ t. + hdspr. fwd. + salto fwd. tucked with ½ t.", 2.6, 90),
  make("414", "IV", "Round-off ½ t. + hdspr. fwd. + salto fwd. piked with ½ t.", 3.0, 90, {
    eponym: "Nemov",
  }),
  make("415", "IV", "Round-off ½ t. + hdspr. fwd. + salto fwd. straight with ½ t.", 3.8, 90, {
    eponym: "Hutcheon",
  }),
  make("416", "IV", "Round-off ½ t. + hdspr. fwd. + salto fwd. straight with 1/1 t.", 4.2, 90),
  make("417", "IV", "Round-off ½ t. + hdspr. fwd. + salto fwd. straight with 3/2 t.", 4.6, 90),
  make("419", "IV", "Round-off ½ t. + hdspr. fwd. + salto fwd. straight with 2/1 t.", 5.0, 90),
  make("420", "IV", "Round-off ½ t. + hdspr. fwd. + salto fwd. straight with 5/2 t.", 5.4, 90, {
    eponym: "Li Xiao Peng",
  }),
];

// ── Group V — Round-off entry; single salto without twist; all dbl. saltos ──
const groupV: Skill[] = [
  make("501", "V", "Round-off, handspring bwd.", 1.2, 91),
  make("502", "V", "Round-off, handspring bwd. with ½ turn", 1.4, 91),
  make("503", "V", "Round-off, handspring bwd. with 1/1 turn", 1.6, 91),
  make("507", "V", "Round-off + hdspr. bwd. + salto bwd. tucked", 1.8, 91, {
    eponym: "Yurchenko",
  }),
  make("508", "V", "Yurchenko tucked with ½ turn", 2.0, 91),
  make("509", "V", "Yurchenko piked", 2.0, 91),
  make("510", "V", "Yurchenko straight", 2.8, 91),
  make("511", "V", "Yurchenko straight with ½ turn", 3.2, 91),
  make("513", "V", "Round-off ½ t. + handspring fwd.", 1.4, 91),
  make("514", "V", "Round-off ½ t. + hdspr. fwd. with ½ turn", 1.6, 91),
  make("515", "V", "Round-off ½ t. + hdspr. fwd. with 1/1 turn", 1.8, 91),
  make("516", "V", "Round-off ½ t. + hdspr. fwd. + salto fwd. tucked", 2.2, 91),
  make("517", "V", "Round-off ½ t. + hdspr. fwd. + salto fwd. piked", 2.6, 91),
  make("518", "V", "Round-off ½ t. + hdspr. fwd. + salto fwd. straight", 3.4, 91),
  make("519", "V", "Yurchenko + salto bwd. tucked (double)", 4.8, 91, { eponym: "Melissanidis" }),
  make("520", "V", "Melissanidis piked", 5.2, 91, { eponym: "Yang Wei" }),
  make("521", "V", "Round-off ½ t. + hdspr. fwd. + double salto fwd. tucked", 5.0, 91),
];

export const vaultSkills: Skill[] = [
  ...groupI,
  ...groupII,
  ...groupIII,
  ...groupIV,
  ...groupV,
];
