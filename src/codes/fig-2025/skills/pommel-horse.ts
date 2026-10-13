// FIG 2025–2028 Pommel Horse skill catalog.
// Reference: PDF Section 11 (pages 39–58).

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
  id: `${FIG_2025_ID}:PH:${codeIdentificationNumber}`,
  codeIdentificationNumber,
  codeId: FIG_2025_ID,
  event: "PH",
  elementGroup,
  name,
  difficulty,
  pageRef,
  ...extras,
});

// ── EG I — Single leg swings and scissors ────────────────────────────────────
const egI: Skill[] = [
  make("I.1", "I", "Scissor forward", "A", 47),
  make("I.2", "I", "Scissor fwd. with travel sideways (also with ½ turn)", "B", 47),
  make("I.3", "I", "Scissor fwd. with hop sideways from one end to the other (3/3)", "C", 47),
  make("I.7", "I", "Scissor forward with ½ turn", "B", 47),
  make("I.8", "I", "Double scissor fwd. (¼ t. fwd. and ¼ t. bwd.)", "B", 47),
  make("I.9", "I", "Double scissor fwd. with travel sideways", "C", 47),
  make("I.10", "I", "Double scissor fwd. sideways from one end to the other (3/3)", "D", 47, {
    eponym: "Mikulak",
  }),
  make("I.15", "I", "Double scissor fwd. with travel sideways through handstand", "C", 47, {
    eponym: "Stepanyan",
  }),
  make("I.20", "I", "Leg cut / undercut bwd. through handstand, lower to straddle support", "B", 47),
  make("I.22", "I", "Scissor fwd. with ¼ t. through hdst. on 1 pommel, lower to straddle on other arm", "C", 47, {
    eponym: "Li Ning",
  }),
  make("I.23", "I", "Scissor fwd. with ¾ t. through hdst. on 1 pommel, lower to straddle support", "D", 47, {
    eponym: "Bryan",
  }),
  make("I.25", "I", "Scissor backward", "A", 48),
  make("I.26", "I", "Scissor bwd. with travel sideways (also with ½ turn)", "B", 48),
  make("I.27", "I", "Scissor bwd. with hop sideways from one end to the other (3/3)", "C", 48),
  make("I.31", "I", "Scissor backward with ½ turn", "B", 48),
  make("I.32", "I", "Double scissor bwd. (¼ t. fwd. and ¼ t. bwd.)", "B", 48),
  make("I.39", "I", "Swing bwd. with ¼ t. through hdst. on 1 pommel, lower to straddle support", "C", 48),
];

// ── EG II — Circles, flairs, spindles, handstands, kehrswings, flops, combos ─
const egII: Skill[] = [
  // Circles / flairs in side support
  make("II.1", "II", "Any circle or flair in side support", "A", 49),
  make("II.2", "II", "Circle in side support outside pommels or between the pommels", "B", 49, {
    eponym: "Thomas (flair)",
  }),
  // Circles in cross support (front)
  make("II.7", "II", "Circles in cross support frontways on end", "A", 49),
  make("II.8", "II", "Circles in cross support on 1 pommel (from or to ¼ t. fwd.)", "B", 49),
  // Circles in cross support (rear)
  make("II.13", "II", "Circles in cross support rearways on end", "A", 49),
  make("II.14", "II", "Circles in cross support between the pommels", "B", 49),
  // Spindles
  make("II.25", "II", "Any ¼ spindle", "A", 50),
  make("II.26", "II", "Any ½ spindle", "B", 50),
  make("II.28", "II", "Side support 1/1 spindle, pommel between hands, legs straddled (max 2 circles)", "D", 50),
  make("II.29", "II", "Side support 1/1 spindle with hand support to other side and return", "E", 50, {
    eponym: "Eichorn",
  }),
  make("II.30", "II", "Any 1/1 spindle with both pommels between the hands (flair or circle)", "D", 50, {
    eponym: "Keikha 1",
  }),
  make("II.34", "II", "Any 1/1 spindle within max. 2 circles on the end", "D", 50, {
    eponym: "Magyar",
  }),
  make("II.35", "II", "1/1 spindle with legs straddle or together on the pommels (max 2 circles)", "E", 50, {
    eponym: "Berki",
  }),
  make("II.36", "II", "Cross support, 1/1 spindle with hands between the pommels (max 2 circles)", "F", 50, {
    eponym: "Mousichidis",
  }),
  // Direct Stöckli A / B
  make("II.38", "II", "Direct Stöckli A (DSA) on the pommels or pommel between hands", "B", 50),
  make("II.40", "II", "Direct Stöckli A (DSA) outside pommels", "D", 50, { eponym: "Keikha 3" }),
  make("II.42", "II", "Direct Stöckli A variant — Keikha 6", "F", 50, { eponym: "Keikha 6" }),
  make("II.44", "II", "Direct Stöckli B (DSB)", "B", 50),
  // Flair / circle through handstand
  make("II.51", "II", "Flair or circle through hdst. (with or without ½ t.), lower to flair or circle", "C", 51, {
    eponym: "Tippelt",
  }),
  make("II.52", "II", "Flair with hop travel bwd. through hdst., lower to circles or flairs", "D", 51),
  make("II.54", "II", "Reverse Stöckli / DSA / pommel circle straddle through hdst., 3/3 travel + 360° to flairs", "E", 51, {
    eponym: "Busnari",
  }),
  // Kehrs / Sohn family
  make("II.55", "II", "Double rear (kehr)", "A", 51),
  make("II.56", "II", "Kehr with 270° t. on 1 pommel (Sohn technique) — cross to side support", "B", 51, {
    eponym: "Bertoncelj",
  }),
  make("II.57", "II", "Kehr with 270° t. on 1 pommel (Sohn technique) — side to cross support", "C", 51),
  make("II.58", "II", "Kehr with 1/1 turn on 1 pommel", "D", 51, { eponym: "Sohn" }),
  // Tramlot
  make("II.62", "II", "Direct Tramlot", "B", 51),
  // Reverse Stöckli (Davtyan / Bezugo)
  make("II.68", "II", "Reverse Stöckli 180° (or 270° from one pommel) turn in one circle", "B", 51, {
    eponym: "Davtyan",
  }),
  make("II.69", "II", "Reverse Stöckli with 270° t. (Bezugo) — 2 pommels to cross support on 1 pommel", "C", 51),
  make("II.71", "II", "Reverse Stöckli with 360° t. on 1 pommel", "E", 51, { eponym: "Bezugo" }),
  // Czech kehre / Schwabenflank
  make("II.73", "II", "Schwabenflank", "A", 52),
  make("II.74", "II", "Czechkehre on the pommels or pommel between hands", "B", 52),
  make("II.76", "II", "Czechkehre outside pommels", "D", 52, { eponym: "Pinheiro" }),
  // Wendeswings — feet behind, etc.
  make("II.79", "II", "Wendeswing fwd. with ½ t. from side support using 1 or 2 pommels", "A", 52),
  // Russian wendeswings on the end
  make("II.85", "II", "Russian wendeswing with 180° or 270° on the end", "A", 52),
  make("II.91", "II", "Russian wendeswing with 360° or 540° on the end", "A", 52),
  make("II.92", "II", "Russian wendeswing with 720° or 900° on the end", "B", 52),
  make("II.93", "II", "Russian wendeswing with 1080° or more on the end", "C", 52),
  // Russian wendeswings on the leather
  make("II.97", "II", "Russian wendeswing on the leather with 180° or 270° (also with travel)", "A", 53),
  make("II.103", "II", "Russian wendeswing on the leather with 360° or 540°", "A", 53),
  make("II.104", "II", "Russian wendeswing on the leather with 720° or 900°", "B", 53),
  make("II.105", "II", "Russian wendeswing on the leather with 1080° or more", "C", 53),
  // Russian wendeswings on 1 pommel / between pommels
  make("II.110", "II", "Russian wendeswing 180° or 270° on 1 pommel or between pommels", "B", 53),
  make("II.111", "II", "Russian wendeswing 360° or 540° on 1 pommel or between pommels", "C", 53),
  make("II.112", "II", "Russian wendeswing 720° or 900° on 1 pommel or between pommels", "D", 53),
  make("II.113", "II", "Russian wendeswing 1080° or more on 1 pommel or between pommels", "E", 53),
];

// ── EG III — Travel type elements (Tong Fei, Wu Guonian, Roth, spindles) ────
const egIII: Skill[] = [
  make("III.1", "III", "Circles with travel in side support (1/3) (also with ¼ t.)", "A", 54),
  make("III.2", "III", "Circles with travel in side support (3/3)", "B", 54),
  make("III.3", "III", "Travel in side support (3/3), hands between pommels", "C", 54),
  make("III.4", "III", "Travel in side support (3/3) over both pommels (also with hop)", "D", 54),
  make("III.8", "III", "Circles with hop travel in side support (1/3)", "B", 54),
  make("III.9", "III", "Circles with hop travel 2× in side support (3/3)", "C", 54),
  make("III.11", "III", "From side support beside pommel, travel hop over 2 pommels to support fwd. (1-1 to 5-5)", "E", 54, {
    eponym: "Yamawaki",
  }),
  make("III.14", "III", "Travel fwd. or bwd. with ¼ spindle to side support on 2 pommels", "B", 54),
  make("III.15", "III", "All travels with ½ spindle in side support", "C", 54),
  make("III.17", "III", "From an end side travel with 2× ½ spindle to other end", "E", 54),
  make("III.22", "III", "Travel fwd. 3/3 with ½ spindle from one pommel over the other", "D", 54, {
    eponym: "Nin Reyes / Titov",
  }),
  make("III.23", "III", "Travel 3/3 over both pommels with ½ spindle", "E", 54, {
    eponym: "Nin Reyes 2 / Keikha 4",
  }),
  make("III.29", "III", "Any 3/3 travel in flairs with 1/1 spindle inside 2 circles", "E", 55, {
    eponym: "Urzica 2 / Burkhart",
  }),
  make("III.32", "III", "Travel fwd. in cross support (1/2 or 2/3)", "B", 55),
  make("III.33", "III", "Travel fwd. in cross support with leather/pommel/pommel/leather (3/3)", "C", 55),
  make("III.34", "III", "Any other travel fwd. in cross support to other end (3/3)", "D", 55, {
    eponym: "Magyar",
  }),
  make("III.35", "III", "Travel fwd. in cross support over both pommels (also with hop)", "E", 55, {
    eponym: "Driggs",
  }),
  make("III.37", "III", "Travel bwd. in cross support from one part/pommel to another (1/3)", "A", 55),
  make("III.38", "III", "Travel bwd. in cross support (1/2 or 2/3)", "B", 55),
  make("III.39", "III", "Travel bwd. in cross support with leather/pommel/pommel/leather (3/3)", "C", 55),
  make("III.40", "III", "Any other travel bwd. in cross support to other end (3/3)", "D", 55, {
    eponym: "Sivado",
  }),
  make("III.41", "III", "Travel bwd. in cross support over both pommels (also with hop)", "E", 55, {
    eponym: "Kurbanov / Reid",
  }),
  make("III.46", "III", "Kehre fwd., reverse Stöckli, kehre fwd.", "F", 55, {
    eponym: "Moguilny",
  }),
  make("III.52", "III", "Kehre bwd., kehre fwd., kehre bwd.", "F", 56, { eponym: "Belenki" }),
  make("III.57", "III", "From 1 pommel, Russian wendeswing fwd. to other end (no support on/between pommels)", "C", 56),
  make("III.58", "III", "From end, Russian wendeswing fwd. to other end (no support on/between pommels)", "D", 56, {
    eponym: "Tong Fei",
  }),
  make("III.59", "III", "On the leather, from cross support, Russian wendeswing with 360°+ over both pommels", "E", 56, {
    eponym: "Vammen",
  }),
  make("III.64", "III", "From support 1-2, 3/3 travel in Russian wendeswing with 630°+ turning", "D", 56),
  make("III.65", "III", "Any 3/3 travel in Russian wendeswing with 720°+ turning, hands between pommels", "E", 56, {
    eponym: "Wu Guonian",
  }),
  make("III.70", "III", "Any Russian wendeswing with 360° and 3/3 travel", "D", 56, {
    eponym: "Roth",
  }),
  make("III.75", "III", "Reverse Stöckli from cross support on end to the far pommel", "C", 57, {
    eponym: "Romero",
  }),
  make("III.76", "III", "Reverse Stöckli from cross support on one end to the other", "D", 57, {
    eponym: "Abu Alsoud",
  }),
];

// ── EG IV — Dismounts ────────────────────────────────────────────────────────
const egIV: Skill[] = [
  make("IV.1", "IV", "On the end, Wende from circle (also Russian 180°/270° to Wende)", "A", 58),
  make("IV.2", "IV", "Chaguinian to wende", "B", 58),
  make("IV.4", "IV", "From side support on end, circle/flair to hdst., 3/3 travel with 450°+", "D", 58, {
    eponym: "Kolyvanov",
  }),
  make("IV.5", "IV", "DSA to handstand 3/3 with 450°+ turn", "E", 58),
  make("IV.7", "IV", "On the end, Russian wendeswing with 360° or 540°", "B", 58),
  make("IV.8", "IV", "On the end, Russian wendeswing with 720° or 900°", "B", 58),
  make("IV.9", "IV", "On the end, Russian wendeswing with 1080° or more", "C", 58),
  make("IV.10", "IV", "From pommels, circle ¼ t. to Russian wendeswing 270° on 1 pommel to handstand", "D", 58, {
    eponym: "Dolidze",
  }),
  make("IV.13", "IV", "From side support, wendeswing fwd. with ½ t. to support followed by wende", "A", 58),
  make("IV.15", "IV", "DSA, reverse Stöckli or circle on one pommel through handstand", "C", 58, {
    eponym: "Jessen",
  }),
  make("IV.16", "IV", "DSA with hop bwd. through handstand on other end", "D", 58, {
    eponym: "Loos",
  }),
  make("IV.20", "IV", "Circle or flair through handstand (also with ¾ t. with or without travel)", "B", 58),
  make("IV.21", "IV", "Circle or flair with hop travel bwd. through handstand", "C", 58),
  make("IV.22", "IV", "180° Russian from one end to the other through handstand to dismount", "D", 58),
  make("IV.23", "IV", "Bertoncelj through handstand to dismount", "D", 58, {
    eponym: "Targhetta",
  }),
];

export const pommelHorseSkills: Skill[] = [...egI, ...egII, ...egIII, ...egIV];
