import type { Skill } from "../codes/types";

/**
 * Resolve the best available diagram URL for a skill.
 *
 * Resolution order:
 *   1. explicit skill.imageUrl override (set programmatically)
 *   2. per-skill crop at /images/skills/<EVENT>/<code-with-dashes>.png
 *   3. full CoP page at /images/cop-pages/page-NNN.png (extracted from PDF)
 *
 * Callers may use the returned URL directly with <img>; if it 404s the next
 * fallback should be tried in the consumer (see SkillCard for the chain).
 */
export function resolveSkillImage(skill: Skill): string {
  if (skill.imageUrl) return skill.imageUrl;
  // For zoom views, jump straight to the page image as the most reliable.
  if (skill.pageRef !== undefined) {
    return `/images/cop-pages/page-${String(skill.pageRef).padStart(3, "0")}.png`;
  }
  const codeSlug = skill.codeIdentificationNumber.replace(/\./g, "-");
  return `/images/skills/${skill.event}/${codeSlug}.png`;
}

/**
 * Ordered fallback list for image resolution in the skill picker cards.
 */
export function skillImageSources(skill: Skill): string[] {
  const codeSlug = skill.codeIdentificationNumber.replace(/\./g, "-");
  return [
    skill.imageUrl,
    `/images/skills/${skill.event}/${codeSlug}.png`,
    skill.pageRef !== undefined
      ? `/images/cop-pages/page-${String(skill.pageRef).padStart(3, "0")}.png`
      : undefined,
  ].filter((s): s is string => !!s);
}
