// FIG 2025–2028 Parallel Bars skill catalog.
// Reference: PDF Section 14 (pages 92–112).

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
  id: `${FIG_2025_ID}:PB:${codeIdentificationNumber}`,
  codeIdentificationNumber,
  codeId: FIG_2025_ID,
  event: "PB",
  elementGroup,
  name,
  difficulty,
  pageRef,
  ...extras,
});

// ── EG I — Elements starting in upper arm position ──────────────────────────
const egI: Skill[] = [
  make("I.1", "I", "Forward uprise to support", "A", 96),
  make("I.2", "I", "Fwd. uprise & straddle cut bwd. to handstand", "B", 96, {
    eponym: "Muntean",
  }),
  make("I.3", "I", "Fwd. uprise & straddle cut bwd. to hang", "C", 96),
  make("I.5", "I", "Forward uprise with ½ turn to handstand", "B", 96),
  make("I.6", "I", "Fwd. uprise + Stützkehr ¾ or ¼ t. to handstand + kip on one rail", "C", 96),
  make("I.7", "I", "Fwd. uprise with ¼ t. to hang on 1 rail", "A", 96),
  make("I.8", "I", "Roll bwd. with ½ t. from upper arm or Fwd. uprise to Kato hop to support", "B", 96, {
    eponym: "Watanabe",
  }),
  make("I.11", "I", "Fwd. uprise to Makuts to upper arm", "D", 96, { eponym: "Tsolakidis 1" }),
  make("I.12", "I", "Fwd. uprise to Makuts to support", "E", 96),
  make("I.14", "I", "Roll bwd. to handstand with straight arms", "B", 96),
  make("I.15", "I", "Back toss from upper arm with ¼ turn to one rail", "C", 96, {
    eponym: "Kovtun",
  }),
  make("I.17", "I", "Forward uprise with 1/1 turn to handstand", "C", 96, { eponym: "Richards" }),
  make("I.18", "I", "Forward uprise with 3/2 turn to handstand", "D", 96, {
    eponym: "Tsolakidis 2",
  }),
  make("I.20", "I", "Salto bwd. with straddled cut to upper arm hang", "B", 96),
  make("I.21", "I", "Roll bwd. with straddled cut to support", "C", 96),
  make("I.24", "I", "Roll bwd. with salto bwd. tucked to upper arm hang", "D", 96, {
    eponym: "Dimitrenko",
  }),
  make("I.30", "I", "Roll bwd. with salto bwd. piked to upper arm hang", "E", 97, {
    eponym: "Li Xiaopeng",
  }),
  make("I.34", "I", "Roll bwd. with ½ t. tucked to upper arm hang", "C", 97, { eponym: "Harada" }),
  make("I.35", "I", "Roll bwd. with ½ t. tucked to hang", "D", 97, { eponym: "Dalton" }),
  make("I.38", "I", "Backward uprise to handstand (also with ½ t.)", "B", 97),
  make("I.40", "I", "Bwd. uprise with ½ t. hop to handstand", "C", 97),
  make("I.41", "I", "Bwd. uprise with ¾ t. hop to handstand on 1 rail", "D", 97),
  make("I.44", "I", "Bwd. uprise with ½ t. & straddle cut bwd. to upper arm hang", "B", 97),
  make("I.45", "I", "Bwd. uprise with ½ t. & straddled cut bwd. to support", "C", 97),
  make("I.50", "I", "Backward uprise with ½ turn to support", "B", 98),
  make("I.51", "I", "Bwd. uprise & 5/4 salto fwd. tucked to upper arm hang", "C", 98, {
    eponym: "Yamawaki",
  }),
  make("I.52", "I", "Bwd. uprise & salto fwd. piked or straight to support", "D", 98),
  make("I.54", "I", "Bwd. uprise + double salto fwd. tucked to upper arm hang", "F", 98),
  make("I.59", "I", "Bwd. uprise & 5/4 salto fwd. straddled to upper arm hang", "E", 98, {
    eponym: "Pakhniuk 1",
  }),
  make("I.60", "I", "Bwd. uprise & 5/4 salto fwd. straddled to hang", "F", 98, {
    eponym: "Pakhniuk 2",
  }),
  make("I.61", "I", "Bwd. uprise & straddled cut or flank over to support, bent arm", "A", 98),
  make("I.62", "I", "Bwd. uprise & straddled cut or flank over to support, straight arm", "B", 98),
];

// ── EG II — Elements in support or through support on 2 bars ─────────────────
const egII: Skill[] = [
  make("II.1", "II", "Any swing to handstand", "A", 99),
  make("II.2", "II", "Bent arm swing fwd. to hop ½ t. to support", "B", 99, { eponym: "Kato" }),
  make("II.3", "II", "Stützkehr fwd. to handstand (1 or 2 bars)", "C", 99, {
    eponym: "Bilozerchev-Peters",
  }),
  make("II.4", "II", "Stützkehr fwd. to handstand on 1 rail (also with ¼ or ¾ turn)", "D", 99, {
    eponym: "Dimic",
  }),
  make("II.7", "II", "Any L-sit on 1 or 2 rails (2 s.)", "A", 99, {
    flags: { isStrengthElement: true },
  }),
  make("II.8", "II", "Any press with bent arm/body to handstand on 1 or 2 rails (also straddled) (2 s.)", "B", 99, {
    flags: { isStrengthElement: true },
  }),
  make("II.9", "II", "¾ Diamidov and ½ turn to upper arms", "C", 99, { eponym: "Salazar" }),
  make("II.10", "II", "¾ Diamidov + rear vault to side hang on 1 bar", "D", 99, {
    eponym: "De Freitas",
  }),
  make("II.13", "II", "Straddle cut bwd. to support", "A", 99),
  make("II.14", "II", "Straddle cut bwd. to handstand", "B", 99),
  make("II.15", "II", "Straddle cut bwd. directly to hang", "C", 99, { eponym: "Babos" }),
  make("II.19", "II", "Straddle cut fwd. to support or L-sit (2 s.)", "A", 99),
  make("II.27", "II", "Swing fwd. with 1/1 t. on 1 arm to handstand", "C", 100),
  make("II.28", "II", "Diamidov with ¼ or ½ t. to handstand", "D", 100, { eponym: "Diamidov" }),
  make("II.32", "II", "Swing fwd. with 1/1 t. to upper arm hang", "B", 100),
  make("II.34", "II", "Swing fwd. with 5/4 t. through hdst. + Healy to upper arm", "D", 100, {
    eponym: "Carminucci",
  }),
  make("II.35", "II", "¾ Diamidov + ¾ Healy on the other hand to support", "D", 100, {
    eponym: "Makuts",
  }),
  make("II.36", "II", "Swing fwd. with 5/4 t. through hdst. + Healy to support", "E", 100, {
    eponym: "Zonderland",
  }),
  make("II.38", "II", "Swing fwd. to handstand, hop to support", "B", 100),
  make("II.39", "II", "Salto bwd. to handstand (also to one rail)", "C", 100, {
    eponym: "Carballo",
  }),
  make("II.40", "II", "Salto bwd. with straddle cut to support", "D", 100, {
    eponym: "Rumbutis",
  }),
  make("II.45", "II", "Salto bwd. with ½ t. to upper arm hang", "C", 100, {
    eponym: "Toumilovich",
  }),
  make("II.46", "II", "Salto bwd. to hdst. on 1 rail (connected to Healy)", "D", 100, {
    eponym: "Morisue",
  }),
  make("II.47", "II", "Double salto tuck to upper arm hang", "E", 100),
  make("II.48", "II", "Double salto pike to upper arm hang", "F", 100, {
    eponym: "Huang Liping",
  }),
  make("II.52", "II", "3/2 salto bwd. with ½ t. to upper arm hang", "D", 101, {
    eponym: "Suarez",
  }),
  make("II.54", "II", "Double salto backwards with half turn to upper arm", "G", 101, {
    eponym: "Kuavita",
  }),
  make("II.56", "II", "Handstand with ¼ t. and fall back to support with ¼ t.", "B", 101),
  make("II.57", "II", "Handstand with ¾ t. and fall back to support with ¼ t.", "C", 101, {
    eponym: "Brändström",
  }),
  make("II.62", "II", "Stützkehr bwd. to support", "B", 101),
  make("II.63", "II", "Stützkehr bwd. through handstand to support", "C", 101, {
    eponym: "Novikov",
  }),
  make("II.69", "II", "Stützkehr bwd. with straddle cut bwd. to support", "C", 101),
  make("II.73", "II", "Healy to upper arm hang (also from handstand on 1 rail)", "A", 102, {
    eponym: "Healy",
  }),
  make("II.74", "II", "Following a swing element to hdst. on 1 rail, Healy to upper arm hang", "B", 102),
  make("II.75", "II", "Healy to support (also from handstand on 1 rail)", "C", 102),
  make("II.76", "II", "Following a swing to hdst. on 1 rail, Healy 360°+ to support", "D", 102, {
    eponym: "Bejenaru",
  }),
  make("II.81", "II", "Swing bwd. with ½ t. hop to handstand", "C", 102),
  make("II.82", "II", "Swing bwd. with ¾ t. hop to handstand", "D", 102),
  make("II.83", "II", "Swing bwd. with 1/1 t. hop to handstand (or reverse 1/1 t.)", "E", 102, {
    eponym: "Gatson 1",
  }),
  make("II.84", "II", "Gatson 1 with ¼ t. on 1 rail + ¼ t. on 2 rails", "F", 102, {
    eponym: "Gatson 2 / Patron",
  }),
  make("II.86", "II", "From hdst. on 1 rail, ½ or ¾ t. fwd. or bwd. in handstand", "B", 102),
  make("II.91", "II", "Any handstand with ½ turn (also with 2 s.)", "A", 102),
  make("II.92", "II", "Any 1/1 pirouette in handstand on 2 rails", "B", 102),
  make("II.99", "II", "From handstand, salto fwd. to support or inlocate", "D", 103, {
    eponym: "Carballo 2",
  }),
  make("II.101", "II", "5/4 salto fwd. straddle directly to hang", "E", 103, {
    eponym: "Lee Chul Hon / Sasaki",
  }),
  make("II.104", "II", "5/4 salto fwd. tuck or pike to upper arm hang", "B", 103),
  make("II.105", "II", "Salto fwd. to support", "C", 103),
  make("II.106", "II", "5/4 salto fwd. straddled to upper arm hang", "D", 103),
  make("II.107", "II", "5/4 salto fwd. straddled to bent arm support", "E", 103),
  make("II.111", "II", "Salto fwd. piked to hang", "C", 103, { eponym: "Juarez 2" }),
  make("II.113", "II", "Double salto fwd. tuck to upper arm hang", "E", 103),
  make("II.114", "II", "Double salto fwd. pike to upper arm hang", "F", 103),
  make("II.117", "II", "5/4 salto fwd. straight to upper arm hang", "C", 103),
  make("II.119", "II", "Salto fwd. with 1/1 t. to upper arm hang", "E", 103, {
    eponym: "Urzica",
  }),
];

// ── EG III — Long swings in hang on 1 or 2 bars / underswings ────────────────
const egIII: Skill[] = [
  make("III.3", "III", "Swing fwd., straddle cut bwd., regrasp at horizontal to bent/upper arm", "C", 104, {
    eponym: "Alsadi",
  }),
  make("III.4", "III", "Moy piked with straddle bwd. to handstand", "D", 104, { eponym: "Tippelt" }),
  make("III.5", "III", "Swing fwd., straddle cut bwd., regrasp str. body at horizontal", "E", 104, {
    eponym: "Bhavsar",
  }),
  make("III.8", "III", "Moy piked with straddled cut bwd. and ½ t. to upper arm hang", "B", 104, {
    eponym: "Nolet",
  }),
  make("III.9", "III", "Moy piked with 1/1 t. to upper arm hang", "C", 104),
  make("III.10", "III", "Moy + salto fwd. tuck / pike / straddle to upper arm hang", "D", 104, {
    eponym: "Giraldo",
  }),
  make("III.14", "III", "Moy to support bent legs (also without grip release)", "B", 104),
  make("III.15", "III", "Moy to support straight legs (also without grip release)", "C", 104, {
    eponym: "Moy",
  }),
  make("III.21", "III", "Giant swing bwd. to handstand or inlocation fwd. (also w/ ¼ or ½ t.)", "C", 104, {
    eponym: "Kenmotsu",
  }),
  make("III.22", "III", "Giant swing bwd. to hdst. on one rail (connected to Healy)", "D", 104, {
    eponym: "Wells / Piasecky",
  }),
  make("III.29", "III", "Giant swing bwd. + Diamidov to handstand (also to one rail)", "D", 105),
  make("III.30", "III", "Giant swing Diamidov with ¼ or ½ t. to handstand", "E", 105),
  make("III.38", "III", "Swing down with salto bwd. straight to hang", "B", 105),
  make("III.39", "III", "Giant swing bwd. with ½ t. to upper arm hang", "C", 105, {
    eponym: "Gushiken",
  }),
  make("III.40", "III", "Giant swing bwd. with ½ t. to support", "D", 105, {
    eponym: "Marinitch",
  }),
  make("III.42", "III", "Giant swing bwd. with Diamidov to hdst. on one rail (Healy connection)", "F", 105),
  make("III.46", "III", "Giant swing bwd. with Makuts to upper arm hang", "D", 105, {
    eponym: "Dauser",
  }),
  make("III.48", "III", "Giant swing bwd. with Makuts", "F", 105, { eponym: "Baumann" }),
  make("III.50", "III", "Giant swing bwd. with straddled cut to upper arm hang", "B", 106),
  make("III.52", "III", "Giant swing bwd. with straddle cut to support or bent arms support", "D", 106, {
    eponym: "Korolev",
  }),
  make("III.53", "III", "Giant swing bwd. with ½ t. and straddled cut bwd. to upper arms", "E", 106, {
    eponym: "Sosa",
  }),
  make("III.59", "III", "From giant swing bwd., double salto tuck to upper arm hang", "E", 106, {
    eponym: "Belle",
  }),
  make("III.60", "III", "Belle pike", "F", 106),
  make("III.66", "III", "Belle with 1/1 turn", "H", 106),
  make("III.69", "III", "Giant swing bwd. + salto with ½ t. to hang on the end", "C", 106, {
    eponym: "Chartrand",
  }),
  make("III.70", "III", "Giant swing bwd. + salto with ½ t. to upper arm hang", "D", 106, {
    eponym: "Matsunaga",
  }),
  make("III.71", "III", "Giant swing bwd. + salto with ½ t. to hang", "E", 106, {
    eponym: "Solis",
  }),
  make("III.72", "III", "Giant swing bwd. with ½ t. and 3/2 salto fwd. to upper arm hang", "G", 106, {
    eponym: "Tanaka",
  }),
  make("III.73", "III", "Glide kip", "A", 107),
  make("III.74", "III", "Glide kip with ½ t. to support", "B", 107),
  make("III.75", "III", "Glide kip bwd. to handstand", "B", 107),
  make("III.77", "III", "Giant swing bwd. + salto with ½ t. to support", "C", 107, {
    eponym: "Torres",
  }),
  make("III.78", "III", "Giant swing bwd. with ½ t. and 3/2 salto fwd. piked to upper arm hang", "H", 107, {
    eponym: "Esparza",
  }),
  make("III.80", "III", "Glide kip to straddled cut bwd. handstand on 1 or 2 rails", "B", 107),
  make("III.81", "III", "Glide kip to straddled cut bwd. to hand", "C", 107, { eponym: "Okubo" }),
  make("III.83", "III", "Giant swing bwd. + salto ½ straight to upper arm hang", "E", 107, {
    eponym: "Fokin",
  }),
  make("III.86", "III", "Glide kip one rail through L-sit straddled to handstand", "B", 107),
  make("III.87", "III", "Glide kip through L-sit piked to handstand", "C", 107),
  make("III.88", "III", "Glide kip through L-sit piked to hdst. + hop 3/4+ turn", "D", 107),
  make("III.92", "III", "Glide kip through V-sit and hop ½ turn to hang on other rail", "B", 107, {
    eponym: "Li Donghua",
  }),
  make("III.97", "III", "Cast to upper arm hang", "A", 108),
  make("III.98", "III", "Cast to support", "A", 108),
  make("III.99", "III", "Felge with ½ t. to upper arm hang", "B", 108),
  make("III.100", "III", "Felge with ½ t. to rear support", "B", 108),
  make("III.104", "III", "Cast with ½ t. to upper arm hang", "B", 108),
  make("III.105", "III", "Cast with ½ t. to support", "B", 108),
  make("III.106", "III", "Felge to handstand (also to one rail or ¼ t.)", "C", 108, {
    eponym: "Cucherat / Celen",
  }),
  make("III.107", "III", "Felge with ½ or ¾ t. to handstand", "D", 108),
  make("III.108", "III", "Felge with 1/1 t. to handstand", "E", 108, { eponym: "Teng Hai Bin" }),
  make("III.111", "III", "Cast to straddle cut bwd. to handstand", "C", 108, {
    eponym: "Arican",
  }),
  make("III.114", "III", "Felge with 5/4 t. to handstand", "F", 108, { eponym: "Zhou Shixiong" }),
  make("III.115", "III", "Felge with travel to hang", "A", 108, { eponym: "Chiarlo" }),
  make("III.116", "III", "Felge to support", "A", 108),
  make("III.117", "III", "Felge with immediate straddle cut to support", "C", 108),
  make("III.119", "III", "Felge to one rail handstand (connected to Healy)", "E", 108),
  make("III.120", "III", "Felge through handstand to Makuts", "F", 108, { eponym: "Yamamuro" }),
  make("III.122", "III", "Felge roll bwd. with tuck salto ½ to upper arm hang", "B", 109, {
    eponym: "Gagnon",
  }),
  make("III.123", "III", "Felge roll bwd. with straight salto ½ to upper arm hang", "C", 109, {
    eponym: "Gagnon 2",
  }),
  make("III.125", "III", "Felge with salto bwd. tuck to upper arm hang", "E", 109, {
    eponym: "Tejada",
  }),
  make("III.126", "III", "Felge with salto bwd. pike to upper arm hang", "F", 109, {
    eponym: "Juarez 1",
  }),
  make("III.127", "III", "Felge forward to support", "A", 109),
  make("III.128", "III", "Felge forward with ½ t. to support", "B", 109),
  make("III.130", "III", "Shoot up with ¼ t. to handstand", "D", 109),
  make("III.131", "III", "Shoot up with ½ or ¾ t. to handstand", "E", 109, { eponym: "Nguyen" }),
  make("III.137", "III", "Shoot up to handstand and fall back to support with ¼ t.", "E", 109, {
    eponym: "Malone",
  }),
];

// ── EG IV — Dismounts ────────────────────────────────────────────────────────
const egIV: Skill[] = [
  make("IV.1", "IV", "Salto fwd. piked or straight, also with ½ turn", "A", 110),
  make("IV.5", "IV", "Double salto fwd. tucked", "E", 110),
  make("IV.6", "IV", "Double salto fwd. piked", "F", 110, { eponym: "Belyavskiy" }),
  make("IV.8", "IV", "Salto fwd. piked or straight with 1/1 turn", "B", 110),
  make("IV.9", "IV", "Salto fwd. piked or straight with 3/2 turn", "C", 110),
  make("IV.10", "IV", "Salto fwd. piked or straight with 2/1 or 5/2 turn", "D", 110),
  make("IV.11", "IV", "Double salto fwd. tucked with ½ turn or ½ t. dbl. salto bwd.", "E", 110),
  make("IV.12", "IV", "Double salto fwd. tucked with 1/1 turn", "F", 110, { eponym: "Larduet" }),
  make("IV.15", "IV", "Double salto fwd. tucked from end", "C", 110),
  make("IV.18", "IV", "Double salto fwd. piked with ½ turn", "F", 110, { eponym: "Dalaloyan" }),
  make("IV.19", "IV", "Salto bwd. piked or straight, also with ½ turn", "A", 110),
  make("IV.21", "IV", "Salto bwd. piked or straight with 1/1 or 3/2 turn", "C", 110),
  make("IV.22", "IV", "Salto bwd. straight with 2/1 turn", "D", 110, { eponym: "Kan" }),
  make("IV.28", "IV", "High wende and salto bwd. tuck or pike", "D", 111, {
    eponym: "Roethlisberger",
  }),
  make("IV.32", "IV", "Double salto bwd. tucked from end", "B", 111),
  make("IV.33", "IV", "Double salto bwd. tucked", "C", 111),
  make("IV.34", "IV", "Double salto bwd. piked", "D", 111),
  make("IV.36", "IV", "Double salto bwd. tucked with 1/1 turn", "F", 111, { eponym: "Hiroyuki Kato" }),
  make("IV.40", "IV", "Double salto bwd. tucked with ½ turn or salto bwd. ½ to salto fwd.", "D", 111),
  make("IV.43", "IV", "From hang on end, salto bwd. straight", "A", 111),
  make("IV.45", "IV", "From hang on end, double salto bwd. tucked", "C", 111),
  make("IV.46", "IV", "From hang on end, double salto bwd. piked", "D", 111),
  make("IV.47", "IV", "From hang on end, double salto bwd. straight", "E", 111),
  make("IV.48", "IV", "From hang on end, triple salto bwd. tucked", "F", 111, { eponym: "Alvarez" }),
  make("IV.53", "IV", "From hang on end, double salto bwd. tucked with 1/1 or ½ t.", "E", 112),
  make("IV.54", "IV", "From hang on end, double salto bwd. tucked with 2/1 turn", "F", 112),
];

export const parallelBarsSkills: Skill[] = [...egI, ...egII, ...egIII, ...egIV];
