// Scoring helpers for USAG MDP compulsory routines, shared by the viewer
// component and its unit tests.
//
// The one subtlety is `exclusiveGroup`: the source manual credits only the
// single highest-value member of a mutually-exclusive bonus family (e.g.
// "Only one of SB 3A or 3B may receive bonus credit"), even if the gymnast
// performs more than one. A flat sum over every bonusValue over-credits those
// routines, so all bonus totals must route through sumCompulsoryBonus.

import type { CompulsoryPart, CompulsoryRoutine } from "./types";

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Sum bonus credit for the parts where `isCredited` is true, honoring
 * exclusiveGroup: each group contributes only its single highest-value
 * credited member, not the sum of its members.
 */
export function sumCompulsoryBonus(
  parts: CompulsoryPart[],
  isCredited: (part: CompulsoryPart) => boolean,
): number {
  const groupMax = new Map<string, number>();
  let total = 0;
  for (const p of parts) {
    if (p.bonusValue === undefined || !isCredited(p)) continue;
    if (p.exclusiveGroup) {
      groupMax.set(
        p.exclusiveGroup,
        Math.max(groupMax.get(p.exclusiveGroup) ?? 0, p.bonusValue),
      );
    } else {
      total += p.bonusValue;
    }
  }
  for (const v of groupMax.values()) total += v;
  return round1(total);
}

/** Total bonus if every available bonus is achieved (exclusivity applied). */
export function maxBonus(routine: CompulsoryRoutine): number {
  return sumCompulsoryBonus(routine.parts, () => true);
}

/** Highest start value attainable: base + maxBonus. */
export function maxPossibleSV(routine: CompulsoryRoutine): number {
  return round1(routine.baseStartValue + maxBonus(routine));
}

/** Start value for the currently-achieved set of bonus part numbers. */
export function liveSV(routine: CompulsoryRoutine, achieved: Set<string>): number {
  return round1(
    routine.baseStartValue +
      sumCompulsoryBonus(routine.parts, (p) => achieved.has(p.number)),
  );
}
