---
name: D-Score Calculator
description: A dark, instrument-grade scoring console for men's artistic gymnastics
colors:
  # — Neutral backbone (slate) —
  canvas: "#020617"           # slate-950 — app background, darkest ground
  surface: "#0f172a"          # slate-900 — card/panel fill (usually at 40–80% alpha)
  surface-raised: "#1e293b"   # slate-800 — inputs, secondary buttons, hairline borders
  line: "#334155"             # slate-700 — strong borders, modal edges, dashed outlines
  text-faint: "#475569"       # slate-600 — disabled text, timestamps, lowest tier
  text-muted: "#64748b"       # slate-500 — captions, hints, de-emphasised mono labels
  text-secondary: "#94a3b8"   # slate-400 — eyebrow labels, secondary body
  text-bright: "#cbd5e1"      # slate-300 — emphasised body inside dense rows
  text-primary: "#f1f5f9"     # slate-100 — primary foreground, headings, values
  # — Primary signal (sky) —
  signal: "#38bdf8"           # sky-400 — primary interactive accent, focus rings, radial glow
  signal-bright: "#7dd3fc"    # sky-300 — active/hover accent text
  signal-pale: "#bae6fd"      # sky-200 — gradient-text terminus on hero numbers
  # — Semantic: positive (emerald) —
  positive: "#10b981"         # emerald-500 — progress fill, connection awarded
  positive-bright: "#34d399"  # emerald-400 — progress fill terminus
  positive-text: "#6ee7b7"    # emerald-300 — "+bonus" values, connected state
  positive-deep: "#047857"    # emerald-700 — primary Save button fill
  # — Semantic: warning (amber) —
  warning: "#f59e0b"          # amber-500 — compulsory accent, warning icons
  warning-text: "#fcd34d"     # amber-300 — "coming soon", warning headings
  # — Semantic: danger (rose) —
  danger: "#f43f5e"           # rose-500 — dismount tag, error borders
  danger-text: "#fda4af"      # rose-300 — delete-button text, error text
  danger-deep: "#881337"      # rose-900 — delete-button fill (at 60% alpha)
  # — Secondary accent (violet) —
  violet: "#8b5cf6"           # violet-500 — paired with signal in hero gradients; PB identity
  # — Element-group / cross-event hue (cyan) —
  cyan: "#06b6d4"             # cyan-500 — Element Group II; HB identity base
  # — Event identity accents (the 300-level "lit apparatus" colors) —
  event-fx: "#fcd34d"         # amber-300 — Floor Exercise
  event-ph: "#7dd3fc"         # sky-300 — Pommel Horse
  event-sr: "#fda4af"         # rose-300 — Still Rings
  event-vt: "#6ee7b7"         # emerald-300 — Vault
  event-pb: "#c4b5fd"         # violet-300 — Parallel Bars
  event-hb: "#67e8f9"         # cyan-300 — Horizontal Bar
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
    fontFeature: "tabular-nums"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  "2xl": "24px"
components:
  button-primary:
    backgroundColor: "{colors.positive-deep}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  button-primary-hover:
    backgroundColor: "{colors.positive}"
    textColor: "{colors.text-primary}"
  button-invert:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-bright}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  button-danger:
    backgroundColor: "{colors.danger-deep}"
    textColor: "{colors.danger-text}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  chip-filter-active:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
---

# Design System: D-Score Calculator

## Overview

**Creative North Star: "The Judge's Console"**

The North Star and the precise, instrument-grade character below are the design owner's
confirmed decision.

The D-Score Calculator is a dark, dense scoring instrument for people who already speak
gymnastics. It reads like a well-made judging console: a near-black slate ground, flat panels
layered by tone rather than shadow, and a single large tabular readout — the Start Value — that
is the hero of every screen. Everything is legible at a glance and citeable to the Code of
Points. Nothing is ornamental: the ground is flat slate with no gradient wash, and the hero
readout is solid high-contrast type — emphasis comes from size and weight, never from a gradient.

Color is rationed. The slate neutral ramp carries 90% of every screen, and the vivid hues earn
their place by *meaning* something: emerald is credit, amber is caution, rose is loss, sky is
the primary signal. The six events each own one identity color — a "lit apparatus" accent at the
300-level of its hue — and those colors appear only where event identity is the point (home
cards, the header nav, routine chips). The typographic signature is a terminal-style monospace
used for every label, code identification number, and numeric value: it makes the whole surface
feel measured and instrument-grade, and it visually separates *data* (mono) from *prose* (sans).

Density and speed outrank hand-holding. This is a tool for a fluent audience composing and
optimizing routines, often one-handed on a phone on the gym floor. The anti-reference is the
cheerful, rounded, pastel "fitness app": no soft gradients-as-decoration, no oversized friendly
illustration, no explaining what a connection is. Precision is the personality.

**Key Characteristics:**
- Near-black slate ground (#020617) with flat, tone-layered panels — depth without shadow.
- One hero metric per screen: the Start Value as a large, solid tabular-nums readout (instant
  update, brief sky highlight on change).
- A terminal-monospace label system that marks everything machine-readable (codes, values, groups).
- Color used only semantically or for event identity — never as decoration.
- Six event identity colors, each the 300-level of its hue, used sparingly as "channel" accents.

## Colors

A disciplined dark palette: a nine-step slate ramp does the structural work, four semantic hues
carry meaning, and six event accents carry identity. Alpha compositing (color at 10–60% over
slate) is the primary way surfaces and states are built, not solid fills.

### Primary
- **Signal Sky** (#38bdf8, sky-400): The one interactive accent. Focus rings, active Code-of-Points
  selection, the "Add skill" hover state, the home hero's primary CTA (sky-500), and the Start Value
  panel's background gradient. Used on a small fraction of any screen — that rarity is the point.
- **Signal Bright** (#7dd3fc, sky-300): Hover accent text and the brief highlight flash when the
  Start Value updates (sky-300 settling to slate-100). **Signal Pale** (#bae6fd, sky-200): held in
  reserve for pale gradient/gauge accents.

### Secondary
- **Violet** (#8b5cf6, violet-500): The partner to Signal in the Start Value panel's background
  gradient (`sky-600/15 → slate-900 → violet-700/15`). Also the Parallel Bars identity hue. Never
  used alone as an accent — it exists to give the hero panel depth.

### Tertiary
- **Cyan** (#06b6d4, cyan-500): Element Group II and the Horizontal Bar identity base. The one hue
  outside the sky/violet/semantic families, reserved for these two specific classification roles.

### Neutral
- **Canvas** (#020617, slate-950): The app ground. Everything sits on this.
- **Surface** (#0f172a, slate-900): Card and panel fill — almost always at 40–80% alpha so the
  flat canvas shows through.
- **Surface Raised** (#1e293b, slate-800): Inputs, secondary buttons, filter chips at rest,
  hairline borders on resting cards.
- **Line** (#334155, slate-700): Stronger borders — modal edges, dashed "Add" outlines, input strokes.
- **Text Primary** (#f1f5f9, slate-100): Headings, values, the foreground that must be read.
- **Text Bright** (#cbd5e1, slate-300) and **Secondary** (#94a3b8, slate-400): the readable tiers.
  slate-400 is the **contrast floor for all informational text** — body, eyebrow labels, captions,
  code numbers, timestamps (≥4.5:1 on slate-900/950).
- **Muted** (#64748b, slate-500) and **Faint** (#475569, slate-600): below 4.5:1, so reserved for
  **disabled and genuinely non-essential** affordances only — disabled pills, empty "—"
  placeholders, unselected-checkbox borders. They must never carry information.

### Semantic
- **Positive Emerald** (#10b981 fill / #6ee7b7 text, emerald-500/300): Credit. Element-group bonus
  values, awarded connections, the "connected" toggle, progress-bar fill, the Save action
  (#047857, emerald-700), success toasts.
- **Warning Amber** (#f59e0b / #fcd34d, amber-500/300): Caution and the compulsory-routine world.
  Warnings panel, "coming soon" tags, compulsory headers, Floor Exercise identity.
- **Danger Rose** (#f43f5e / #fda4af, rose-500/300): Loss and destruction. Delete button
  (#881337, rose-900, at 60% alpha), the DISMOUNT tag, unknown-skill and error rows.

### Event Identity
Each event owns the 300-level of one hue, used only where apparatus identity is the subject —
home event cards, header nav active state, routine chips. **FX** amber-300 (#fcd34d), **PH**
sky-300 (#7dd3fc), **SR** rose-300 (#fda4af), **VT** emerald-300 (#6ee7b7), **PB** violet-300
(#c4b5fd), **HB** cyan-300 (#67e8f9).

### Named Rules
**The Rationed Color Rule.** Slate carries the screen. A vivid hue appears only when it *means*
something — credit, caution, loss, signal, or which apparatus you're on. If a color is doing
decoration, remove it.

**The Alpha-Over-Slate Rule.** Build surfaces and states by compositing color over slate at low
alpha (`bg-sky-500/10`, `border-emerald-600/60`, `surface at /40`), not with solid fills. Solid,
fully-saturated fills are reserved for small badges, toasts, and the Save button.

**The Twelve-Grade Difficulty Scale.** Difficulty badges (A→J) run a fixed heat spectrum:
A slate → B blue → C emerald → D yellow → E orange → F red → G purple → H pink → I fuchsia →
J deep-fuchsia. This mapping is normative; never recolor a difficulty badge off this scale.

**The Readable-Text Rule.** All informational text is slate-400 or lighter (≥4.5:1 on slate).
slate-500/600 are reserved for disabled or non-essential affordances; never set a label, value,
caption, code, or timestamp in them.

## Typography

**Display / Body Font:** System sans stack (`ui-sans-serif, system-ui, -apple-system, "Segoe UI",
Roboto, "Helvetica Neue", Arial, sans-serif`) — no web font is loaded.
**Label / Data Font:** System monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco,
Consolas, monospace`), Tailwind's `font-mono`.

**Character:** The sans is invisible on purpose — fast, native, zero-latency, familiar. The
monospace does the identity work: it marks everything machine-readable and makes the interface
feel like an instrument panel. The division is strict and meaningful — **prose is sans, data is
mono** — so you can tell at a glance what is a label or a value versus what is a sentence.

### Hierarchy
- **Display** (700, `clamp(1.875rem, 5vw, 3rem)`, tracking-tight): The home hero, "Start Value
  Calculator," in solid `slate-100`. One per screen, paired with a one-line explainer and CTA.
- **Headline / Score** (700, 3.75rem `text-6xl`, line-height 1, tabular-nums): The Start Value
  readout — the hero metric. **Solid `text-primary` (#f1f5f9)**, no gradient; it updates instantly
  and flashes a brief sky highlight (`sv-flash`, 240ms) on change. The single most important
  element in the system.
- **Title** (600, 1.125rem `text-lg`, snug): Modal and component titles ("Add a skill", skill
  names in detail view, routine-name input).
- **Body** (400, 0.875rem `text-sm`): The default. Skill names, descriptions, row content.
- **Label** (500, 0.75rem and smaller `text-xs`/`[11px]`/`[10px]`, mono, tracking-wider, UPPERCASE):
  The eyebrow/gauge system — section headers, "ELEMENT GROUPS", "START VALUE", code identification
  numbers, stat labels. The most characteristic type in the product.

### Named Rules
**The Mono-Data Rule.** Every code identification number, difficulty value, Start Value, bonus
figure, and classification label is set in monospace with `tabular-nums` where it's numeric.
Prose and names stay sans. Never set a routine description or a sentence in mono, and never set a
score in the proportional sans.

**The Eyebrow Label Rule.** Section and group labels are small, uppercase, mono, `tracking-wider`,
and `text-slate-400`. They name a region without competing with its content.

## Layout

A centered single-column reading measure that widens by context: `max-w-5xl` for the home
dashboard and the skill picker, `max-w-6xl` for the builder workspace, `max-w-md` for focused
modals. Horizontal padding is a constant `px-4`; vertical rhythm is generous on the dashboard
(`py-10 md:py-16`) and tighter in the working builder (`py-6`).

The builder is the signature two-pane layout: a flexible routine-builder column beside a fixed
`md:w-96` score-breakdown rail (`flex flex-col md:flex-row gap-6`) that **stacks to a single
column below `md`** — the breakdown drops beneath the builder on a phone. Card grids are
responsive by count: event cards run 1 → 2 → 3 columns (`sm` / `lg`), the Code-of-Points picker
1 → 2 → 4, skill cards 1 → 2 → 3.

Spacing rhythm is Tailwind's 4px scale, used tightly: `gap-2`/`gap-3` between controls,
`space-y-1.5`/`space-y-2.5` in dense lists, `p-4`/`p-5` inside cards. The density is deliberate —
this is a reference tool used between turns, so more information per viewport is a feature.

**The Fixed-Rail Rule.** On desktop the Start Value breakdown is a fixed-width rail that never
reflows as the routine grows; the routine list absorbs all width change. On mobile it stacks
below, never into a cramped side-by-side.

## Elevation & Depth

**Flat by default; depth comes from tone, not shadow.** Surfaces are built by layering
translucent slate over the flat canvas (`surface at /40–/80`), so panels read as *lighter regions
of the same material* rather than cards floating above a plane. There is no resting shadow
anywhere in the system.

Shadows appear only in two situations: **overlay** (modals and toasts use `shadow-2xl`/`shadow-lg`
to separate from the page) and **response to intent** (cards lift on hover — `hover:-translate-y-1`
with `hover:shadow-xl hover:shadow-black/40`, skill cards with a tinted `hover:shadow-sky-900/20`).
A surface at rest is flat; a shadow means "this is on top" or "you're pointing at this."

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6)` — `shadow-2xl`): Modals and picker dialogs.
- **Hover Lift** (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.4)` — `shadow-xl shadow-black/40`): Event
  and skill cards on hover, paired with a −4px translate.
- **Toast** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3)` — `shadow-lg`): The floating toast pill.

### Named Rules
**The Flat-At-Rest Rule.** No surface carries a shadow at rest. Depth at rest is conveyed by tonal
layering (alpha slate over canvas). Shadow is reserved for overlays and hover/active response.

## Shapes

Soft-but-not-round rectangles. The radius scale climbs with surface size: small controls and
badges use `rounded`/`rounded-md` (4–6px), cards and panels use `rounded-lg`/`rounded-xl` (8–12px),
and fully-pill shapes (`rounded-full`) are reserved for toasts, filter chips, the header event
pills, and progress-bar tracks. Borders are near-universal and hairline — a 1px slate-800/700
stroke (often at alpha) outlines almost every surface, giving the flat panels their edge in the
absence of shadow.

Two recurring signature silhouettes: the **element-group stripe**, a 1.5px full-height rounded bar
in the group's color running down the left edge of each routine row; and the **gradient hero
panel**, a `rounded-xl` card washed with a `sky → slate → violet` diagonal gradient plus an inset
radial highlight, used wherever the Start Value is the subject.

**The Hairline-Border Rule.** Every panel gets a 1px border (slate-800 at rest, slate-700 for
emphasis, a semantic hue at alpha for state). Because the system is shadowless at rest, the border
*is* the edge — never ship a borderless card on the canvas.

## Components

### Buttons
- **Shape:** Gently rounded (4px, `rounded`). Compact padding (`6px 12px`, `px-3 py-1.5`), `text-sm`.
- **Primary (Save):** Emerald fill (`emerald-700` → hover `emerald-600`), white text. The one
  semantic-positive action button; disables to 40% opacity when there's nothing to save.
- **Invert (modal confirm / active filter chip):** Light fill (`slate-100` → hover white) with
  `slate-900` text — a bright inversion used for the primary action *inside* a modal and for the
  selected filter chip. High-contrast, unmistakable.
- **Secondary (New, Cancel, Custom):** `slate-800` → hover `slate-700`, `slate-200` text.
- **Danger (Delete):** `rose-900/60` → hover `rose-800`, `rose-100` text — muted, not alarming,
  until hovered.
- **Add (dashed):** Full-width dashed `slate-700` outline, `slate-400` text, hover shifts the
  border and text to Signal Sky with a `sky-500/5` fill wash. The "compose here" affordance.

### Chips
- **Event pill (header nav):** `rounded-md`, mono, the active event rendered in its identity
  `chip` color (`bg-{hue}-500/20 text-{hue}-200 border-{hue}-500/40` + inset ring); inactive events
  are `slate-800/60`; unsupported events are dimmed and non-interactive.
- **Filter chip (picker):** `rounded`, mono, `text-xs`; active = invert (`slate-100`/`slate-900`),
  inactive = `slate-800`/`slate-400`.

### Cards / Containers
- **Corner Style:** `rounded-xl` (12px) for panels, `rounded-lg` (8px) for list rows and dense cards.
- **Background:** `surface` (slate-900) at 40–80% alpha over the canvas; hero panels use the
  `sky/slate/violet` gradient.
- **Shadow Strategy:** Flat at rest (see Elevation). Interactive cards lift on hover.
- **Border:** Always present — `slate-800` hairline at rest, `white/10` on gradient hero panels,
  a semantic hue at alpha for stateful cards (`amber-700/40` warnings, `emerald-800/40` bonuses).
- **Internal Padding:** `p-4`/`p-5` (16–20px) for panels, `px-2 py-1.5` for dense rows.

### Inputs / Fields
- **Style:** `slate-800` fill, `slate-100` text, `slate-400` placeholder, `rounded`, no visible
  border at rest (the fill *is* the field).
- **Focus:** A single ring — `focus:ring-1 focus:ring-slate-500` on form inputs, `focus:ring-sky-500/50`
  on the inline routine-name field. No glow, no border color change beyond the ring.
- **Disabled:** 40% opacity with `cursor-not-allowed`.

### Navigation (Header)
- **Style:** A sticky, `backdrop-blur` bar — `slate-950/70` with `supports-[backdrop-filter]:bg-slate-950/50`
  — over a `slate-800/80` bottom border. Left: a gradient back-chip + "Start Value Calculator"
  title with the active code name beneath in `[11px] slate-400`. Right: the six event pills.
- **States:** Active event = its identity chip + inset ring; enabled = `slate-800/60` hover
  `slate-700/80`; disabled = `slate-900/40`, `slate-600`, non-interactive.
- **Mobile:** The title collapses to the back-chip alone so all six event pills fit at a 44px hit
  area (coarse pointers); pills drop their icon and shrink padding (`px-2 sm:px-3`), keeping the
  two-letter abbreviation.

### Signature: The Start Value Panel
The product's hero. A `rounded-xl` card with a diagonal `sky-600/15 → slate-900/80 → violet-700/15`
gradient and an inset `radial-gradient` highlight at 30%/20%. Inside: a mono uppercase
`tracking-[0.15em]` "START VALUE" eyebrow, then the score at `text-6xl` bold `tabular-nums` in
**solid `slate-100`** (no gradient), which updates instantly and flashes a brief sky highlight
(`sv-flash`, 240ms) on change, over a three-column breakdown of Difficulty / EG bonus / Connection.
The panel's background gradient and inset highlight remain; only the number is solid.

On phones (below `md`) the fixed rail is replaced by a **compact sticky bottom bar** carrying the
same solid SV readout plus a tiny `D · EG · CV` breakdown, pinned above the safe-area inset so the
live score stays glanceable without scrolling past the routine.

### EG Bonus Progress Bar
The thin fulfilment gauge under each element group in the score breakdown. A `h-1.5`
`rounded-full` track in `slate-800` holding a `rounded-full` fill that animates its width
(`transition-all duration-300`). Fulfilled groups fill with a left-to-right
`emerald-500 → emerald-400` gradient; unfulfilled groups show a flat `slate-700` nub. It reads as
an instrument gauge — the group's EG badge and its `+bonus` value sit on the row above it.

### Compulsory Part Rows
The read-only parts of a prescribed compulsory routine (USAG MDP), in two variants:
- **Required part (`PartRow`):** a flat `rounded-lg` row, `slate-900/60` on a `slate-800` border.
  A mono, bold, `slate-300` part number (`#1`, `#2`…) in a fixed `2.5rem` centered gutter; the
  description in sans `slate-100`; optional `criteria` in italic `slate-400`; optional `notes`
  prefixed with an amber `⚠`.
- **Bonus / Value-Increase part (`BonusRow`):** the same row as a **toggle button**. At rest it's
  `slate-900/60` / `slate-800`; when achieved it shifts to `emerald-900/30` on an `emerald-600/60`
  border with a filled `emerald-500` check square at the right. A mono eyebrow labels the kind —
  **amber** for "Specified Bonus", **sky** for "Value Increase" — above the description, with the
  `+value` shown in the number gutter (emerald when claimed, slate when not).

### Signature: Routine Row + Badges
Each routine skill is a row carrying (left→right): reorder controls (a desktop-only drag handle
plus up/down buttons that work under touch and keyboard, 44px on coarse pointers), the **EG stripe**
(1.5px color bar), the **Difficulty badge** (heat-scale fill, numeric value in mono), the skill
name (sans) with its code number (mono), and state tags (DISMOUNT in rose, "dropped" in slate).
Counting skills are full-opacity; dropped skills fall to 60%. The **EG badge**
(`EG I`…`EG V`, `bg-{hue}-600/30 text-{hue}-200 border`) and **Difficulty badge** are the two
atomic data chips reused across picker, builder, and detail views.

## Do's and Don'ts

### Do:
- **Do** keep slate as ~90% of every screen and let a vivid hue appear only when it carries
  meaning (credit = emerald, caution = amber, loss = rose, signal = sky, identity = event color).
- **Do** set all codes, values, and classification labels in monospace with `tabular-nums` for
  numbers; keep prose and names in the sans. Data is mono, prose is sans — always.
- **Do** build surfaces by compositing color over slate at low alpha (`/10`–`/60`), and give every
  panel a 1px border since the system is shadowless at rest.
- **Do** make the Start Value the single hero of any screen it appears on — large, tabular,
  gradient-clipped, animated on change.
- **Do** stack the builder's two panes to one column below `md`; the breakdown goes under the
  builder, never into a cramped phone-width split.

### Don't:
- **Don't** add resting shadows. Depth at rest is tonal layering; shadow means overlay or hover.
- **Don't** recolor a difficulty badge off the A→J heat scale, or restyle an event away from its
  assigned identity hue.
- **Don't** use color decoratively — no gradient-as-ornament beyond the established hero/radial
  washes, no colored surface that isn't signalling state or identity.
- **Don't** introduce a web font or set data in the proportional sans; the system/mono split is
  the typographic identity.
- **Don't** soften the product toward a friendly consumer-fitness look (pastel fills, big rounded
  illustrations, explanatory hand-holding). The audience is fluent; precision is the personality.
