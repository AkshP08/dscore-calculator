# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The app's author — a competitive men's artistic gymnast — plus the **WOGA men's gymnastics
team**: its gymnasts and coaches. Not a single-user tool. Assume full gymnastics literacy
across the whole audience (event abbreviations, element groups, connection value, and Code of
Points conventions need no explanation), but design for strangers to the *app* — a teammate
or coach opening it for the first time should get oriented without a walkthrough.

There are still **no accounts and no cross-user sharing**: each person uses the app on their
own device, with routines and custom skills persisted in that device's browser `localStorage`.
"Multi-user" means a shared audience, not shared data.

## Product Purpose

A men's artistic gymnastics **Start Value (D-score) calculator and routine builder**. The
gymnast composes a routine skill by skill and the app computes its start value in real time —
difficulty value of the counting elements, element-group bonuses, and connection value —
under a chosen Code of Points. It also presents fixed **compulsory routines** (and Junior
Elite technical sequences) for codes that prescribe rather than compose.

Success is a fast, trustworthy answer to "what does this routine score, and how do I raise
it?" without hand-calculating the Code of Points.

## Positioning

Multi-code from the ground up: one routine-building model spans **FIG 2025–2028 (senior),
FIG Junior, NCAA, and USAG Development Program** levels, switching the active Code of Points
without leaving the tool. The FIG 2025–2028 catalog is a complete transcription of the
official Code of Points across all six events, with each skill carrying its CoP element
identification number and source PDF page reference. This combination — a full, citeable CoP
catalog plus a live scoring engine across multiple codes — is the differentiator a generic
"gymnastics score app" would not truthfully claim.

## Operating Context

Men's artistic gymnastics, six events: Floor Exercise (FX), Pommel Horse (PH), Still Rings
(SR), Vault (VT), Parallel Bars (PB), Horizontal Bar (HB). Start value under FIG is the sum
of difficulty value (top counting elements + dismount), element-group bonuses (0.3/0.5 per
fulfilled group; vault uses 5 vault groups), and connection value (0 / 0.1 / 0.2 per eligible
connected pair). Vault is scored from a published numeric value table rather than the A–J
difficulty scale. Compulsory and tech-sequence codes instead prescribe fixed parts with
Specified Bonus (SB) and Value-Increase (V) credit.

Two usage situations carry equal weight:
- **Planning at a desk** — composing and optimizing a routine with time to think; favors the
  dense builder-plus-breakdown layout and drag-and-drop ordering.
- **Reference at the gym** — on a phone, between turns, looking up a skill's value or checking
  a connection, and making quick edits.

Mobile is a first-class target, not an afterthought: the phone experience must genuinely work
well on the gym floor, not merely fit on a small screen.

## Capabilities and Constraints

Confirmed, implemented:
- Routine builder: add skills from a per-event catalog, reorder (drag-and-drop), mark
  connections, save/load/delete named routines, and define **custom skills** per event.
- Live score breakdown: difficulty value, element-group bonuses, connection value, start
  value, plus counting/dropped elements and compositional warnings.
- Multiple Codes of Points registered: **FIG 2025–2028** and **FIG Junior** (junior differs
  from senior only by elements prohibited on SR and PB), **NCAA**, and **USAG Development
  Program** levels (4–10; lower levels are compulsory, upper levels composed). **USAG Junior
  Elite Tech Sequences** are stubbed and shown as "coming soon" (`enabled: false`), pending
  the Technical Sequence Manual.
- Home dashboard: per-event routine counts, best SV per event, best all-around (sum of best
  per event), recent routines.

Constraints / terminology:
- The full real-time **start-value engine is FIG's**; other codes rely on their own
  catalogs/compulsory data and may not yet implement equivalent live scoring logic.
- Persistence is browser `localStorage` only — no backend, no cross-device sync.
- Skill ids are `${codeId}:${event}:${codeIdentificationNumber}`.

Undecided product facts (confirmed to remain undecided — do not fabricate a decision, and do
not build any of these until decided):
- Whether NCAA / USAG / JE Tech get full scoring engines, or stay catalog/compulsory-only.
- Whether the product moves beyond D-score into E-score / deduction tracking.
- Whether routines become exportable/printable/shareable.

The product stays **FIG D-score / start value focused** for now. E-score, deduction tracking,
and export/sharing are explicitly **not** in scope and must not be added as unprompted
"improvements."

## Brand Commitments

- Name in use: **D-Score Calculator** (page title: "D-Score Calculator — Men's Gymnastics
  Difficulty Scoring"); the home screen heading is "Start Value Calculator".
- No logo, wordmark, or binding brand/voice constraints were established. Voice in current
  copy is plain, domain-fluent, and unceremonious.
- Deployed on Netlify (project `dscore-calculator-aksh`); source on GitHub
  (`AkshP08/dscore-calculator`). *(reference, not a design constraint)*

## Evidence on Hand

- The official **FIG 2025–2028 MAG Code of Points PDF** is in the repo and is the source of
  truth for the FIG catalog; FIG rules questions should be checked against it, not guessed.
- The FIG catalog is a **complete, audited transcription** of all six events.
- No testimonials, user counts, benchmarks, pricing, or third-party endorsements exist —
  future work must not invent any.

## Product Principles

1. **Correctness is the product.** A start value the user cannot trust is worse than none;
   scoring must follow the governing Code of Points exactly and show its work.
2. **Built for a fluent audience.** Favor density, precise terminology, and speed over
   hand-holding; do not dumb down gymnastics concepts.
3. **Multi-code is structural, not bolted on.** New codes extend one routine/scoring model
   rather than forking the product.
4. **Cite the source.** Skills reference their CoP element number and PDF page so the gymnast
   can verify against the official document.

## Accessibility & Inclusion

No formal standard was established. The practical requirement that follows from the confirmed
usage: the phone experience must be fully usable one-handed on the gym floor — readable at a
glance, with touch targets sized for quick taps between turns.
