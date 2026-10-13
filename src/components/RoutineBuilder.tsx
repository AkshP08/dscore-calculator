import { useMemo, useRef, useState } from "react";
import type { Routine, RoutineSkill, ScoreBreakdown, Skill } from "../codes/types";
import { DifficultyBadge, EgStripe } from "./Badges";
import { uid } from "../lib/uid";
import { SkillDetail } from "./SkillDetail";
import { useToast } from "./Toast";

interface Props {
  routine: Routine;
  catalog: Skill[];
  breakdown: ScoreBreakdown;
  onUpdate: (r: Routine) => void;
  onOpenPicker: () => void;
}

export function RoutineBuilder({
  routine,
  catalog,
  breakdown,
  onUpdate,
  onOpenPicker,
}: Props) {
  const skillById = useMemo(() => {
    const m = new Map<string, Skill>();
    for (const s of catalog) m.set(s.id, s);
    return m;
  }, [catalog]);

  const countingSet = new Set(breakdown.countingUids);
  const isVault = routine.event === "VT";
  const { notify } = useToast();

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [zoomSkill, setZoomSkill] = useState<Skill | null>(null);

  // Track the latest routine so an "Undo" tapped seconds after a remove
  // re-inserts into current state rather than a stale snapshot.
  const routineRef = useRef(routine);
  routineRef.current = routine;

  const updateSkills = (next: RoutineSkill[]) => {
    onUpdate({ ...routine, skills: next, updatedAt: Date.now() });
  };

  const remove = (index: number) => {
    const removed = routine.skills[index];
    const removedName = skillById.get(removed?.skillId ?? "")?.name;
    const routineId = routine.id;
    updateSkills(routine.skills.filter((_, i) => i !== index));
    notify(removedName ? `Removed ${removedName}` : "Removed skill", "info", {
      label: "Undo",
      onAction: () => {
        const cur = routineRef.current;
        if (cur.id !== routineId || !removed) return; // routine changed; don't cross-insert
        const next = [...cur.skills];
        next.splice(Math.min(index, next.length), 0, removed);
        onUpdate({ ...cur, skills: next, updatedAt: Date.now() });
      },
    });
  };

  const toggleConnection = (index: number) => {
    if (index === 0) return;
    updateSkills(
      routine.skills.map((rs, i) =>
        i === index ? { ...rs, connectedToPrevious: !rs.connectedToPrevious } : rs,
      ),
    );
  };

  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= routine.skills.length) return;
    const next = [...routine.skills];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    updateSkills(next);
  };

  return (
    <section className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <input
          value={routine.name}
          onChange={(e) => onUpdate({ ...routine, name: e.target.value })}
          placeholder="Routine name…"
          className="bg-transparent text-lg font-semibold tracking-tight outline-none focus:ring-1 focus:ring-sky-500/50 rounded px-1 -mx-1 max-w-xs"
        />
        <span className="text-xs text-slate-400">
          {routine.skills.length}&nbsp;skill{routine.skills.length === 1 ? "" : "s"}
        </span>
      </div>

      <ol className="space-y-1.5">
        {routine.skills.map((rs, i) => {
          const skill = skillById.get(rs.skillId);
          if (!skill) {
            return (
              <li
                key={rs.uid}
                className="flex items-center gap-2 px-3 py-2 rounded bg-rose-950/40 border border-rose-900/60 text-sm"
              >
                <span className="text-rose-200">Unknown skill: {rs.skillId}</span>
                <button
                  onClick={() => remove(i)}
                  className="ml-auto text-xs text-rose-300 hover:underline"
                >
                  remove
                </button>
              </li>
            );
          }
          const isCounting = countingSet.has(rs.uid);
          const isDismount = breakdown.dismountUid === rs.uid;
          const isDragging = dragIndex === i;
          const isDragOver = dragOverIndex === i && dragIndex !== i;

          return (
            <li key={rs.uid}>
              {!isVault && i > 0 && (
                <div className="ml-7 -my-1 pl-1 [@media(pointer:coarse)]:my-0">
                  <button
                    onClick={() => toggleConnection(i)}
                    aria-pressed={rs.connectedToPrevious}
                    className="group/conn inline-flex items-center [@media(pointer:coarse)]:min-h-[44px] focus-visible:outline-none"
                    title={
                      rs.connectedToPrevious
                        ? "Connected to previous (click to disconnect)"
                        : "Not connected (click to connect)"
                    }
                  >
                    <span
                      className={[
                        "text-[11px] font-mono px-2 py-0.5 rounded transition-colors group-focus-visible/conn:ring-1 group-focus-visible/conn:ring-sky-500/70",
                        rs.connectedToPrevious
                          ? "bg-emerald-700/40 text-emerald-200 border border-emerald-600/60"
                          : "bg-slate-800/60 text-slate-400 border border-slate-700 group-hover/conn:bg-slate-700 group-hover/conn:text-slate-200",
                      ].join(" ")}
                    >
                      {rs.connectedToPrevious ? "↪ connected" : "+ connect"}
                    </span>
                  </button>
                </div>
              )}
              <div
                draggable
                onDragStart={(e) => {
                  setDragIndex(i);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (dragOverIndex !== i) setDragOverIndex(i);
                }}
                onDragLeave={() => {
                  if (dragOverIndex === i) setDragOverIndex(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex !== null && dragIndex !== i) move(dragIndex, i);
                  setDragIndex(null);
                  setDragOverIndex(null);
                }}
                onDragEnd={() => {
                  setDragIndex(null);
                  setDragOverIndex(null);
                }}
                className={[
                  "flex items-stretch gap-2 px-2 py-1.5 rounded-lg border transition-colors",
                  isDragging ? "drag-ghost" : "",
                  isDragOver ? "drag-over" : "",
                  isCounting
                    ? "border-slate-700 bg-slate-900/80"
                    : "border-slate-800 bg-slate-900/40 opacity-60",
                ].join(" ")}
              >
                <div className="flex items-center self-stretch">
                  {/* Drag is a desktop (fine-pointer) affordance only — it never
                      fires under touch, so the up/down buttons are the real
                      reorder path for phones and keyboards. */}
                  <span
                    className="drag-handle hidden [@media(pointer:fine)]:flex items-center text-slate-500 hover:text-slate-300 select-none"
                    title="Drag to reorder"
                    aria-label="Drag handle"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <circle cx="9" cy="6" r="1.4" />
                      <circle cx="15" cy="6" r="1.4" />
                      <circle cx="9" cy="12" r="1.4" />
                      <circle cx="15" cy="12" r="1.4" />
                      <circle cx="9" cy="18" r="1.4" />
                      <circle cx="15" cy="18" r="1.4" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    aria-label={`Move ${skill.name} up`}
                    title="Move up"
                    className="grid place-items-center rounded text-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-w-[24px] [@media(pointer:coarse)]:min-w-[44px] [@media(pointer:coarse)]:min-h-[44px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/70"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 15l6-6 6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, i + 1)}
                    disabled={i === routine.skills.length - 1}
                    aria-label={`Move ${skill.name} down`}
                    title="Move down"
                    className="grid place-items-center rounded text-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-w-[24px] [@media(pointer:coarse)]:min-w-[44px] [@media(pointer:coarse)]:min-h-[44px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/70"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <EgStripe eg={skill.elementGroup} />
                <DifficultyBadge
                  difficulty={skill.difficulty}
                  numericValue={skill.numericValue}
                />
                <button
                  onClick={() => setZoomSkill(skill)}
                  className="flex-1 min-w-0 text-left hover:bg-slate-800/40 rounded px-1 -mx-1 transition-colors"
                  title="View skill details"
                >
                  <div className="text-sm leading-tight text-slate-100 truncate">
                    {skill.name}
                    {skill.eponym && (
                      <span className="text-slate-400 italic"> · {skill.eponym}</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {skill.codeIdentificationNumber}
                    {isDismount && (
                      <span className="ml-2 inline-block px-1.5 rounded bg-rose-700/40 text-rose-200">
                        DISMOUNT
                      </span>
                    )}
                    {!isCounting && (
                      <span className="ml-2 inline-block px-1.5 rounded bg-slate-800 text-slate-400">
                        dropped
                      </span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => remove(i)}
                  className="grid place-items-center self-stretch rounded text-slate-500 hover:text-rose-300 transition-colors min-w-[28px] [@media(pointer:coarse)]:min-w-[44px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500/60"
                  title="Remove skill"
                  aria-label={`Remove ${skill.name}`}
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <button
        onClick={onOpenPicker}
        className="mt-3 w-full py-2.5 rounded-lg border border-dashed border-slate-700 text-slate-400 hover:border-sky-500/60 hover:text-sky-300 hover:bg-sky-500/5 transition-colors font-medium"
      >
        + Add skill
      </button>

      {zoomSkill && (
        <SkillDetail
          skill={zoomSkill}
          onClose={() => setZoomSkill(null)}
        />
      )}
    </section>
  );
}

export function newRoutineSkill(skillId: string): RoutineSkill {
  return { uid: uid(), skillId, connectedToPrevious: false };
}
