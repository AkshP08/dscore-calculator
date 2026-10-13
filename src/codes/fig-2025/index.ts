import type { CodeOfPoints, GymEvent } from "../types";
import { calculateGenericStartValue } from "./rules";
import { calculateVaultStartValue } from "./rules-vault";
import { floorSkills } from "./skills/floor";
import { pommelHorseSkills } from "./skills/pommel-horse";
import { ringsSkills } from "./skills/rings";
import { vaultSkills } from "./skills/vault";
import { parallelBarsSkills } from "./skills/parallel-bars";
import { horizontalBarSkills } from "./skills/horizontal-bar";
import { FIG_2025_ID } from "./constants";

export { FIG_2025_ID };

export const fig2025: CodeOfPoints = {
  id: FIG_2025_ID,
  name: "FIG Men's Code of Points 2025–2028",
  shortName: "FIG 2025–2028",
  enabled: true,
  supportedEvents: ["FX", "PH", "SR", "VT", "PB", "HB"],

  getSkillCatalog(event: GymEvent) {
    switch (event) {
      case "FX":
        return floorSkills;
      case "PH":
        return pommelHorseSkills;
      case "SR":
        return ringsSkills;
      case "VT":
        return vaultSkills;
      case "PB":
        return parallelBarsSkills;
      case "HB":
        return horizontalBarSkills;
    }
  },

  calculateStartValue(routine, allSkills) {
    if (routine.event === "VT") {
      return calculateVaultStartValue(routine, allSkills);
    }
    return calculateGenericStartValue(routine, allSkills);
  },
};
