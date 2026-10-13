// Compulsory routines for USAG Men's Development Program — Levels 4, 5, 6.
//
// Source: USAG Men's Development Program Junior Competition Manual
// (2021-2024 cycle, Version Nov. 2022) — publicly available at:
//   https://cdn1.sportngin.com/attachments/document/ac34-2845851/Men_s_Development_Program_2021_2024_Juni.pdf
//
// IMPORTANT CYCLE NOTE: The current MDP cycle is 2025-2028, and the
// Competition Manual for that cycle is sold on Google Play. The data
// below is transcribed verbatim from the 2021-2024 manual — many parts
// will be unchanged, but cross-reference your current manual for any
// updates before competition. Differences will be flagged in routineNotes
// where I noticed them between MDP Newsletter #4 (2025) clarifications
// and this 2021-2024 source.

import type { CompulsoryRoutine } from "../types";

const SOURCE = "USAG MDP Junior Competition Manual 2021-2024 (Nov 2022)";

// ── FLOOR EXERCISE ──────────────────────────────────────────────────────────

const fxL4: CompulsoryRoutine = {
  level: 4,
  event: "FX",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Run, hurdle, punch straight jump to stand", criteria: "Feet in front of hips on punch; show distinct vertical rise; no rebound allowed" },
    { number: "2", kind: "element", description: "Kick leg up and cartwheel with ¼ turn to stand, tuck or pike back extension roll through handstand" },
    { number: "V1", kind: "value-increase", description: "In #2, perform back extension roll with straight arms", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "Lower to arched prone support with head up and toes pointed, lift to straddle stand with head up and arms extended", criteria: "Continuous rhythm throughout sequence" },
    { number: "4", kind: "element", description: "Jump from straddle stand to momentary hold of handstand, pike down or roll out with straight arms to stand", criteria: "Momentary hold must show stop" },
    { number: "V2", kind: "value-increase", description: "In #4, perform a 2 second hold of handstand", bonusValue: 0.1 },
    { number: "SB1", kind: "specified-bonus", description: "Replace #4 with straddled press to handstand with momentary hold, pike down or rollout with straight arms to stand", bonusValue: 0.5, notes: "An Endo roll to handstand is not an option for this SB" },
    { number: "5", kind: "element", description: "Run, hurdle, forward handspring", criteria: "Rebound allowed" },
    { number: "6", kind: "element", description: "Step forward and kick to momentary hold of handstand", criteria: "Momentary hold must show stop" },
    { number: "SB2", kind: "specified-bonus", description: "Replace #6 with step forward and kick to handstand with 360° full pirouette", bonusValue: 0.5 },
    { number: "7", kind: "element", description: "Straight arm forward roll, straight legged sissone, step forward to ½ turn rearward", criteria: "Sissone with legs split 45° or greater" },
    { number: "V3", kind: "value-increase", description: "In #7, perform sissone with legs split greater than 90°", bonusValue: 0.1 },
    { number: "8", kind: "element", description: "Run, hurdle, round-off, back handspring, rebound to stand" },
    { number: "SB3", kind: "specified-bonus", description: "Replace #8 with run, hurdle, round-off, back handspring, back handspring, rebound to stand", bonusValue: 0.5 },
  ],
};

const fxL5: CompulsoryRoutine = {
  level: 5,
  event: "FX",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Run, punch, salto forward tucked", notes: "Controlled landing required" },
    { number: "SB1", kind: "specified-bonus", description: "Replace #1 with run, punch, salto forward piked", bonusValue: 0.5 },
    { number: "2", kind: "element", description: "Step forward and kick to handstand with full 360° pirouette", criteria: "Continuous rhythm; show control of handstand during pirouette" },
    { number: "3", kind: "element", description: "Straight arm forward roll to headspring, straight legged sissone, step forward to ½ turn rearward", criteria: "Sissone with legs split 45° or greater" },
    { number: "V1", kind: "value-increase", description: "In #3, perform sissone with legs split greater than 90°", bonusValue: 0.1 },
    { number: "4", kind: "element", description: "Run, hurdle, forward handspring step-out, forward handspring. Straight jump with ½ turn to stand", criteria: "Rebound allowed on second handspring followed by jump ½ turn" },
    { number: "5", kind: "element", description: "Straight arm tuck or pike back extension roll through handstand, lower to arched prone support, lift to straddle stand" },
    { number: "6", kind: "element", description: "Momentary hold of straddle press handstand", criteria: "Momentary hold must show stop" },
    { number: "V2", kind: "value-increase", description: "In #6, perform a 2 second hold of handstand", bonusValue: 0.1 },
    { number: "SB2", kind: "specified-bonus", description: "Replace #6 with Endo roll to momentary hold of handstand", bonusValue: 0.5 },
    { number: "7", kind: "element", description: "Pike down or rollout to stand and kick rearways 180° to one or more steps, assemble ½ turn to stand facing diagonal" },
    { number: "8", kind: "element", description: "Run, hurdle, round-off, back handspring, salto backward tucked" },
    { number: "V3", kind: "value-increase", description: "In #8, show full extension of body prior to landing", bonusValue: 0.1 },
    { number: "SB3", kind: "specified-bonus", description: "Replace #8 with run, hurdle, round-off, back handspring, back handspring, salto backward tucked", bonusValue: 0.5 },
  ],
};

const fxL6: CompulsoryRoutine = {
  level: 6,
  event: "FX",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Run, hurdle, round-off, back handspring, salto backward stretched" },
    { number: "SB1", kind: "specified-bonus", description: "Replace #1 with run, hurdle, round-off, back handspring, salto backward stretched with a full twist", bonusValue: 0.5 },
    { number: "2", kind: "element", description: "Straight arm tuck or pike back extension roll to handstand with ½ turn, lower to arched prone support" },
    { number: "3", kind: "element", description: "Lift to tuck position, jump to straight legged sissone, step forward to ½ turn rearward", criteria: "Legs split 45° or greater" },
    { number: "V1", kind: "value-increase", description: "In #3, perform sissone with legs split greater than 90°", bonusValue: 0.1 },
    { number: "4", kind: "element", description: "Run, hurdle, forward handspring, salto forward tucked to stand", notes: "Controlled landing of salto required" },
    { number: "SB2", kind: "specified-bonus", description: "Replace #4 with run, hurdle, forward handspring, salto forward piked or stretched to stand", bonusValue: 0.5 },
    { number: "5", kind: "element", description: "Step forward and kick ½ turn to Swedish fall, lower to arched prone support or lift to straddle stand or split" },
    { number: "V2", kind: "value-increase", description: "In #5, perform Swedish fall with top leg past vertical", bonusValue: 0.1 },
    { number: "6", kind: "element", description: "Perform any FIG \"B\" or higher press or Endo roll to handstand hold", criteria: "2 second hold of handstand" },
    { number: "7", kind: "element", description: "Pike down, turn toward the corner, step forward (one or more steps allowed) to hitch kick, step forward to ½ turn rearward", criteria: "Hitch kick with both legs at horizontal" },
    { number: "8", kind: "element", description: "Run, hurdle, round-off, back handspring, back handspring, salto backward tucked" },
    { number: "V3", kind: "value-increase", description: "In #8, show full extension of body prior to landing", bonusValue: 0.1 },
    { number: "SB3", kind: "specified-bonus", description: "Replace #8 with run, hurdle, round-off, back handspring, tempo salto backward, back handspring, salto backward tucked", bonusValue: 0.5 },
  ],
};

// ── POMMEL HORSE / MUSHROOM ─────────────────────────────────────────────────

const phL4: CompulsoryRoutine = {
  level: 4,
  event: "PH",
  baseStartValue: 10.0,
  routineNotes: "Performed on mushroom (not pommel horse). All circles begin and end in front support.",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Double leg circle" },
    { number: "V1", kind: "value-increase", description: "In #1, performed with 0.1 or less in execution deductions", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Double leg circle" },
    { number: "V2", kind: "value-increase", description: "In #2, performed with 0.1 or less in execution deductions", bonusValue: 0.1 },
    { number: "SB1", kind: "specified-bonus", description: "Following #2, add two double leg circles", bonusValue: 0.5, notes: "Must be performed immediately following part #2 and prior to SB2 or SB3" },
    { number: "SB2", kind: "specified-bonus", description: "Following #2, SB1 or SB3, add ½ spindle within one or two double leg circles", bonusValue: 0.5 },
    { number: "SB3", kind: "specified-bonus", description: "Following #2, SB1 or SB2, add two flaired double leg circles", bonusValue: 0.5, criteria: "Leg separation of 90° or more" },
    { number: "3", kind: "element", description: "Double leg circle" },
    { number: "V3", kind: "value-increase", description: "In #3, performed with 0.1 or less in execution deductions", bonusValue: 0.1 },
    { number: "4", kind: "element", description: "½ double leg circle with ¼ turn to flank dismount" },
  ],
};

const phL5: CompulsoryRoutine = {
  level: 5,
  event: "PH",
  baseStartValue: 10.0,
  routineNotes: "Performed on mushroom.",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Two double leg circles" },
    { number: "V1", kind: "value-increase", description: "In #1, performed with 0.1 or less in execution deductions", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Czechkehre (Moore)" },
    { number: "V2", kind: "value-increase", description: "In #2, performed with 0.1 or less in execution deductions", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "One or more double leg circles" },
    { number: "SB1", kind: "specified-bonus", description: "Following #3, add a Direct Stöckli A (DSA)", bonusValue: 0.5 },
    { number: "4", kind: "element", description: "Two or more flaired double leg circles", criteria: "Leg separation of 90° or greater" },
    { number: "V3", kind: "value-increase", description: "In #4, perform with leg separation of 135° or greater", bonusValue: 0.1 },
    { number: "SB2", kind: "specified-bonus", description: "Replace #4 with ½ spindle within two or more flaired double leg circles", bonusValue: 0.5 },
    { number: "SB3", kind: "specified-bonus", description: "Following #4 or SB2, add Russian wendeswing with 270° or 360°", bonusValue: 0.5 },
    { number: "5", kind: "element", description: "Double leg circle" },
    { number: "6", kind: "element", description: "½ double leg circle with ¼ turn to flank dismount" },
  ],
};

const phL6: CompulsoryRoutine = {
  level: 6,
  event: "PH",
  baseStartValue: 10.0,
  routineNotes: "Performed on pommel-less horse. Parts #3, #4 & #5 must be performed in direct succession. Other parts may be in any order.",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "One or more circles in cross support frontways on end (front loops)" },
    { number: "V1", kind: "value-increase", description: "In #1, performed with 0.1 or less in execution deductions", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Two flaired circles in cross support frontways on end (flaired front loops) in direct succession", criteria: "Leg separation of 90° or greater" },
    { number: "V2", kind: "value-increase", description: "In #2, perform with leg separation of 135° or greater", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "Circle in cross support frontways with ¼ turn forward to side support" },
    { number: "4", kind: "element", description: "Two double leg circles in side support" },
    { number: "V3", kind: "value-increase", description: "In #4, performed with 0.1 or less in execution deductions", bonusValue: 0.1 },
    { number: "5", kind: "element", description: "One double leg circle in side support with ¼ turn forward to cross support rearways" },
    { number: "6", kind: "element", description: "Circle in cross support rearways on end (back loop)" },
    { number: "SB1", kind: "specified-bonus", description: "Replace #6 with cross support rearways ½ spindle within maximum two circles", bonusValue: 0.5 },
    { number: "SB2", kind: "specified-bonus", description: "Add a Russian wendeswing with 270° or more", bonusValue: 0.5 },
    { number: "SB3A", kind: "specified-bonus", description: "Add travel forward in cross support to other end (also in flairs) (3/3) (Magyar)", bonusValue: 0.5, exclusiveGroup: "SB3", notes: "Only one of SB 3A or 3B may receive bonus credit" },
    { number: "SB3B", kind: "specified-bonus", description: "Add travel backward in cross support to other end (also in flairs) (3/3) (Sivado)", bonusValue: 0.5, exclusiveGroup: "SB3", notes: "Only one of SB 3A or 3B may receive bonus credit" },
    { number: "7", kind: "element", description: "One circle in cross support into flank or wende dismount", notes: "A circle must be performed from front support following the completion of any skill prior to the dismount." },
  ],
};

// ── STILL RINGS ─────────────────────────────────────────────────────────────

const srL4: CompulsoryRoutine = {
  level: 4,
  event: "SR",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From straight arm hang (false grip allowed), muscle up to support with spotter assistance and with as straight a body as possible", criteria: "Slight pike in hips permitted" },
    { number: "SB1", kind: "specified-bonus", description: "Replace #1 with muscle up WITHOUT spotter assistance", bonusValue: 0.5 },
    { number: "2", kind: "element", description: "Straight body, straight arm support hold", criteria: "2 second hold; rings turned out; arms free of straps" },
    { number: "SB2", kind: "specified-bonus", description: "Following #2, add lift legs to \"L\" hold", bonusValue: 0.5, criteria: "2 second hold of L support" },
    { number: "3", kind: "element", description: "Roll backward to piked body inverted hang", criteria: "Bent arms allowed" },
    { number: "SB3", kind: "specified-bonus", description: "Following #3, add extend body horizontally to hanging scale rearways (back lever)", bonusValue: 0.5, criteria: "2 second hold" },
    { number: "4", kind: "element", description: "Lower to momentary hold of German hang (skin-the-cat)", criteria: "Momentary hold must show stop" },
    { number: "V1", kind: "value-increase", description: "In #4, perform with fully extended shoulder flexibility", bonusValue: 0.1 },
    { number: "5", kind: "element", description: "Pull out to piked inverted hang and cast forward to swing backward", criteria: "Turnover swing technique; backward to 45° below horizontal" },
    { number: "6", kind: "element", description: "Swing forward, swing backward", criteria: "Backward to horizontal" },
    { number: "V2", kind: "value-increase", description: "In #6, swing backward with turnover greater than horizontal", bonusValue: 0.1 },
    { number: "7", kind: "element", description: "Swing forward, swing backward", criteria: "Backward to horizontal" },
    { number: "V3", kind: "value-increase", description: "In #7, swing backward with turnover greater than horizontal", bonusValue: 0.1 },
    { number: "8", kind: "element", description: "Swing forward to salto backward tucked dismount", criteria: "Show slight rise in salto; bent arms allowed" },
  ],
};

const srL5: CompulsoryRoutine = {
  level: 5,
  event: "SR",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From straight arm hang, straight arm piked body pull directly to piked inverted hang", criteria: "Pull with straight arms, bent body" },
    { number: "SB1", kind: "specified-bonus", description: "Following #1 extend body horizontally to hanging scale rearways (back lever)", bonusValue: 0.5, criteria: "2 second hold" },
    { number: "2", kind: "element", description: "Lower slowly to momentary hold of German hang, pull out and extend to momentary hold of straight body inverted hang" },
    { number: "V1", kind: "value-increase", description: "In #2, perform German hang with fully extended shoulder flexibility", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "Compress to a tight pike and dislocate backwards", criteria: "Straight body at horizontal or higher" },
    { number: "4", kind: "element", description: "Swing forward, swing backward", criteria: "Turnover technique; backward to horizontal" },
    { number: "V2", kind: "value-increase", description: "In #4, swing backward with turnover greater than horizontal", bonusValue: 0.1 },
    { number: "5", kind: "element", description: "Swing forward, swing backward to uprise backward to support", criteria: "Bent arms allowed on uprise" },
    { number: "V3", kind: "value-increase", description: "In #5, perform uprise backward with straight arms", bonusValue: 0.1 },
    { number: "6", kind: "element", description: "Lift legs to \"L\" hold", criteria: "2 second hold; arms straight; rings turned out" },
    { number: "7", kind: "element", description: "Pike press to shoulder stand hold", criteria: "2 second hold; straight body shoulder stand; arms free of straps" },
    { number: "SB2", kind: "specified-bonus", description: "Replace #7 with momentary hold of bent or straight arm, bent body press to handstand, lower to shoulder stand hold", bonusValue: 0.5 },
    { number: "8", kind: "element", description: "Bail forward, swing backward", criteria: "Backward to horizontal" },
    { number: "9", kind: "element", description: "Swing forward, swing backward", criteria: "Turnover technique; backward to horizontal" },
    { number: "SB3", kind: "specified-bonus", description: "Following #9 add inlocate stretched, swing backward", bonusValue: 0.5, criteria: "Inlocate stretched with continuous rhythm" },
    { number: "10", kind: "element", description: "Swing forward to salto backward tucked or stretched dismount", criteria: "Hips at ring height; bent arms allowed" },
  ],
};

const srL6: CompulsoryRoutine = {
  level: 6,
  event: "SR",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From straight arm hang, straight arm piked body pull directly to straight body inverted hang" },
    { number: "V1", kind: "value-increase", description: "In #1, perform with straight arms and straight body", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Cast, swing backward to uprise backward with straight arms to \"L\" support hold", criteria: "2 second hold of L support" },
    { number: "3", kind: "element", description: "Press to tucked Planche hold, lower to \"L\" support hold", criteria: "Hips level with shoulders; 2 second hold of each" },
    { number: "4", kind: "element", description: "Pike press to shoulder stand hold and bail forward", criteria: "2 sec hold of shoulder stand" },
    { number: "SB1", kind: "specified-bonus", description: "Replace #4 with momentary hold of bent or straight arm bent body press to handstand, lower to shoulder stand hold and bail forward", bonusValue: 0.5 },
    { number: "SB2", kind: "specified-bonus", description: "Following #4, add bail to swing backward to shoulderstand (baby giant), bail forward to #5", bonusValue: 0.5 },
    { number: "5", kind: "element", description: "Inlocate stretched", criteria: "Continuous rhythm; turnover must show rise" },
    { number: "V2", kind: "value-increase", description: "In #5, perform with shoulders at ring level with body vertical", bonusValue: 0.1 },
    { number: "6", kind: "element", description: "Uprise backward with straight arms to support" },
    { number: "7", kind: "element", description: "Roll backward to piked body inverted hang", criteria: "Bent arms allowed" },
    { number: "8", kind: "element", description: "Dislocate backwards", criteria: "Straight body at horizontal or higher" },
    { number: "9", kind: "element", description: "One or two dislocates backward stretched", criteria: "Straight body" },
    { number: "V3", kind: "value-increase", description: "In #9, perform with shoulders at ring level", bonusValue: 0.1 },
    { number: "10", kind: "element", description: "Swing forward to salto backward stretched dismount", criteria: "Hips at ring height" },
    { number: "SB3", kind: "specified-bonus", description: "Replace #10 with swing forward to double salto backward tucked dismount", bonusValue: 0.5 },
  ],
};

// ── VAULT ────────────────────────────────────────────────────────────────────

const vtL4: CompulsoryRoutine = {
  level: 4,
  event: "VT",
  baseStartValue: 10.0,
  routineNotes: "Level 4 Vault — Front Salto Tucked. Run from maximum distance of 60'.",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Run: from a maximum distance of 60'", criteria: "Maintain velocity; distinct lift of front leg and extension of back leg; rhythmic arm movement" },
    { number: "V1", kind: "value-increase", description: "In #1, show acceleration during the run to the hurdle", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Hurdle: lift knees upward while center of gravity remains level; feet extend forward to contact springboard in front of body", criteria: "Body at vertical upon springboard contact; arm swing from back to front" },
    { number: "V2", kind: "value-increase", description: "In #2, complete hurdle with feet in front of hips upon springboard contact", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "Front salto tucked: punch vertically off the springboard and complete a front salto tucked", criteria: "Arms reach upward above shoulders and forward; hands grasp legs in tight tuck" },
    { number: "V3", kind: "value-increase", description: "In #3, show distinct vertical rise from the springboard", bonusValue: 0.1 },
    { number: "4", kind: "element", description: "Landing", criteria: "Open to straight body prior to landing" },
  ],
};

const vtL5: CompulsoryRoutine = {
  level: 5,
  event: "VT",
  baseStartValue: 10.0,
  routineNotes: "Level 5 Vault — Forward Handspring. Run from maximum distance of 82' (25m).",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Run: from a maximum distance of 82' (25m)", criteria: "Maintain velocity; distinct lift of front leg; rhythmic arm movement" },
    { number: "V1", kind: "value-increase", description: "In #1, show acceleration during the run to the hurdle", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Hurdle: lift knees upward while center of gravity remains level; feet extend forward to springboard contact" },
    { number: "V2", kind: "value-increase", description: "In #2, complete hurdle with feet in front of hips upon springboard contact", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "First flight (pre-flight): rotate from the springboard to straight or tightly arched extension at vertical", criteria: "Rotate quickly to hand contact position on vault table slightly before vertical" },
    { number: "4", kind: "element", description: "Second flight (post-flight): block at vertical from vault table with straight body", criteria: "Straight body throughout" },
    { number: "V3", kind: "value-increase", description: "In #4, show distinct vertical rise off the vault table", bonusValue: 0.1 },
    { number: "5", kind: "element", description: "Landing" },
  ],
};

const vtL6: CompulsoryRoutine = {
  level: 6,
  event: "VT",
  baseStartValue: 10.0,
  routineNotes: "Level 6 Vault. Choice of Yamashita (base 9.7, max 10.0) or Handspring (base 9.2, max 9.5).",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "Run: from a maximum distance of 82' (25m)" },
    { number: "V1", kind: "value-increase", description: "In #1, show acceleration during the run to the hurdle", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Hurdle: lift knees upward while center of gravity remains level; feet extend forward to springboard contact" },
    { number: "V2", kind: "value-increase", description: "In #2, complete hurdle with feet in front of hips upon springboard contact", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "First flight (pre-flight): rotate from the springboard to straight or tightly arched extension at vertical" },
    { number: "4", kind: "element", description: "Second flight (post-flight): block at vertical from vault table with straight body" },
    { number: "V3", kind: "value-increase", description: "In #4, show distinct vertical rise off the vault table", bonusValue: 0.1 },
    { number: "5", kind: "element", description: "Landing" },
  ],
};

// ── PARALLEL BARS ────────────────────────────────────────────────────────────
// Transcribed from manual; structure preserved.

const pbL4: CompulsoryRoutine = {
  level: 4,
  event: "PB",
  baseStartValue: 10.0,
  routineNotes: "A hand-on-hand spot is permitted for any bail from support to a long hang swing. Springboard or additional mats may be used for mounting.",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From stand or short run, jump to long hang swing forward", criteria: "Long hang swing forward to 45° below horizontal" },
    { number: "2", kind: "element", description: "Long hang swing backward, long hang swing forward", criteria: "Straight legs required at peak of long hang swing backward" },
    { number: "3", kind: "element", description: "Long hang swing backward, uprise to upper arm hang", criteria: "Long hang swing backward to 45° below horizontal" },
    { number: "V1", kind: "value-increase", description: "In #3, perform long hang swing backward with hips at bar height", bonusValue: 0.1 },
    { number: "4", kind: "element", description: "Upper arm swing forward, upper arm swing backward", criteria: "Shoulders even with elbows" },
    { number: "V2", kind: "value-increase", description: "In #4, perform upper arm swing backward with hips at bar height", bonusValue: 0.1 },
    { number: "5", kind: "element", description: "Upper arm swing forward to straddled front uprise to support and immediately lift legs off bars", criteria: "Straight legs; finish with arms straight and hips extended" },
    { number: "SB1", kind: "specified-bonus", description: "Replace #5 with upper arm swing forward to forward uprise to support", bonusValue: 0.5, criteria: "Finish with straight body and straight arms; feet at bar height" },
    { number: "6", kind: "element", description: "Swing backward", criteria: "Swing backward with feet at bar height" },
    { number: "7", kind: "element", description: "Swing forward to \"L\" hold", criteria: "2 second hold of L; hips in line with or forward of hands" },
    { number: "SB2", kind: "specified-bonus", description: "Replace #7 with swing forward to \"V\" or Manna hold", bonusValue: 0.5, criteria: "2 second hold of V or Manna" },
    { number: "8", kind: "element", description: "From hold, extend forward to swing backward", criteria: "Swing backward with feet at bar height" },
    { number: "9", kind: "element", description: "Swing forward, swing backward", criteria: "Swing forward and backward to horizontal" },
    { number: "V3", kind: "value-increase", description: "In #9, perform swing backward to momentary hold of handstand", bonusValue: 0.1 },
    { number: "10", kind: "element", description: "Swing forward, swing backward to momentary hold of handstand and push off either side to stand", criteria: "Momentary hold; moving hand to dismount bar allowed" },
    { number: "SB3", kind: "specified-bonus", description: "Replace #10 with swing forward, swing backward to handstand hold and push off either side to stand", bonusValue: 0.5, criteria: "2 second hold of handstand" },
  ],
};

const pbL5: CompulsoryRoutine = {
  level: 5,
  event: "PB",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From stand or short run, jump to glide kip to support", criteria: "Glide kip with straight arms" },
    { number: "2", kind: "element", description: "Swing backward, swing forward", criteria: "Swing backward and forward to horizontal" },
    { number: "V1", kind: "value-increase", description: "In #2, perform swing backward to 45° above horizontal", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "Swing backward and bail to Moy finishing in upper arm support", criteria: "Swing backward to horizontal; hand-on-hand spot allowed" },
    { number: "V2", kind: "value-increase", description: "In #3, perform swing backward to 45° above horizontal", bonusValue: 0.1 },
    { number: "SB1A", kind: "specified-bonus", description: "Replace #3 with swing backward and bail to Moy to support, swing backward, layaway to upper arm support, upper arm swing forward", bonusValue: 0.5, exclusiveGroup: "SB1", notes: "Only one of SB 1A or 1B may receive bonus credit" },
    { number: "SB1B", kind: "specified-bonus", description: "Replace #3 with swing backward and bail to giant swing backward to support, swing forward, swing backward, layaway to upper arm support, upper arm swing forward", bonusValue: 0.5, exclusiveGroup: "SB1", notes: "Only one of SB 1A or 1B may receive bonus credit" },
    { number: "4", kind: "element", description: "Upper arm swing backward", criteria: "Shoulders even with elbows; hips at bar height" },
    { number: "5", kind: "element", description: "Upper arm swing forward to straddled front uprise to support and immediately lift legs off bars" },
    { number: "SB2", kind: "specified-bonus", description: "Replace #5 with upper arm swing forward to forward uprise to support", bonusValue: 0.5 },
    { number: "6", kind: "element", description: "Swing backward", criteria: "Feet at bar height" },
    { number: "7", kind: "element", description: "Swing forward to \"L\" hold, lift legs and extend forward and swing backward", criteria: "Hips in line with hands; 2 second hold of L" },
    { number: "SB3", kind: "specified-bonus", description: "Replace #7 with swing forward, swing backward to straddle L press to handstand hold", bonusValue: 0.5 },
    { number: "8", kind: "element", description: "Swing forward, swing backward" },
    { number: "V3", kind: "value-increase", description: "In #8, perform swing backward to momentary handstand hold", bonusValue: 0.1 },
    { number: "9", kind: "element", description: "Swing forward, swing backward", criteria: "Swing backward to 45° above horizontal" },
    { number: "10", kind: "element", description: "Swing forward to ½ turn and post on one arm over single bar and dismount to stand (Stützkehr forward movement)" },
  ],
};

const pbL6: CompulsoryRoutine = {
  level: 6,
  event: "PB",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From stand or short run, jump to glide kip to support", criteria: "Glide kip with straight arms" },
    { number: "V1", kind: "value-increase", description: "In #1, perform glide kip with hips at horizontal", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Swing backward, layaway to forward uprise to support", criteria: "Swing backward to horizontal; finish uprise with straight body and straight arms; feet at bar height" },
    { number: "V2", kind: "value-increase", description: "In #2, perform forward uprise to horizontal", bonusValue: 0.1 },
    { number: "3", kind: "element", description: "Swing backward, swing forward", criteria: "Swing backward and forward to horizontal" },
    { number: "4", kind: "element", description: "Swing backward and bail to Moy finishing in upper arm support", criteria: "Hand-on-hand spot allowed" },
    { number: "5", kind: "element", description: "Upper arm swing backward to backward uprise to support", criteria: "Finish with arms straight, feet at bar height" },
    { number: "SB1A", kind: "specified-bonus", description: "Replace #4 & #5 with swing backward and bail to Moy to support, swing backward", bonusValue: 0.5, exclusiveGroup: "SB1", notes: "Only one of SB 1A, 1B, 1C may receive credit" },
    { number: "SB1B", kind: "specified-bonus", description: "Replace #4 & #5 with swing backward and bail to giant swing backward to support", bonusValue: 0.5, exclusiveGroup: "SB1", notes: "Only one of SB 1A, 1B, 1C may receive credit" },
    { number: "SB1C", kind: "specified-bonus", description: "Replace #4 & #5 with swing backward and bail to basket (peach) to support", bonusValue: 0.5, exclusiveGroup: "SB1", notes: "Only one of SB 1A, 1B, 1C may receive credit" },
    { number: "6", kind: "element", description: "Swing forward to an \"L\" hold", criteria: "Hips in line with hands; 2 second hold of L" },
    { number: "SB2", kind: "specified-bonus", description: "Following #6 add press to handstand hold and replace #7 with swing forward and backward to horizontal", bonusValue: 0.5, criteria: "2 second hold of handstand" },
    { number: "7", kind: "element", description: "From \"L\", extend forward to swing backward to horizontal" },
    { number: "8", kind: "element", description: "Swing forward, swing backward to momentary hold of handstand", criteria: "Swing forward to horizontal; momentary hold of handstand" },
    { number: "V3", kind: "value-increase", description: "In #8, swing backward and perform a 2 second hold of handstand", bonusValue: 0.1 },
    { number: "SB3", kind: "specified-bonus", description: "Following #8, add swing forward, swing backward (or forward) to handstand and ½ pirouette", bonusValue: 0.5 },
    { number: "9", kind: "element", description: "Swing forward to salto backward dismount, OR swing forward, swing backward to salto forward dismount", criteria: "Salto may be tucked, piked or stretched; pike or layout front ½ allowed" },
  ],
};

// ── HORIZONTAL BAR ──────────────────────────────────────────────────────────

const hbL4: CompulsoryRoutine = {
  level: 4,
  event: "HB",
  baseStartValue: 10.0,
  routineNotes: "All under swings forward should be performed as tap swings.",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From hang in overgrip pullover to support", criteria: "Momentary stop in support is allowed" },
    { number: "2", kind: "element", description: "Cast to back hip circle to undershoot forward", criteria: "Cast to horizontal; back hip circle with straight body; undershoot with hollow body and straight arms" },
    { number: "V1", kind: "value-increase", description: "In #2, perform cast to 45° above horizontal", bonusValue: 0.1 },
    { number: "SB1", kind: "specified-bonus", description: "Replace #2 with cast to free hip circle to undershoot forward", bonusValue: 0.5, criteria: "Free hip with hollow body and hips clear of the bar" },
    { number: "3", kind: "element", description: "Swing backward, tap swing forward with ½ turn to mixed grip", criteria: "Swing backward and forward to 45° below horizontal; maintain hollow body during ½ turn" },
    { number: "4", kind: "element", description: "Tap swing forward, swing backward and change hand to double overgrip" },
    { number: "5", kind: "element", description: "Swing forward and kip to support", criteria: "Momentary stop in support is allowed", notes: "No extra swing allowed before kip" },
    { number: "6", kind: "element", description: "Cast to undershoot forward", criteria: "Cast to horizontal; undershoot with hollow body and straight arms" },
    { number: "SB2", kind: "specified-bonus", description: "Following #6, add swing backward, tap swing forward to swinging pullover (¾ giant swing backwards) to undershoot forward", bonusValue: 0.5, criteria: "Continuous rhythm; contact with bar allowed; bent arms allowed" },
    { number: "7", kind: "element", description: "Swing backward, tap swing forward", criteria: "Swing backward and forward to 45° below horizontal" },
    { number: "V2", kind: "value-increase", description: "In #7, perform swing backward or forward to horizontal", bonusValue: 0.1 },
    { number: "8", kind: "element", description: "Swing backward, tap swing forward" },
    { number: "V3", kind: "value-increase", description: "In #8, perform swing backward or forward to horizontal", bonusValue: 0.1 },
    { number: "9", kind: "element", description: "Swing backward to uprise and release hands dismounting to stand", criteria: "Shoulders at bar height" },
    { number: "SB3", kind: "specified-bonus", description: "Replace #9 with swing backward, tap swing forward to salto backward (flyaway) tucked, piked, or stretched dismount", bonusValue: 0.5, criteria: "Salto backward with hips at bar height", notes: "A spotter is required to follow, but not assist, the gymnast during the salto backward" },
  ],
};

const hbL5: CompulsoryRoutine = {
  level: 5,
  event: "HB",
  baseStartValue: 10.0,
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From hang in undergrip pullover to support", criteria: "Continuous rhythm" },
    { number: "2", kind: "element", description: "Cast forward to ¾ giant swing forward", criteria: "Cast to horizontal with full extension of body" },
    { number: "V1", kind: "value-increase", description: "In #2, perform cast to 45° above horizontal", bonusValue: 0.1 },
    { number: "SB1", kind: "specified-bonus", description: "Replace #2 with cast forward to one or more giant swings forward to ¾ giant swing forward", bonusValue: 0.5 },
    { number: "3", kind: "element", description: "Hop both hands simultaneously to double overgrip", criteria: "Hollow body" },
    { number: "4", kind: "element", description: "Tap swing forward in mixed grip, tap swing forward with ½ turn to mixed grip", criteria: "Maintain hollow body shape during ½ turn" },
    { number: "V2", kind: "value-increase", description: "In #4, perform blind turn at horizontal", bonusValue: 0.1 },
    { number: "5", kind: "element", description: "Swing backward in mixed grip, change hand to double overgrip" },
    { number: "6", kind: "element", description: "Swing forward, kip to support", criteria: "Momentary stop in support is allowed", notes: "No extra swing allowed before kip" },
    { number: "7", kind: "element", description: "Cast to ¾ giant swing backward (baby giant)", criteria: "Cast to horizontal" },
    { number: "SB2", kind: "specified-bonus", description: "Replace #7 with cast to free hip circle, swing forward to ¾ giant swing backward (baby giant)", bonusValue: 0.5, criteria: "Full extension of body at horizontal at completion of the free hip circle" },
    { number: "SB3", kind: "specified-bonus", description: "Replace #7 with cast to two giant swings backward and ¾ giant swing backward (baby giant)", bonusValue: 0.5, notes: "If both SB2 and SB3 are performed, replace #7 with cast to free hip + two giant swings backward + ¾ giant swing backward (+1.0)" },
    { number: "8", kind: "element", description: "Undershoot to swing backward (or undershoot to swing backward, tap swing forward, swing backward)", criteria: "Undershoot with hollow body and straight arms" },
    { number: "9", kind: "element", description: "Tap swing forward to salto backward (flyaway) tucked, piked or stretched dismount", criteria: "Salto backward with hips at bar height" },
    { number: "V3", kind: "value-increase", description: "In #9, salto backwards with hips above bar height", bonusValue: 0.1 },
  ],
};

const hbL6: CompulsoryRoutine = {
  level: 6,
  event: "HB",
  baseStartValue: 10.0,
  routineNotes: "Maximum of 5 forward and backward movements allowed prior to start of routine.",
  sourceNote: SOURCE,
  parts: [
    { number: "1", kind: "element", description: "From hang or small preliminary swing in overgrip, cast forward to a back uprise, free hip circle", criteria: "Back uprise to horizontal; free hip circle to 45° above horizontal" },
    { number: "V1", kind: "value-increase", description: "In #1, perform free hip circle to handstand", bonusValue: 0.1 },
    { number: "2", kind: "element", description: "Tap swing forward with ½ turn or hop ½ turn to both hands in overgrip", criteria: "½ turn or hop ½ turn to horizontal with hollow body" },
    { number: "3", kind: "element", description: "Tap swing forward to ¾ giant swing backward (baby giant), undershoot", criteria: "Undershoot with hollow body and straight arms" },
    { number: "4", kind: "element", description: "Swing backward, swing forward, kip to support, change both hands to undergrip", criteria: "Momentary stop in support is allowed", notes: "No extra swing allowed before kip" },
    { number: "5", kind: "element", description: "Cast forward to one or more giant swings forward" },
    { number: "SB1", kind: "specified-bonus", description: "Following #5, add Endo through handstand", bonusValue: 0.5 },
    { number: "6", kind: "element", description: "One or more forward giant swings to ½ pirouette" },
    { number: "V2", kind: "value-increase", description: "In #6, perform pirouette with no angle deduction", bonusValue: 0.1 },
    { number: "7", kind: "element", description: "One or more giant swings backward" },
    { number: "SB2", kind: "specified-bonus", description: "Following #7, add Stalder or 'Toe on – Toe off' through handstand. One or more giants allowed prior to #8", bonusValue: 0.5 },
    { number: "8", kind: "element", description: "¾ giant swing backward (baby giant), undershoot to swing backward", criteria: "Undershoot with hollow body and straight arms; swing backward to horizontal" },
    { number: "9", kind: "element", description: "Tap swing forward to salto backward (flyaway) tucked, piked or stretched dismount", criteria: "Salto backward with hips at bar height" },
    { number: "V3", kind: "value-increase", description: "In #9, perform salto backward with hips above bar height", bonusValue: 0.1 },
    { number: "SB3", kind: "specified-bonus", description: "Replace #8 and #9 with one or more giants backward with salto backward (flyaway) tucked, piked or stretched dismount", bonusValue: 0.5 },
  ],
};

// ── Lookup table ────────────────────────────────────────────────────────────

const ALL_ROUTINES: CompulsoryRoutine[] = [
  fxL4, fxL5, fxL6,
  phL4, phL5, phL6,
  srL4, srL5, srL6,
  vtL4, vtL5, vtL6,
  pbL4, pbL5, pbL6,
  hbL4, hbL5, hbL6,
];

export function getCompulsoryRoutine(
  level: 4 | 5 | 6,
  event: import("../types").GymEvent,
): CompulsoryRoutine | undefined {
  return ALL_ROUTINES.find((r) => r.level === level && r.event === event);
}
