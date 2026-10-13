import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ScoreBreakdown as SB, Skill, GymEvent } from "../codes/types";
import { ALL_ELEMENT_GROUPS } from "../codes/types";
import { EgBadge } from "./Badges";
import { EVENT_CONFIGS } from "../codes/fig-2025/event-configs";

interface Props {
  event: GymEvent;
  breakdown: SB;
  catalog: Skill[];
}

export function ScoreBreakdownView({ event, breakdown, catalog }: Props) {
  const isVault = event === "VT";
  const config = !isVault ? EVENT_CONFIGS[event] : undefined;
  const skillById = new Map(catalog.map((s) => [s.id, s] as const));

  // Animate the headline SV number on change.
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [breakdown.startValue]);

  return (
    <aside className="w-full md:w-96 shrink-0 space-y-3">
      {/* Headline SV card — flat slate per the Judge's Console North Star:
          emphasis comes from the readout's size and weight, not a gradient. */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
        <div className="text-xs uppercase tracking-[0.15em] text-slate-400 font-mono">
          Start Value
        </div>
        <div
          key={animKey}
          className="text-6xl font-bold tabular-nums text-slate-100 mt-1 animate-sv"
        >
          {breakdown.startValue.toFixed(1)}
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat label="Difficulty" value={breakdown.difficultyValue} tone="slate" />
          {!isVault && <Stat label="EG bonus" value={breakdown.elementGroupBonus} tone="emerald" />}
          {!isVault && <Stat label="Connection" value={breakdown.connectionValue} tone="sky" />}
        </dl>
      </div>

      {/* Element groups */}
      {!isVault && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-3">
            Element Groups
          </h3>
          <ul className="space-y-2.5">
            {ALL_ELEMENT_GROUPS.map((eg) => {
              const detail = breakdown.elementGroups.find((d) => d.elementGroup === eg);
              const bonus = detail?.bonus ?? 0;
              const fulfillingSkill = detail?.fulfilledBySkillId
                ? skillById.get(detail.fulfilledBySkillId)
                : undefined;
              const maxBonus = 0.5; // EG bonuses cap at 0.5 (D+ or EG-I)
              const pct = Math.min(100, (bonus / maxBonus) * 100);
              const filled = bonus > 0;
              return (
                <li key={eg}>
                  <div className="flex items-center gap-2 mb-1">
                    <EgBadge eg={eg} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-300 truncate">
                        {config?.egNames[eg]}
                      </div>
                    </div>
                    <div
                      className={`text-sm tabular-nums font-mono font-semibold ${filled ? "text-emerald-300" : "text-slate-600"}`}
                    >
                      {filled ? `+${bonus.toFixed(1)}` : "—"}
                    </div>
                  </div>
                  {/* Progress bar showing how full the EG bonus is. */}
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${filled ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-slate-700"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {fulfillingSkill && (
                    <div className="text-[11px] text-slate-400 truncate mt-1 ml-1">
                      <span className="font-mono text-slate-400">
                        {fulfillingSkill.codeIdentificationNumber}
                      </span>{" "}
                      {fulfillingSkill.name}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Connection value detail */}
      {!isVault && breakdown.connections.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">
            Connections
          </h3>
          <ul className="space-y-1.5 text-sm">
            {breakdown.connections.map((c, i) => {
              const from = skillById.get(c.fromSkillId);
              const to = skillById.get(c.toSkillId);
              const awarded = c.value > 0;
              return (
                <li
                  key={i}
                  className={`px-2 py-1 rounded-md ${awarded ? "bg-emerald-950/30 text-emerald-100" : "bg-slate-800/30 text-slate-400"}`}
                >
                  <div className="font-mono text-xs flex items-center gap-1">
                    <span>{from?.codeIdentificationNumber}</span>
                    <span className="text-slate-500">→</span>
                    <span>{to?.codeIdentificationNumber}</span>
                    <span className="ml-auto tabular-nums font-bold">
                      {awarded ? `+${c.value.toFixed(1)}` : "+0.0"}
                    </span>
                  </div>
                  {!awarded && c.reasons[0] && (
                    <div className="text-[11px] italic text-slate-400 mt-0.5">
                      {c.reasons[0]}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {breakdown.warnings.length > 0 && (
        <div className="rounded-xl border border-amber-700/40 bg-gradient-to-br from-amber-950/40 to-slate-900/60 p-4">
          <h3 className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-2 flex items-center gap-1.5">
            <span aria-hidden>⚠</span>
            <span>Warnings</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-amber-100/90">
            {breakdown.warnings.map((w, i) => (
              <li key={i} className="leading-relaxed">
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

/**
 * Compact sticky Start Value bar for phones (below md only). Keeps the live SV
 * glanceable between turns without scrolling past the whole routine — the
 * desktop breakdown rail is a fixed column, but on mobile it stacks underneath.
 * Solid high-contrast number, tabular-nums, no gradient; respects the home-bar
 * safe-area inset and never covers the last row (main carries matching padding).
 */
export function MobileScoreBar({
  startValue,
  detail,
}: {
  startValue: number;
  detail?: ReactNode;
}) {
  return (
    <div
      role="status"
      aria-label={`Start value ${startValue.toFixed(1)}`}
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/85 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-6xl mx-auto px-4 pt-2 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-mono shrink-0">
            Start Value
          </span>
          <span className="text-3xl font-bold tabular-nums text-slate-100 leading-none">
            {startValue.toFixed(1)}
          </span>
        </div>
        {detail && (
          <div className="text-right text-[11px] text-slate-400 font-mono tabular-nums shrink-0 leading-tight">
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "slate" | "emerald" | "sky";
}) {
  const toneColor = {
    slate: "text-slate-100",
    emerald: "text-emerald-300",
    sky: "text-sky-300",
  }[tone];
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
        {label}
      </div>
      <div className={`text-lg font-semibold tabular-nums ${toneColor}`}>
        +{value.toFixed(1)}
      </div>
    </div>
  );
}
