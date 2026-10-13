import type { Skill } from "../codes/types";

// FIG's official rules page, opened on the Men's Artistic tab. FIG hosts the
// Code of Points there; this app links to it rather than serving any of it.
export const FIG_COP_URL = "https://www.gymnastics.sport/site/rules/#2";

// The MAG 2025–2028 Code of Points PDF as linked from that page, hosted by FIG.
// Byte-identical to the copy the catalogs' pageRef values were taken from, so
// `#page=N` lands on the skill's diagram page.
export const FIG_COP_PDF_URL =
  "https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20Code%20of%20Points%202025-2028.pdf";

/** Element reference as printed in the CoP tables, e.g. "FX I.12". */
export function elementRef(skill: Skill): string {
  return `${skill.event} ${skill.codeIdentificationNumber}`;
}

/**
 * Link to the skill's page in FIG's PDF, or to FIG's rules page when the skill
 * has no page reference (custom skills).
 */
export function copLink(skill: Skill): string {
  return skill.pageRef !== undefined ? `${FIG_COP_PDF_URL}#page=${skill.pageRef}` : FIG_COP_URL;
}
