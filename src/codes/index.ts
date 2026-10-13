// Registry of all available code-of-points modules.

import type { CodeOfPoints } from "./types";
import { fig2025 } from "./fig-2025";
import { ncaa } from "./ncaa";
import {
  usagDpL4, usagDpL5, usagDpL6,
  usagDpL7, usagDpL8, usagDpL9, usagDpL10,
} from "./usag-dp";
import { figJunior } from "./fig-junior";
import { jeTechL6, jeTechL8, jeTechL9, jeTechL10 } from "./usag-je-tech";

export const ALL_CODES: CodeOfPoints[] = [
  fig2025,
  ncaa,
  figJunior,
  // Optional MDP levels (highest first — closest to FIG senior)
  usagDpL10,
  usagDpL9,
  usagDpL8,
  usagDpL7,
  // Compulsory MDP levels (fixed routines)
  usagDpL6,
  usagDpL5,
  usagDpL4,
  // Junior Elite Tech Sequences (stubs — pending Technical Sequence Manual)
  jeTechL10,
  jeTechL9,
  jeTechL8,
  jeTechL6,
];

export function getCode(codeId: string): CodeOfPoints | undefined {
  return ALL_CODES.find((c) => c.id === codeId);
}
