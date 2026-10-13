import type { Difficulty, ElementGroup } from "../codes/types";
import { DIFFICULTY_VALUES } from "../codes/types";

const EG_COLOR: Record<ElementGroup, string> = {
  I: "bg-amber-600/30 text-amber-200 border-amber-600/50",
  II: "bg-cyan-600/30 text-cyan-200 border-cyan-600/50",
  III: "bg-violet-600/30 text-violet-200 border-violet-600/50",
  IV: "bg-rose-600/30 text-rose-200 border-rose-600/50",
  V: "bg-emerald-600/30 text-emerald-200 border-emerald-600/50",
};

const EG_STRIPE: Record<ElementGroup, string> = {
  I: "bg-amber-500",
  II: "bg-cyan-500",
  III: "bg-violet-500",
  IV: "bg-rose-500",
  V: "bg-emerald-500",
};

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  A: "bg-slate-700 text-slate-200",
  B: "bg-blue-700 text-blue-100",
  C: "bg-emerald-700 text-emerald-100",
  D: "bg-yellow-600 text-yellow-50",
  E: "bg-orange-600 text-orange-50",
  F: "bg-red-600 text-red-50",
  G: "bg-purple-600 text-purple-50",
  H: "bg-pink-600 text-pink-50",
  I: "bg-fuchsia-700 text-fuchsia-50",
  J: "bg-fuchsia-900 text-fuchsia-50",
};

export function EgBadge({ eg }: { eg: ElementGroup }) {
  return (
    <span className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-0.5 rounded text-xs font-mono border ${EG_COLOR[eg]}`}>
      EG&nbsp;{eg}
    </span>
  );
}

export function EgStripe({ eg }: { eg: ElementGroup }) {
  return <span className={`block w-1.5 self-stretch rounded-sm ${EG_STRIPE[eg]}`} />;
}

export function DifficultyBadge({
  difficulty,
  numericValue,
}: {
  difficulty: Difficulty;
  numericValue?: number;
}) {
  const value = numericValue ?? DIFFICULTY_VALUES[difficulty];
  return (
    <span className={`inline-flex flex-col items-center justify-center min-w-[2.75rem] px-2 py-0.5 rounded font-mono ${DIFFICULTY_COLOR[difficulty]}`}>
      <span className="text-base leading-none font-bold">
        {numericValue !== undefined ? numericValue.toFixed(1) : difficulty}
      </span>
      {numericValue === undefined && (
        <span className="text-[10px] leading-none opacity-80">{value.toFixed(1)}</span>
      )}
    </span>
  );
}
