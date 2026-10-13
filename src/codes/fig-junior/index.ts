// FIG Junior Men's 2025–2028.
//
// Sources:
//   - FIG MAG 2025–2028 Code of Points (the same PDF for senior also
//     covers junior with embedded notes such as "Prohibited for juniors")
//     https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20Code%20of%20Points%202025-2028.pdf
//   - Article 9.4 (E-Jury deductions) and per-apparatus sections note which
//     skills are forbidden for juniors (e.g., certain saltos to hang on
//     rings, dismounts from side hang on one bar on PB, etc.)
//
// Junior scoring uses the same A–J difficulty scale, the same top-7+
// dismount counting, the same EG bonus structure (D+ → 0.5, A/B/C → 0.3,
// EG I always 0.5). What differs:
//   - On FX, the multi-salto requirement only mandates it be IN the
//     exercise, not specifically the dismount (per Section 10.2.2.3)
//   - Certain high-risk elements are prohibited for juniors (flagged
//     with a red dot in the FIG PDF). We surface these as warnings if
//     a routine includes them.
//
// Implementation: delegate to the FIG senior rules engine and catalog,
// then filter the FX-senior multi-salto-dismount warning and add a
// junior-prohibited-skill check.

import type { CodeOfPoints, GymEvent, Routine, ScoreBreakdown, Skill } from "../types";
import { fig2025 } from "../fig-2025";

export const FIG_JUNIOR_ID = "fig-junior";

/**
 * Skill IDs that the FIG 2025–2028 PDF explicitly marks with the red dot
 * "● Prohibited for juniors" legend. Verified page-by-page against the Code
 * of Points difficulty tables (see page references below). The markers appear
 * only on Rings and Parallel Bars; Floor, Pommel Horse, Vault and Horizontal
 * Bar carry no junior-prohibited elements in this cycle.
 *
 * The theme on both apparatus is high-risk salto-to-hang / salto-to-upper-arm
 * catch elements, which the FIG bars for the junior age group.
 */
const JUNIOR_PROHIBITED_SKILL_IDS = new Set<string>([
  // ── Rings (PDF p. 63) — double saltos bwd. to hang ────────────────────────
  "fig-2025:SR:I.21", // Tucked double salto bwd. to hang (Guczoghy)
  "fig-2025:SR:I.22", // Piked/straight double salto bwd. to hang

  // ── Parallel Bars EG I (PDF pp. 96–98) — saltos to upper-arm hang ─────────
  "fig-2025:PB:I.24", // Roll bwd. with salto bwd. tuck to upper arm hang (Dimitrenko)
  "fig-2025:PB:I.30", // Roll bwd. with salto bwd. pike to upper arm hang (Li Xiaopeng)
  "fig-2025:PB:I.34", // Roll bwd. ½ t. tuck to upper arm hang (Harada)
  "fig-2025:PB:I.51", // Bwd. uprise 5/4 salto fwd. tuck to upper arm hang (Yamawaki)
  "fig-2025:PB:I.54", // Bwd. uprise double salto fwd. tuck to upper arm hang
  "fig-2025:PB:I.59", // Bwd. uprise 5/4 salto fwd. straddled to upper arm hang (Pakhniuk 1)

  // ── Parallel Bars EG II (PDF pp. 100–103) — saltos to upper-arm hang ──────
  "fig-2025:PB:II.45", // Salto bwd. ½ t. to upper arm hang (Toumilovich)
  "fig-2025:PB:II.47", // Double salto fwd. tuck to upper arm hang (Morisue)
  "fig-2025:PB:II.48", // Double salto fwd. pike to upper arm hang (Huang Liping)
  "fig-2025:PB:II.52", // 3/2 salto bwd. ½ t. to upper arm hang (Suarez)
  "fig-2025:PB:II.54", // Double salto bwd. ½ t. to upper arm (Kuavita)
  "fig-2025:PB:II.104", // 5/4 salto fwd. tuck or pike to upper arm hang
  "fig-2025:PB:II.106", // 5/4 salto fwd. straddled to upper arm hang
  "fig-2025:PB:II.107", // 5/4 salto fwd. straddled to bent arm support
  "fig-2025:PB:II.113", // Double salto fwd. tuck to upper arm hang
  "fig-2025:PB:II.114", // Double salto fwd. pike to upper arm hang
  "fig-2025:PB:II.117", // 5/4 salto fwd. straight to upper arm hang
  "fig-2025:PB:II.119", // Salto fwd. with 1/1 t. to upper arm hang (Urzica)

  // ── Parallel Bars EG III (PDF pp. 104–109) — saltos to upper-arm hang ─────
  "fig-2025:PB:III.10", // Moy and salto fwd. tuck/pike/straddled to upper arm hang (Giraldo)
  "fig-2025:PB:III.50", // Giant swing bwd. straddled cut to upper arm hang
  "fig-2025:PB:III.52", // Giant swing bwd. straddle cut to support bent arms (Korolev)
  "fig-2025:PB:III.53", // Giant swing bwd. ½ t. straddled cut to upper arms (Sosa)
  "fig-2025:PB:III.59", // From giant bwd. double salto tuck to upper arm hang (Belle)
  "fig-2025:PB:III.60", // Belle pike to upper arm hang
  "fig-2025:PB:III.70", // Giant swing bwd. and salto ½ t. to upper arm hang (Matsunaga)
  "fig-2025:PB:III.72", // Giant swing bwd. ½ t. and 3/2 salto fwd. to upper arm hang (Tanaka)
  "fig-2025:PB:III.78", // Giant swing bwd. ½ t. and 3/2 salto fwd. piked to upper arm hang (Esparza)
  "fig-2025:PB:III.83", // Giant swing bwd. and salto ½ t. straight to upper arm hang (Fokin)
  "fig-2025:PB:III.122", // Felge roll bwd. tuck salto ½ t. to upper arm hang (Gagnon)
  "fig-2025:PB:III.123", // Felge roll bwd. straight salto ½ t. to upper arm hang (Gagnon 2)
  "fig-2025:PB:III.125", // Felge salto bwd. tuck to upper arm hang (Tejada)
  "fig-2025:PB:III.126", // Felge salto bwd. pike to upper arm hang (Juarez 1)
]);

function juniorWarnings(routine: Routine, allSkills: Skill[]): string[] {
  const warnings: string[] = [];

  // Surface any junior-prohibited skills the routine uses.
  for (const rs of routine.skills) {
    if (JUNIOR_PROHIBITED_SKILL_IDS.has(rs.skillId)) {
      const skill = allSkills.find((s) => s.id === rs.skillId);
      if (skill) {
        warnings.push(
          `${skill.codeIdentificationNumber} (${skill.name}) is prohibited for juniors.`,
        );
      }
    }
  }

  // Junior FX: multi-salto must appear in the routine but doesn't have to be
  // the dismount.
  if (routine.event === "FX") {
    const skills = routine.skills
      .map((rs) => allSkills.find((s) => s.id === rs.skillId))
      .filter(Boolean) as Skill[];
    const hasMultiSalto = skills.some((s) => s.flags?.isMultiSalto);
    if (!hasMultiSalto) {
      warnings.push(
        "Junior FX requires a multi-salto element anywhere in the routine (not necessarily the dismount).",
      );
    }
  }

  return warnings;
}

export const figJunior: CodeOfPoints = {
  id: FIG_JUNIOR_ID,
  name: "FIG Junior Men's 2025–2028",
  shortName: "FIG Junior",
  enabled: true,
  supportedEvents: ["FX", "PH", "SR", "VT", "PB", "HB"],

  getSkillCatalog(event: GymEvent) {
    return fig2025.getSkillCatalog(event);
  },

  calculateStartValue(routine: Routine, allSkills: Skill[]): ScoreBreakdown {
    const figBreakdown = fig2025.calculateStartValue(routine, allSkills);
    // Strip the senior "multi-salto must be the dismount" warning; juniors
    // get a more permissive multi-salto rule (warned separately below).
    const seniorMultiSaltoWarning =
      /Senior FX requires a multi-salto dismount/i;
    const filteredWarnings = figBreakdown.warnings.filter(
      (w) => !seniorMultiSaltoWarning.test(w),
    );
    return {
      ...figBreakdown,
      warnings: [...filteredWarnings, ...juniorWarnings(routine, allSkills)],
    };
  },
};
