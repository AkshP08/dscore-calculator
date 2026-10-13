// Smart, forgiving search for the skill catalog.
//
// Goals (see the search bar in SkillPicker):
//   1. Accent-insensitive — "stockli" finds "Stöckli", "gonzalez" finds "González".
//   2. Gymnastics-aware — natural phrasing maps to the Code's terse abbreviations:
//        "back full twist"      → salto bwd. straight with 1/1 t.
//        "double back"          → double salto bwd. ...
//        "front layout"         → salto fwd. straight ...
//        "one and a half twist" → ... with 3/2 t.
//   3. Order-independent & partial — tokens can appear in any order and match
//      as prefixes ("tsuk" → Tsukahara, "circ" → circle).
//
// The approach: reduce both the query and each skill's searchable text to a
// canonical token stream (accents stripped, fractions unified, synonyms folded),
// then require every query token to appear in the skill's canonical text.

import type { Skill } from "../codes/types";

// ── Character-level normalization ────────────────────────────────────────────

// Vulgar-fraction glyphs the Code uses (½, ¼, ¾, …) → ascii "n/d" form so they
// unify with the ascii fractions ("1/1", "3/2") that also appear in the tables.
const FRACTION_GLYPHS: Record<string, string> = {
  "½": "1/2", "⅓": "1/3", "⅔": "2/3", "¼": "1/4", "¾": "3/4",
  "⅕": "1/5", "⅖": "2/5", "⅗": "3/5", "⅘": "4/5", "⅙": "1/6",
  "⅚": "5/6", "⅛": "1/8", "⅜": "3/8", "⅝": "5/8", "⅞": "7/8",
};

// A few letters that do NOT decompose under Unicode NFD but still carry meaning.
const HARD_LETTERS: Record<string, string> = {
  ø: "o", Ø: "o", đ: "d", Đ: "d", ł: "l", Ł: "l", ß: "ss", ı: "i",
};

/** Lowercase, strip diacritics, unify fractions. Keeps digits, letters, and "/". */
function normalize(input: string): string {
  let s = input;
  for (const [glyph, ascii] of Object.entries(FRACTION_GLYPHS)) {
    s = s.split(glyph).join(ascii);
  }
  for (const [ch, repl] of Object.entries(HARD_LETTERS)) {
    s = s.split(ch).join(repl);
  }
  s = s.normalize("NFD").replace(/[̀-ͯ]/g, ""); // drop combining accents
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9/]+/g, " "); // punctuation → space, keep "/" for fractions
  return s.replace(/\s+/g, " ").trim();
}

// ── Gymnastics vocabulary ────────────────────────────────────────────────────

// Multi-word phrases collapsed BEFORE tokenizing. Longer phrases first so
// "double full" wins over "full". Values are canonical (already normalized).
const PHRASES: [RegExp, string][] = [
  [/\bone and a half\b/g, "3/2"],
  [/\btwo and a half\b/g, "5/2"],
  [/\bthree and a half\b/g, "7/2"],
  [/\bdouble full\b/g, "2/1"],
  [/\btriple full\b/g, "3/1"],
  [/\bfull (?:twist|turn|in)\b/g, "1/1"],
  [/\bhalf (?:twist|turn)\b/g, "1/2"],
  [/\bfull\b/g, "1/1"],
  [/\bhalf\b/g, "1/2"],
];

// Single-token synonyms → canonical token. Both sides are normalized already.
const SYNONYMS: Record<string, string> = {
  // direction
  back: "bwd", backward: "bwd", backwards: "bwd", bwd: "bwd",
  front: "fwd", forward: "fwd", forwards: "fwd", fwd: "fwd",
  side: "sideways", sideway: "sideways", sideways: "sideways", sidewards: "sideways",
  // shape
  straight: "straight", stretched: "straight", stretch: "straight",
  layout: "straight", lay: "straight", str: "straight",
  tuck: "tucked", tucked: "tucked",
  pike: "piked", piked: "piked",
  straddle: "straddled", straddled: "straddled", strad: "straddled",
  // rotation about the long axis — the Code writes this "t." (turn/twist)
  twist: "turn", twists: "turn", twisting: "turn",
  turn: "turn", turns: "turn", turning: "turn", t: "turn", tw: "turn", rotation: "turn",
  // somersault
  salto: "salto", saltos: "salto", salti: "salto",
  somersault: "salto", somersaults: "salto", somie: "salto", flip: "salto", flips: "salto",
  // multiples
  double: "double", dbl: "double", triple: "triple",
  // apparatus / positions
  handstand: "handstand", handstd: "handstand", hdst: "handstand", hstand: "handstand", hs: "handstand",
  handspring: "handspring", hdspr: "handspring", hspr: "handspring", hspring: "handspring",
  circle: "circle", circles: "circle",
  dismount: "dismount", dismounts: "dismount",
};

// Words that carry no search signal — dropped from queries.
const STOPWORDS = new Set(["with", "and", "to", "the", "or", "of", "an", "a"]);

/** Normalize + fold phrases + fold synonyms → array of canonical tokens. */
function canonicalTokens(input: string): string[] {
  let s = normalize(input);
  for (const [re, repl] of PHRASES) s = s.replace(re, repl);
  return s
    .split(" ")
    .filter(Boolean)
    .map((tok) => SYNONYMS[tok] ?? tok);
}

// ── Search index ─────────────────────────────────────────────────────────────

export interface SkillSearchEntry {
  skill: Skill;
  /** Accent-stripped, fraction-unified text (name + eponym + code + notes), no synonyms. */
  plain: string;
  /** Fully canonical token stream, space-joined, for token matching. */
  canon: string;
  nameNorm: string;
  eponymNorm: string;
  codeNorm: string;
}

/** Build a reusable search index for a catalog (memoize on the catalog). */
export function buildSearchIndex(catalog: Skill[]): SkillSearchEntry[] {
  return catalog.map((skill) => {
    const parts = [skill.name, skill.eponym ?? "", skill.codeIdentificationNumber, skill.notes ?? ""];
    return {
      skill,
      plain: normalize(parts.join(" ")),
      canon: canonicalTokens(parts.join(" ")).join(" "),
      nameNorm: normalize(skill.name),
      eponymNorm: normalize(skill.eponym ?? ""),
      codeNorm: normalize(skill.codeIdentificationNumber),
    };
  });
}

export interface ParsedQuery {
  raw: string;
  plain: string;
  tokens: string[];
}

export function parseQuery(query: string): ParsedQuery {
  const tokens = canonicalTokens(query).filter((t) => !STOPWORDS.has(t));
  return { raw: query, plain: normalize(query), tokens };
}

/**
 * Score a skill against a parsed query.
 * Returns 0 when the skill does not match; higher is a better match.
 * A skill matches only when EVERY query token appears in its canonical text
 * (order-independent, prefix-friendly).
 */
export function scoreEntry(entry: SkillSearchEntry, q: ParsedQuery): number {
  if (q.tokens.length === 0) return 1; // empty query → everything matches equally

  // Gate: all tokens must be present somewhere in the canonical text.
  for (const tok of q.tokens) {
    if (!entry.canon.includes(tok)) return 0;
  }

  let score = 1;

  // Strong signals: exact / prefix hits on the human-facing fields.
  if (entry.nameNorm === q.plain || entry.eponymNorm === q.plain || entry.codeNorm === q.plain) {
    score += 1000;
  } else {
    if (entry.eponymNorm && entry.eponymNorm.startsWith(q.plain)) score += 600;
    if (entry.nameNorm.startsWith(q.plain)) score += 400;
    if (entry.codeNorm.startsWith(q.plain)) score += 500;
    // Contiguous phrase hit anywhere (accent-insensitive).
    if (q.plain && entry.plain.includes(q.plain)) score += 200;
    if (q.plain && entry.eponymNorm.includes(q.plain)) score += 150;
  }

  // Per-token quality: whole-word hits beat mid-word substring hits.
  for (const tok of q.tokens) {
    const re = new RegExp(`(^| )${escapeRegExp(tok)}( |$)`);
    score += re.test(entry.canon) ? 12 : 3;
  }

  return score;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
