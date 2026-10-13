import { describe, it, expect } from "vitest";
import { getCompulsoryRoutine } from "./compulsory-routines";
import { liveSV, maxBonus, maxPossibleSV } from "../compulsory-scoring";
import type { GymEvent } from "../types";

const routine = (level: 4 | 5 | 6, event: GymEvent) => {
  const r = getCompulsoryRoutine(level, event);
  if (!r) throw new Error(`no routine for L${level} ${event}`);
  return r;
};

describe("compulsory exclusiveGroup scoring", () => {
  // The three routines carrying "only one of SB … may receive credit" clauses.
  describe("L6 PH (SB3A/SB3B — keep 1 of 2)", () => {
    const r = routine(6, "PH");
    it("max SV honors exclusivity: 11.8, not the flat-sum 12.3", () => {
      expect(maxBonus(r)).toBeCloseTo(1.8, 5);
      expect(maxPossibleSV(r)).toBeCloseTo(11.8, 5);
    });
    it("ticking BOTH siblings credits only one +0.5", () => {
      expect(liveSV(r, new Set(["SB3A", "SB3B"]))).toBeCloseTo(10.5, 5);
    });
    it("a sibling plus an independent bonus both count", () => {
      // SB1 (+0.5, no group) + one of SB3 group (+0.5) = +1.0
      expect(liveSV(r, new Set(["SB1", "SB3A", "SB3B"]))).toBeCloseTo(11.0, 5);
    });
  });

  describe("L5 PB (SB1A/SB1B — keep 1 of 2)", () => {
    const r = routine(5, "PB");
    it("max SV is 11.8, not 12.3", () => {
      expect(maxPossibleSV(r)).toBeCloseTo(11.8, 5);
    });
    it("ticking both siblings credits only one +0.5", () => {
      expect(liveSV(r, new Set(["SB1A", "SB1B"]))).toBeCloseTo(10.5, 5);
    });
  });

  describe("L6 PB (SB1A/SB1B/SB1C — keep 1 of 3)", () => {
    const r = routine(6, "PB");
    it("max SV is 11.8, not the flat-sum 12.8", () => {
      expect(maxPossibleSV(r)).toBeCloseTo(11.8, 5);
    });
    it("ticking all three siblings still credits only one +0.5", () => {
      expect(liveSV(r, new Set(["SB1A", "SB1B", "SB1C"]))).toBeCloseTo(10.5, 5);
    });
  });

  describe("unaffected routines are unchanged", () => {
    it("L6 FX: independent SBs all count — 11.8", () => {
      expect(maxPossibleSV(routine(6, "FX"))).toBeCloseTo(11.8, 5);
    });
    it("L5 HB: SB2 and SB3 are combinable (not exclusive) — both count", () => {
      const r = routine(5, "HB");
      expect(maxPossibleSV(r)).toBeCloseTo(11.8, 5);
      expect(liveSV(r, new Set(["SB2", "SB3"]))).toBeCloseTo(11.0, 5);
    });
    it("every bonus part in a non-grouped routine is summed flat", () => {
      const r = routine(4, "FX");
      // base 10 + SB1/2/3 (1.5) + V1/2/3 (0.3) = 11.8
      expect(maxPossibleSV(r)).toBeCloseTo(11.8, 5);
    });
  });

  describe("exclusiveGroup data integrity", () => {
    it("exactly the three known families carry exclusiveGroup", () => {
      const EVENTS: GymEvent[] = ["FX", "PH", "SR", "VT", "PB", "HB"];
      const families: string[] = [];
      for (const level of [4, 5, 6] as const) {
        for (const event of EVENTS) {
          const r = getCompulsoryRoutine(level, event);
          if (!r) continue;
          const groups = new Set(
            r.parts.filter((p) => p.exclusiveGroup).map((p) => p.exclusiveGroup),
          );
          for (const g of groups) families.push(`L${level}-${event}-${g}`);
        }
      }
      expect(families.sort()).toEqual(["L5-PB-SB1", "L6-PB-SB1", "L6-PH-SB3"]);
    });
  });
});
