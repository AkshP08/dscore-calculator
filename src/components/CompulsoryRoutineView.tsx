import { useState } from "react";
import type { CompulsoryPart, CompulsoryRoutine } from "../codes/types";

interface Props {
  routine: CompulsoryRoutine;
}

/**
 * Read-only viewer for a USAG MDP compulsory routine.
 *
 * Compulsory routines have:
 *   - Required parts (#1, #2, …) — the prescribed sequence
 *   - Specified Bonus parts (SB1, SB2, …) — substitutions worth +0.5 each
 *   - Value Increase parts (V1, V2, …) — execution-quality bonuses, +0.1 each
 *
 * The user toggles which SBs/Vs they hit cleanly; the displayed SV updates
 * accordingly. This is documentation + tracking, not a builder.
 */
export function CompulsoryRoutineView({ routine }: Props) {
  // Track which bonuses/value-increases the gymnast has claimed.
  const [achieved, setAchieved] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setAchieved((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const bonusTotal = routine.parts.reduce((sum, p) => {
    if (achieved.has(p.number) && p.bonusValue) return sum + p.bonusValue;
    return sum;
  }, 0);
  const liveSV = Math.round((routine.baseStartValue + bonusTotal) * 10) / 10;
  const maxPossibleSV =
    routine.baseStartValue +
    routine.parts.reduce((sum, p) => sum + (p.bonusValue ?? 0), 0);

  const required = routine.parts.filter((p) => p.kind === "element");
  const bonuses = routine.parts.filter(
    (p) => p.kind === "specified-bonus" || p.kind === "value-increase",
  );

  return (
    <section className="flex-1 min-w-0 space-y-4">
      <div className="rounded-xl border border-amber-700/30 bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-slate-900/60 p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
            Compulsory Routine
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Level {routine.level} · {routine.event}
          </span>
        </div>
        <p className="text-xs text-amber-100/80 mt-1.5 leading-snug">
          {routine.routineNotes ??
            "Perform the prescribed parts in order. Specified Bonuses and Value Increases earn extra credit if cleanly achieved."}
        </p>
        <p className="text-[10px] text-slate-500 mt-2 italic">
          Source: {routine.sourceNote}
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
          Required parts
        </h3>
        <ol className="space-y-2">
          {required.map((part) => (
            <li key={part.number}>
              <PartRow part={part} />
            </li>
          ))}
        </ol>
      </div>

      {bonuses.length > 0 && (
        <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/10 p-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-300 mb-1">
            Bonuses & Value Increases
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            Toggle each one you cleanly achieved. Total earned: <span className="text-emerald-300 font-mono font-bold">+{bonusTotal.toFixed(1)}</span> of {(maxPossibleSV - routine.baseStartValue).toFixed(1)} possible.
          </p>
          <ul className="space-y-2">
            {bonuses.map((part) => (
              <li key={part.number}>
                <BonusRow
                  part={part}
                  achieved={achieved.has(part.number)}
                  onToggle={() => toggle(part.number)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-sky-600/15 via-slate-900/80 to-violet-700/15 p-4">
        <div className="text-xs uppercase tracking-[0.15em] text-slate-400 font-mono">
          Current Start Value
        </div>
        <div className="flex items-baseline gap-3 mt-1">
          <div className="text-5xl font-bold tabular-nums bg-gradient-to-r from-slate-100 to-sky-200 bg-clip-text text-transparent">
            {liveSV.toFixed(1)}
          </div>
          <div className="text-xs text-slate-400">
            base {routine.baseStartValue.toFixed(1)} + bonuses {bonusTotal.toFixed(1)}
          </div>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          Maximum possible (all bonuses):{" "}
          <span className="font-mono">{maxPossibleSV.toFixed(1)}</span>
        </div>
      </div>
    </section>
  );
}

function PartRow({ part }: { part: CompulsoryPart }) {
  return (
    <div className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800">
      <span className="font-mono text-sm font-bold text-slate-300 min-w-[2.5rem] text-center pt-0.5">
        {part.number}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-100 leading-snug">{part.description}</p>
        {part.criteria && (
          <p className="text-xs text-slate-400 mt-1 italic">{part.criteria}</p>
        )}
        {part.notes && (
          <p className="text-[11px] text-amber-300/80 mt-1">⚠ {part.notes}</p>
        )}
      </div>
    </div>
  );
}

function BonusRow({
  part,
  achieved,
  onToggle,
}: {
  part: CompulsoryPart;
  achieved: boolean;
  onToggle: () => void;
}) {
  const isSb = part.kind === "specified-bonus";
  return (
    <button
      onClick={onToggle}
      className={[
        "w-full text-left flex items-start gap-3 px-3 py-2 rounded-lg border transition-colors",
        achieved
          ? "bg-emerald-900/30 border-emerald-600/60"
          : "bg-slate-900/60 border-slate-800 hover:border-slate-600",
      ].join(" ")}
    >
      <div className="flex flex-col items-center min-w-[2.5rem]">
        <span className="font-mono text-xs font-bold text-slate-300">{part.number}</span>
        <span
          className={`text-[10px] font-mono mt-0.5 ${achieved ? "text-emerald-300" : "text-slate-500"}`}
        >
          {part.bonusValue !== undefined ? `+${part.bonusValue.toFixed(1)}` : ""}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span
            className={`text-[10px] uppercase font-mono ${isSb ? "text-amber-300" : "text-sky-300"}`}
          >
            {isSb ? "Specified Bonus" : "Value Increase"}
          </span>
        </div>
        <p className="text-sm text-slate-100 leading-snug mt-0.5">{part.description}</p>
        {part.criteria && (
          <p className="text-xs text-slate-400 mt-1 italic">{part.criteria}</p>
        )}
        {part.notes && (
          <p className="text-[11px] text-amber-300/80 mt-1">⚠ {part.notes}</p>
        )}
      </div>
      <span
        className={`shrink-0 w-5 h-5 rounded border grid place-items-center text-xs ${achieved ? "bg-emerald-500 border-emerald-400 text-white" : "border-slate-600 text-slate-600"}`}
      >
        {achieved ? "✓" : ""}
      </span>
    </button>
  );
}
