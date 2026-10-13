// FIG 2025–2028 Horizontal Bar skill catalog.
// Reference: PDF Section 15 (pages 113–134).

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
  id: `${FIG_2025_ID}:HB:${codeIdentificationNumber}`,
  codeIdentificationNumber,
  codeId: FIG_2025_ID,
  event: "HB",
  elementGroup,
  name,
  difficulty,
  pageRef,
  ...extras,
});

// ── EG I — Long hang swings with and without turns ──────────────────────────
const egI: Skill[] = [
  make("I.1", "I", "Back uprise to handstand", "A", 118),
  make("I.2", "I", "Back uprise to hdst. with 1/1 turn (also to mixed grip)", "B", 118),
  make("I.5", "I", "Back uprise to hdst. with ½ turn (in mixed grip)", "B", 118),
  make("I.6", "I", "Back uprise to hdst. with ¾ turn", "C", 118),
  make("I.7", "I", "Back uprise to handstand with ½ turn", "A", 118),
  make("I.8", "I", "Swing bwd. and pirouette to hang", "B", 118),
  make("I.9", "I", "Swing bwd. and pirouette to support", "C", 118),
  make("I.13", "I", "Giant swing fwd.", "A", 118),
  make("I.14", "I", "1/1 turn through hdst. in mixed grip", "B", 118),
  make("I.15", "I", "1/1 turn through hdst. in double el-grip", "C", 118),
  make("I.19", "I", "½ turn through handstand", "A", 118),
  make("I.20", "I", "Flying giant swing fwd. (or with ½ t.)", "B", 118),
  make("I.21", "I", "Flying giant swing fwd. with 1/1 turn", "C", 118),
  make("I.26", "I", "Giant swing fwd. with one arm in undergrip", "B", 119),
  make("I.27", "I", "On one arm, giant swing fwd. w/ 1/1 t. thr. el-grip and 1/1 t. to undergrip", "C", 119, {
    eponym: "Zou Li Min",
  }),
  make("I.31", "I", "Giant swing bwd.", "A", 119),
  make("I.32", "I", "One arm giant swing bwd.", "B", 119),
  make("I.37", "I", "½ turn backward through handstand", "A", 119),
  make("I.43", "I", "Giant swing bwd. with hop to undergrip", "A", 119),
  make("I.44", "I", "Flying giant swing bwd.", "B", 119),
  make("I.45", "I", "Flying giant swing bwd. with 1/1 turn", "C", 119, { eponym: "Quast" }),
  make("I.50", "I", "Giant swing bwd. with hop ½ t. to el-grip", "B", 120),
  make("I.51", "I", "Giant swing bwd. with hop 3/2 t. to undergrip / mixed el-grip", "C", 120),
  make("I.52", "I", "Giant swing bwd. with hop 3/2 t. to double el-grip", "D", 120, {
    eponym: "Rybalko",
  }),
  make("I.56", "I", "½ turn backward through handstand to el-grip", "B", 120),
  make("I.62", "I", "Long swing fwd. with hop to el-grip", "B", 120),
  make("I.68", "I", "El-grip giant swing", "B", 120),
  make("I.69", "I", "Giant swing rearways fwd. (Russian giant)", "C", 120),
  make("I.70", "I", "Giant swing rearways bwd. (Czech giant swing)", "D", 120),
  make("I.74", "I", "Steineman uprise w/ ½ t. to support", "B", 121, { eponym: "Ono" }),
  make("I.75", "I", "El-grip giant swing with 1/1 t. through hdst. in mixed grip", "C", 121),
  make("I.76", "I", "Czech giant swing with ½ turn to fwd. giant swing", "D", 121),
];

// ── EG II — Flight elements ──────────────────────────────────────────────────
const egII: Skill[] = [
  make("II.2", "II", "Back uprise and straddle over to hang rearways", "B", 122),
  make("II.3", "II", "Back uprise and straddle hecht with ½ t. to hang", "C", 122, {
    eponym: "Markelov",
  }),
  make("II.5", "II", "Markelov to mixed grip back uprise to handstand", "E", 122, {
    eponym: "Principi",
  }),
  make("II.6", "II", "Back uprise and hecht straight with 3/2 t. to hang", "G", 122, {
    eponym: "Walstrom",
  }),
  make("II.9", "II", "Markelov straight with legs together (also w/ ½ t.)", "C", 122, {
    eponym: "Yamawaki",
  }),
  make("II.12", "II", "Markelov straight with ½ t. variant", "F", 122, {
    eponym: "Muñoz-Pozzo",
  }),
  make("II.15", "II", "Swing fwd. and vault bwd. straddle to hang (also w/ ½ t.)", "C", 122, {
    eponym: "Tkatchev",
  }),
  make("II.16", "II", "Tkatchev straight, also w/ ½ t. to mixed el-grip into back uprise to hdst.", "D", 122, {
    eponym: "Liukin",
  }),
  make("II.17", "II", "Lynch — Tkatchev with mixed grip", "C", 122, { eponym: "Lynch" }),
  make("II.18", "II", "Tkatchev straight with 1/1 turn", "F", 122, { eponym: "Moznik" }),
  make("II.21", "II", "Swing fwd. and vault bwd. piked to hang, also with ½ t.", "C", 122),
  make("II.23", "II", "Tkatchev straddled ½ t. to double el-grip", "E", 122, {
    eponym: "Kulesza",
  }),
  make("II.26", "II", "Back uprise and piked vault with ½ t. to hang", "B", 123, {
    eponym: "Voronin",
  }),
  make("II.28", "II", "Stalder/free hip circle bwd. to Tkatchev straddle, also w/ ½ t.", "D", 123, {
    eponym: "Piatti",
  }),
  make("II.29", "II", "Piatti straight (also w/ ½ t. to mixed el-grip into back uprise to hdst.)", "E", 123, {
    eponym: "Kierzkowski",
  }),
  make("II.32", "II", "Back uprise and rear vault with ¼ t. to hang", "B", 123),
  make("II.34", "II", "Piatti piked, also w/ ½ t.", "D", 123),
  make("II.36", "II", "Piatti straight with 1/1 turn", "H", 123, { eponym: "Suarez" }),
  make("II.39", "II", "Swing bwd. and salto fwd. tuck/straddle to hang (also from el-grip)", "C", 123, {
    eponym: "Jäger",
  }),
  make("II.40", "II", "Swing bwd. and salto fwd. piked to hang (also from el-grip)", "D", 123),
  make("II.41", "II", "Salto fwd. straight (also from el-grip)", "E", 123, {
    eponym: "Balabanov",
  }),
  make("II.42", "II", "Salto fwd. straight with 1/1 turn (also from el-grip)", "F", 123, {
    eponym: "Winkler-Pogorelev",
  }),
  make("II.48", "II", "Salto fwd. straight with 2/1 turn (also from el-grip)", "H", 123),
  make("II.51", "II", "Czech giant and vault bwd. straddle to hang", "C", 124),
  make("II.52", "II", "Swing fwd. and counter-salto fwd. straddled to hang", "D", 124, {
    eponym: "Xiao Ruizhi",
  }),
  make("II.57", "II", "Swing fwd. ½ t. to salto fwd. straddle to hang", "C", 124, {
    eponym: "Deltchev",
  }),
  make("II.58", "II", "Swing fwd. and salto bwd. piked w/ ½ t. to hang (also from Czech giant)", "D", 124, {
    eponym: "Gienger / Sapronenko",
  }),
  make("II.60", "II", "Swing fwd. and salto bwd. with 3/2 t. to hang", "F", 124, { eponym: "Deff" }),
  make("II.65", "II", "Salto fwd. tucked over the bar (also from el-grip)", "E", 124, {
    eponym: "Gaylord",
  }),
  make("II.66", "II", "Gaylord with ½ turn", "F", 124, { eponym: "Pegan" }),
  make("II.72", "II", "Gaylord with 1/1 turn", "H", 124, { eponym: "Koudinov" }),
  make("II.78", "II", "Gaylord piked", "F", 125),
  make("II.82", "II", "Salto bwd. ½ t. tucked over the bar", "D", 125),
  make("II.83", "II", "Salto bwd. ½ t. piked over the bar", "E", 125, { eponym: "Gaylord 2" }),
  make("II.84", "II", "Pegan piked", "H", 125, { eponym: "Maras" }),
  make("II.88", "II", "Double salto bwd. tucked over the bar", "D", 125, { eponym: "Kovacs" }),
  make("II.89", "II", "Kovacs with 1/1 turn", "E", 125, { eponym: "Kolman" }),
  make("II.90", "II", "Kovacs with 2/1 turn", "F", 125, { eponym: "Bretschneider" }),
  make("II.95", "II", "Kovacs piked or straight", "E", 125),
  make("II.96", "II", "Kovacs straight/piked with 1/1 turn", "F", 125, {
    eponym: "Cassina / Pineda",
  }),
  make("II.102", "II", "Kovacs straight with 2/1 turn", "I", 126, { eponym: "Miyachi" }),
  make("II.108", "II", "Kovacs with 3/2 turn to mixed grip", "G", 126, { eponym: "Shaham" }),
];

// ── EG III — In bar and Adler elements ──────────────────────────────────────
const egIII: Skill[] = [
  make("III.1", "III", "Kip to handstand or from mixed grip to handstand", "A", 127),
  make("III.8", "III", "From handstand, free hip circle fwd. through handstand", "B", 127, {
    eponym: "Weiler",
  }),
  make("III.13", "III", "From hang or support, free hip circle through handstand", "A", 127),
  make("III.25", "III", "From hang or support, free hip circle hop to handstand", "A", 128),
  make("III.32", "III", "Free circle fwd. straddled through handstand", "B", 128, {
    eponym: "Endo",
  }),
  make("III.33", "III", "Free circle fwd. legs together through handstand", "C", 128),
  make("III.38", "III", "Free circle bwd. straddle through handstand", "B", 128, {
    eponym: "Stalder",
  }),
  make("III.40", "III", "Stalder with hop 3/2 turn through hdst. in mixed el-grip", "D", 128),
  make("III.41", "III", "Stalder with hop 3/2 turn through hdst. in el-grip", "E", 128),
  make("III.45", "III", "Stalder legs together through handstand", "C", 128),
  make("III.56", "III", "Stalder with hop through handstand", "B", 129),
  make("III.57", "III", "Stalder legs together with hop through handstand", "C", 129),
  make("III.63", "III", "Stoop circle rearward fwd. through handstand (Adler)", "C", 129, {
    eponym: "Adler",
  }),
  make("III.64", "III", "Adler with ½ turn through handstand in overgrip", "D", 129),
  make("III.65", "III", "Adler with 1/1 turn through handstand in undergrip", "E", 129, {
    eponym: "Fuentes",
  }),
  make("III.70", "III", "Adler hop to handstand in undergrip / overgrip / mixed grip", "D", 129),
  make("III.76", "III", "Adler with 1/1 turn through hdst. in mixed grip (also with hop)", "F", 130, {
    eponym: "Baldauf",
  }),
  make("III.79", "III", "Back toss to dorsal hang", "A", 130),
  make("III.80", "III", "From dorsal hang, uprise fwd. to support rearways", "B", 130, {
    eponym: "Steineman",
  }),
  make("III.81", "III", "Stoop in and free back toss to dorsal hang", "C", 130),
  make("III.87", "III", "Steineman uprise w/ stoop or to handstand", "C", 130, {
    eponym: "Köste",
  }),
  make("III.92", "III", "Steineman uprise w/ flank bwd. to support or hang", "B", 130),
  make("III.99", "III", "Endo in el-grip through handstand", "C", 131),
  make("III.100", "III", "Endo legs together in el-grip through handstand", "D", 131),
  make("III.103", "III", "Stoop circle fwd. to straddle cut to hang or support", "A", 131),
  make("III.104", "III", "Stoop circle fwd. to straddle cut through handstand", "B", 131),
  make("III.105", "III", "Stoop circle fwd. to straddle cut with ½ turn", "C", 131, {
    eponym: "Carballo",
  }),
  make("III.106", "III", "Carballo with ½ turn to mixed el-grip", "D", 131, { eponym: "Quintero" }),
  make("III.107", "III", "Quintero to el-grip", "E", 131),
];

// ── EG IV — Dismounts ────────────────────────────────────────────────────────
const egIV: Skill[] = [
  make("IV.1", "IV", "Salto fwd. piked or straight, also w/ ½ turn", "A", 132),
  make("IV.2", "IV", "Salto fwd. straight with 1/1 or 3/2 turn", "B", 132),
  make("IV.3", "IV", "Salto fwd. straight with 2/1 or 5/2 turn", "C", 132),
  make("IV.6", "IV", "Triple salto fwd. tucked (or with ½ t.)", "G", 132, { eponym: "Rumbutis" }),
  make("IV.9", "IV", "Double salto fwd. tucked or piked (also with ½ turn)", "C", 132),
  make("IV.10", "IV", "Double salto fwd. tucked with 1/1 or 3/2 turn", "D", 132),
  make("IV.11", "IV", "Double salto fwd. tucked with 2/1 or 5/2 turn", "E", 132),
  make("IV.15", "IV", "Double salto fwd. tucked from end", "C", 132),
  make("IV.16", "IV", "Double salto fwd. piked or with ½ turn", "D", 132, {
    eponym: "Roethlisberger 2",
  }),
  make("IV.17", "IV", "Double salto fwd. piked with 1/1 or 3/2 turn", "E", 132, {
    eponym: "Alvarez",
  }),
  make("IV.18", "IV", "Double salto fwd. piked with ½ turn", "F", 132, {
    eponym: "Dalaloyan",
  }),
  make("IV.21", "IV", "Double salto fwd. tucked over the bar (with ½ turn)", "C", 132, {
    eponym: "Roethlisberger 1",
  }),
  make("IV.22", "IV", "Dbl. salto fwd. tucked with 1/1 or 3/2 turn over the bar", "D", 132),
  make("IV.25", "IV", "Salto bwd. piked or straight, also w/ ½ turn", "A", 133),
  make("IV.26", "IV", "Salto bwd. straight with 1/1 turn", "B", 133),
  make("IV.27", "IV", "Salto bwd. straight with 5/2 or 3/1 turn", "C", 133),
  make("IV.29", "IV", "Salto bwd. straight with 3/1 turn (single)", "E", 133),
  make("IV.32", "IV", "Double salto bwd. tucked or piked", "B", 133),
  make("IV.33", "IV", "Double salto bwd. tucked with 1/1 turn", "C", 133, { eponym: "Tsukahara" }),
  make("IV.34", "IV", "Double salto bwd. tucked with 2/1 turn", "D", 133),
  make("IV.36", "IV", "Double salto bwd. tucked with 1/1 turn (Hiroyuki Kato variant)", "F", 133, {
    eponym: "Hiroyuki Kato",
  }),
  make("IV.39", "IV", "Double salto bwd. straight", "C", 133),
  make("IV.40", "IV", "Double salto bwd. straight with 1/1 turn", "D", 133, { eponym: "Watanabe" }),
  make("IV.41", "IV", "Double salto bwd. straight with 2/1 turn", "E", 133),
  make("IV.42", "IV", "Double salto bwd. straight with 3/1 turn", "F", 133, {
    eponym: "Fedorchenko",
  }),
  make("IV.48", "IV", "Triple salto bwd. tucked (or over the bar)", "F", 133, {
    eponym: "Andrianov / Hoffmann",
  }),
  make("IV.50", "IV", "Double salto bwd. tucked over the bar", "B", 134),
  make("IV.51", "IV", "Double salto bwd. tucked with 1/1 t. over the bar", "C", 134),
  make("IV.52", "IV", "Double salto bwd. tucked with 2/1 t. over the bar", "D", 134),
  make("IV.54", "IV", "Triple salto bwd. piked", "G", 134, { eponym: "Fardan" }),
  make("IV.57", "IV", "Double salto bwd. straight over the bar", "C", 134),
  make("IV.58", "IV", "Double salto bwd. straight with 1/1 turn over the bar", "D", 134, {
    eponym: "Hayden",
  }),
  make("IV.59", "IV", "Dbl. salto bwd. straight with 3/2 or 2/1 turn over the bar", "E", 134, {
    eponym: "Faulk / Valverde",
  }),
  make("IV.60", "IV", "Triple salto bwd. tucked with 1/1 turn", "G", 134, { eponym: "Belle" }),
  make("IV.61", "IV", "Hecht straddle, hecht or hecht with ½ turn", "A", 134),
  make("IV.62", "IV", "Hecht with 1/1 or 3/2 turn", "B", 134),
  make("IV.64", "IV", "Hecht with 2/1 turn", "D", 134),
];

export const horizontalBarSkills: Skill[] = [...egI, ...egII, ...egIII, ...egIV];
