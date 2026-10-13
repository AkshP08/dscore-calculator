import { describe, it, expect } from "vitest";
import { calculateGenericStartValue } from "./rules";
import { calculateVaultStartValue } from "./rules-vault";
import { floorSkills } from "./skills/floor";
import { ringsSkills } from "./skills/rings";
import { vaultSkills } from "./skills/vault";
import type { Routine, RoutineSkill } from "../types";

const routineSkill = (skillId: string, connectedToPrevious = false): RoutineSkill => ({
  uid: skillId, // deterministic uid in tests
  skillId,
  connectedToPrevious,
});

const makeRoutine = (event: Routine["event"], skillIds: string[], conns: number[] = []): Routine => ({
  id: "test",
  name: "test",
  codeId: "fig-2025",
  event,
  skills: skillIds.map((id, i) => routineSkill(id, conns.includes(i))),
  updatedAt: 0,
});

describe("FIG FX D-score", () => {
  it("returns zero for an empty routine", () => {
    const r = makeRoutine("FX", []);
    const sb = calculateGenericStartValue(r, floorSkills);
    expect(sb.startValue).toBe(0);
    expect(sb.warnings).toContain("Routine has no skills.");
  });

  it("counts top 7 + dismount when routine has more than 8 eligible skills", () => {
    // 9 skills mixed across EG I/II/III so the 4-per-EG cap doesn't trip.
    const r = makeRoutine("FX", [
      "fig-2025:FX:I.19", // A — handstand
      "fig-2025:FX:I.49", // A — walkover
      "fig-2025:FX:I.61", // A — balance on one leg (satisfies the requirement)
      "fig-2025:FX:II.1", // A — fwd handspring
      "fig-2025:FX:II.7", // A — dive roll
      "fig-2025:FX:II.13", // C — salto fwd tucked
      "fig-2025:FX:III.13", // A — back handspring
      "fig-2025:FX:III.1", // A — salto bwd tucked
      "fig-2025:FX:III.3", // D — dbl salto bwd t (dismount, multi-salto)
    ]);
    const sb = calculateGenericStartValue(r, floorSkills);
    // 8 counting picked from 9 → 1 dropped. Difficulty: 6A + 1C (II.13) + 1C
    // dismount (III.3 Dbl back t = C per PDF p.35) = 0.6 + 0.3 + 0.3 = 1.2.
    expect(sb.difficultyValue).toBe(1.2);
    expect(sb.droppedUids.length).toBe(1);
    expect(sb.countingUids.length).toBe(8);
  });

  it("enforces max 4 per element group inside the counting 8", () => {
    // 8 EG I skills + 1 EG III dismount → only 4 EG I count + dismount = 5 total.
    const r = makeRoutine("FX", [
      "fig-2025:FX:I.19", // A
      "fig-2025:FX:I.49", // A
      "fig-2025:FX:I.55", // A
      "fig-2025:FX:I.61", // A — balance
      "fig-2025:FX:I.67", // A
      "fig-2025:FX:I.73", // A
      "fig-2025:FX:I.79", // A
      "fig-2025:FX:I.109", // A
      "fig-2025:FX:III.3", // C dismount (Dbl back t)
    ]);
    const sb = calculateGenericStartValue(r, floorSkills);
    // 4 EG I × A + 1 EG III × C = 0.4 + 0.3 = 0.7.
    expect(sb.difficultyValue).toBe(0.7);
    expect(sb.countingUids.length).toBe(5);
    expect(sb.droppedUids.length).toBe(4);
  });

  it("awards connection value for D+ paired with D+", () => {
    // Round-off + back handspring + double back tucked + Liukin triple = silly test routine.
    // Use D+ skills connected: dbl bwd t (D) → Liukin (I) shouldn't earn CV because Liukin is the dismount and
    // the dbl bwd t is a non-dismount; but if both are counting, D+D=+0.2 hmm... but they would only count if both
    // were in the 8. Simpler test: III.41 (Dbl salto bwd str, E) connected to III.4 Tsukahara (D, dismount).
    const r = makeRoutine(
      "FX",
      [
        "fig-2025:FX:III.41", // E — dbl salto bwd str
        "fig-2025:FX:III.4", // D — Tsukahara (multi-salto dismount)
      ],
      [1], // connect skill index 1 to previous
    );
    const sb = calculateGenericStartValue(r, floorSkills);
    // CV: E (D+) + D (D+) = 0.2.
    expect(sb.connectionValue).toBeGreaterThan(0);
  });

  it("warns when balance-on-one-leg requirement is missing", () => {
    const r = makeRoutine("FX", [
      "fig-2025:FX:II.13", // C salto fwd
      "fig-2025:FX:III.3", // D dbl back tuck (dismount)
    ]);
    const sb = calculateGenericStartValue(r, floorSkills);
    expect(sb.warnings.some((w) => /balance element on one leg/i.test(w))).toBe(true);
  });

  it("EG I bonus is 0.5 even when fulfilled by an A-value skill (FX rule)", () => {
    const r = makeRoutine("FX", [
      "fig-2025:FX:I.19", // A handstand — fulfills EG I
      "fig-2025:FX:III.1", // A — dismount eligible
    ]);
    const sb = calculateGenericStartValue(r, floorSkills);
    const egI = sb.elementGroups.find((g) => g.elementGroup === "I");
    expect(egI?.bonus).toBe(0.5);
  });
});

describe("FIG SR D-score", () => {
  it("dismount EG bonus equals dismount's own value (Section 7.2.8)", () => {
    const r = makeRoutine("SR", [
      "fig-2025:SR:I.1", // A uprise fwd to support
      "fig-2025:SR:I.75", // C swing fwd to hdst (counts for the required swing-to-handstand)
      "fig-2025:SR:IV.36", // G — triple salto bwd tucked dismount
    ]);
    const sb = calculateGenericStartValue(r, ringsSkills);
    const egIV = sb.elementGroups.find((g) => g.elementGroup === "IV");
    // G dismount → 0.7 EG IV bonus on non-FX apparatus.
    expect(egIV?.bonus).toBe(0.7);
  });
});

describe("FIG Vault scoring", () => {
  it("uses the explicit numericValue from the vault table", () => {
    const r = makeRoutine("VT", ["fig-2025:VT:507"]); // Yurchenko t = 1.8
    const sb = calculateVaultStartValue(r, vaultSkills);
    expect(sb.startValue).toBe(1.8);
  });

  it("averages two vaults", () => {
    const r = makeRoutine("VT", ["fig-2025:VT:225", "fig-2025:VT:319"]); // Roche 4.8 + Yeo 4.8
    const sb = calculateVaultStartValue(r, vaultSkills);
    expect(sb.startValue).toBe(4.8);
  });

  it("warns if both vaults in a final pair share a vault group", () => {
    const r = makeRoutine("VT", ["fig-2025:VT:201", "fig-2025:VT:202"]); // both Group II
    const sb = calculateVaultStartValue(r, vaultSkills);
    expect(sb.warnings.some((w) => /different vault groups/i.test(w))).toBe(true);
  });
});
