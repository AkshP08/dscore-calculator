import { describe, expect, it } from "vitest";
import type { Skill } from "../codes/types";
import { buildSearchIndex, parseQuery, scoreEntry } from "./skill-search";

// A small fixture drawn from real FIG catalog entries.
const skill = (
  id: string,
  name: string,
  extra: Partial<Skill> = {},
): Skill => ({
  id,
  codeIdentificationNumber: id.split(":").pop() ?? id,
  codeId: "fig-2025",
  event: "FX",
  elementGroup: "III",
  name,
  difficulty: "C",
  pageRef: 1,
  ...extra,
});

const CATALOG: Skill[] = [
  skill("fig-2025:FX:IV.8", "Salto bwd. straight with 1/1 turn"),
  skill("fig-2025:FX:IV.9", "Salto bwd. straight with 3/2 or 2/1 turn"),
  skill("fig-2025:FX:III.3", "Double salto bwd. tucked"),
  skill("fig-2025:FX:II.14", "Salto fwd. straight, also with 1/2 turn"),
  skill("fig-2025:PH:II.38", "Direct Stöckli A (DSA) on the pommels", {
    event: "PH",
    codeIdentificationNumber: "II.38",
  }),
  skill("fig-2025:PH:II.68", "Reverse Stöckli 180° turn in one circle", {
    eponym: "Davtyan",
    event: "PH",
    codeIdentificationNumber: "II.68",
  }),
  skill("fig-2025:FX:IV.11", "Salto bwd. straight with 7/2 turn", { eponym: "González" }),
  skill("fig-2025:FX:III.4", "Salto bwd. with 1/1 t. and salto bwd.", { eponym: "Tsukahara" }),
];

const index = buildSearchIndex(CATALOG);

function search(query: string): Skill[] {
  const q = parseQuery(query);
  return index
    .map((e) => ({ skill: e.skill, score: scoreEntry(e, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.skill);
}

describe("skill-search", () => {
  it("understands 'back full twist' as bwd. 1/1 t.", () => {
    const names = search("back full twist").map((s) => s.name);
    expect(names[0]).toBe("Salto bwd. straight with 1/1 turn");
  });

  it("matches accented names without accents (stockli → Stöckli)", () => {
    const results = search("stockli");
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results.every((s) => s.name.includes("Stöckli"))).toBe(true);
  });

  it("matches accented eponyms without accents (gonzalez → González)", () => {
    const results = search("gonzalez");
    expect(results.map((s) => s.eponym)).toContain("González");
  });

  it("handles 'double back' → double salto bwd.", () => {
    expect(search("double back")[0].name).toBe("Double salto bwd. tucked");
  });

  it("is word-order independent ('twist full back')", () => {
    expect(search("twist full back").map((s) => s.name)).toContain(
      "Salto bwd. straight with 1/1 turn",
    );
  });

  it("expands 'one and a half twist' → 3/2", () => {
    expect(search("back one and a half twist")[0].name).toBe(
      "Salto bwd. straight with 3/2 or 2/1 turn",
    );
  });

  it("matches prefixes ('tsuk' → Tsukahara)", () => {
    expect(search("tsuk").map((s) => s.eponym)).toContain("Tsukahara");
  });

  it("still matches code ids (IV.8)", () => {
    expect(search("IV.8")[0].codeIdentificationNumber).toBe("IV.8");
  });

  it("returns nothing for gibberish", () => {
    expect(search("xyzzy qwerty")).toHaveLength(0);
  });

  it("requires all tokens to match (AND semantics)", () => {
    // 'front' matches the fwd. salto, but 'stockli' does not → no result.
    expect(search("front stockli")).toHaveLength(0);
  });
});
