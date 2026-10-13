import type { CodeOfPoints, GymEvent, Routine } from "../codes/types";
import { EVENT_NAMES } from "../codes/types";
import { EventIcon } from "./EventIcons";

interface Props {
  code: CodeOfPoints;
  allCodes: CodeOfPoints[];
  routines: Routine[];
  computeStartValue: (routine: Routine) => number;
  onSelectCode: (codeId: string) => void;
  onBuildEvent: (event: GymEvent) => void;
  onLoadRoutine: (routineId: string) => void;
}

const ALL_EVENTS: GymEvent[] = ["FX", "PH", "SR", "VT", "PB", "HB"];

// Each event gets its own vivid colour. Used in: home cards, header active
// state, recent routine chips. Picked for contrast against slate-950.
const EVENT_THEME: Record<
  GymEvent,
  { bg: string; ring: string; text: string; chip: string }
> = {
  FX: {
    bg: "from-amber-500/30 via-amber-700/15 to-transparent",
    ring: "ring-amber-500/40 hover:ring-amber-400/80",
    text: "text-amber-300",
    chip: "bg-amber-500/20 text-amber-200 border-amber-500/40",
  },
  PH: {
    bg: "from-sky-500/30 via-sky-700/15 to-transparent",
    ring: "ring-sky-500/40 hover:ring-sky-400/80",
    text: "text-sky-300",
    chip: "bg-sky-500/20 text-sky-200 border-sky-500/40",
  },
  SR: {
    bg: "from-rose-500/30 via-rose-700/15 to-transparent",
    ring: "ring-rose-500/40 hover:ring-rose-400/80",
    text: "text-rose-300",
    chip: "bg-rose-500/20 text-rose-200 border-rose-500/40",
  },
  VT: {
    bg: "from-emerald-500/30 via-emerald-700/15 to-transparent",
    ring: "ring-emerald-500/40 hover:ring-emerald-400/80",
    text: "text-emerald-300",
    chip: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  },
  PB: {
    bg: "from-violet-500/30 via-violet-700/15 to-transparent",
    ring: "ring-violet-500/40 hover:ring-violet-400/80",
    text: "text-violet-300",
    chip: "bg-violet-500/20 text-violet-200 border-violet-500/40",
  },
  HB: {
    bg: "from-cyan-500/30 via-cyan-700/15 to-transparent",
    ring: "ring-cyan-500/40 hover:ring-cyan-400/80",
    text: "text-cyan-300",
    chip: "bg-cyan-500/20 text-cyan-200 border-cyan-500/40",
  },
};

export { EVENT_THEME };

export function HomePage({
  code,
  allCodes,
  routines,
  computeStartValue,
  onSelectCode,
  onBuildEvent,
  onLoadRoutine,
}: Props) {
  const routinesByEvent = new Map<GymEvent, Routine[]>();
  for (const e of ALL_EVENTS) routinesByEvent.set(e, []);
  for (const r of routines) routinesByEvent.get(r.event)?.push(r);

  const eventStats = ALL_EVENTS.map((e) => {
    const list = routinesByEvent.get(e) ?? [];
    const svs = list.map(computeStartValue);
    const best = svs.length > 0 ? Math.max(...svs) : undefined;
    return { event: e, count: list.length, best };
  });

  const recent = [...routines]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 8);

  const totalRoutines = routines.length;
  const allAroundBest = (() => {
    const bests = eventStats.map((s) => s.best);
    if (bests.some((b) => b === undefined)) return undefined;
    return bests.reduce<number>((sum, b) => sum + (b ?? 0), 0);
  })();

  return (
    <div className="min-h-screen text-slate-100">
      <main className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-100">
            Start Value Calculator
          </h1>
          <p className="text-slate-300 mt-2 text-sm max-w-xl leading-relaxed">
            Build a men's artistic gymnastics routine skill by skill and watch its
            D-score (start value) update live — for gymnasts and their coaches.
          </p>
          <div className="mt-5">
            {recent.length > 0 ? (
              <button
                onClick={() => onLoadRoutine(recent[0].id)}
                className="inline-flex items-center gap-2 max-w-full px-4 py-2.5 rounded-lg bg-sky-500 text-sky-950 font-semibold hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 transition-colors"
              >
                <span className="truncate">Resume: {recent[0].name}</span>
                <span aria-hidden className="shrink-0">→</span>
              </button>
            ) : (
              <button
                onClick={() => onBuildEvent(code.supportedEvents[0] ?? "FX")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 text-sky-950 font-semibold hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 transition-colors"
              >
                Build a routine <span aria-hidden>→</span>
              </button>
            )}
          </div>
        </header>

        {/* Code-of-Points picker */}
        <section className="mb-8">
          <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
            Code of Points
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {allCodes.map((c) => {
              const active = c.id === code.id;
              return (
                <button
                  key={c.id}
                  onClick={() => c.enabled && onSelectCode(c.id)}
                  disabled={!c.enabled}
                  className={[
                    "text-left p-3 rounded-lg border transition-all",
                    active
                      ? "border-sky-500/60 bg-sky-500/10 ring-1 ring-sky-500/30"
                      : c.enabled
                        ? "border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60"
                        : "border-slate-900 bg-slate-950/40 opacity-50 cursor-not-allowed",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${active ? "bg-sky-500 text-sky-950" : c.enabled ? "bg-slate-800 text-slate-300" : "bg-slate-900 text-slate-600"}`}
                    >
                      {c.shortName}
                    </span>
                    {!c.enabled && (
                      <span className="text-[10px] text-amber-400 italic">coming soon</span>
                    )}
                    {active && (
                      <span className="ml-auto text-[10px] font-mono text-sky-300">ACTIVE</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug line-clamp-2">{c.name}</p>
                </button>
              );
            })}
          </div>
        </section>

        {totalRoutines > 0 && (
          <section className="mb-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Stat label="Saved routines" value={totalRoutines.toString()} accent="sky" />
            <Stat
              label="Events covered"
              value={`${eventStats.filter((s) => s.count > 0).length} / 6`}
              accent="violet"
            />
            {allAroundBest !== undefined ? (
              <Stat
                label="Best all-around D"
                value={allAroundBest.toFixed(1)}
                hint="sum of best SV per event"
                accent="emerald"
              />
            ) : (
              <Stat
                label="Best all-around D"
                value="—"
                hint="save a routine for each event"
                accent="slate"
              />
            )}
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
            Build a routine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {eventStats.map(({ event, count, best }) => {
              const enabled = code.supportedEvents.includes(event);
              const theme = EVENT_THEME[event];
              return (
                <button
                  key={event}
                  onClick={() => enabled && onBuildEvent(event)}
                  disabled={!enabled}
                  className={[
                    "group relative text-left rounded-xl p-4 transition-all duration-200",
                    "bg-gradient-to-br border ring-1 ring-inset",
                    "before:absolute before:inset-0 before:rounded-xl before:bg-slate-950/40 before:-z-10",
                    enabled
                      ? `${theme.bg} ${theme.ring} border-white/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer`
                      : "from-slate-900 to-slate-950 border-slate-800 ring-slate-800 opacity-50 cursor-not-allowed",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold font-mono tracking-wider ${enabled ? theme.text : "text-slate-500"}`}>
                        {event}
                      </span>
                    </div>
                    <EventIcon
                      event={event}
                      className={`w-10 h-10 ${enabled ? theme.text : "text-slate-700"}`}
                    />
                  </div>
                  <div className="text-sm font-medium text-slate-100">
                    {EVENT_NAMES[event]}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {count === 0
                        ? "no routines yet"
                        : `${count} routine${count === 1 ? "" : "s"}`}
                    </span>
                    <span className="tabular-nums text-slate-300">
                      {best !== undefined
                        ? `best ${best.toFixed(1)}`
                        : enabled
                          ? "—"
                          : "coming soon"}
                    </span>
                  </div>
                  {enabled && (
                    <div className={`mt-3 text-xs font-medium ${theme.text} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
                      Build <span aria-hidden>→</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {recent.length > 0 && (
          <section>
            <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
              Recent routines
            </h2>
            <ul className="space-y-1.5">
              {recent.map((r) => {
                const theme = EVENT_THEME[r.event];
                return (
                  <li key={r.id}>
                    <button
                      onClick={() => onLoadRoutine(r.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60 transition-colors text-left"
                    >
                      <span className={`px-2 py-0.5 rounded-md border text-xs font-mono w-12 text-center ${theme.chip}`}>
                        {r.event}
                      </span>
                      <EventIcon event={r.event} className={`w-5 h-5 shrink-0 ${theme.text}`} />
                      <span className="flex-1 truncate text-sm">{r.name}</span>
                      <span className="text-xs text-slate-400 tabular-nums font-mono">
                        SV <span className="text-slate-100 font-semibold">{computeStartValue(r).toFixed(1)}</span>
                      </span>
                      <span className="text-xs text-slate-400 tabular-nums hidden sm:inline">
                        {formatRelative(r.updatedAt)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {totalRoutines === 0 && (
          <section className="mt-10 rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-6 text-center">
            <p className="text-slate-300">
              No saved routines yet. Pick an event above to build your first one.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Routines save when you click{" "}
              <span className="font-mono text-slate-300">Save as new</span>.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent: "sky" | "violet" | "emerald" | "slate";
}) {
  const accentClasses = {
    sky: "from-sky-500/15 border-sky-500/30",
    violet: "from-violet-500/15 border-violet-500/30",
    emerald: "from-emerald-500/15 border-emerald-500/30",
    slate: "from-slate-700/20 border-slate-700",
  }[accent];
  return (
    <div
      className={`rounded-lg border bg-gradient-to-br to-slate-900/40 px-3 py-2.5 ${accentClasses}`}
    >
      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
        {label}
      </div>
      <div className="text-xl font-bold tabular-nums text-slate-100">{value}</div>
      {hint && <div className="text-[10px] text-slate-400 mt-0.5">{hint}</div>}
    </div>
  );
}

function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
