// Full-screen text detail modal for a skill. Triggered by clicking a skill in
// the routine list.

import { useEffect } from "react";
import type { Skill } from "../codes/types";
import { DIFFICULTY_VALUES } from "../codes/types";
import { EgBadge, DifficultyBadge } from "./Badges";
import { copLink, elementRef } from "../lib/fig-links";

interface Props {
  skill: Skill;
  onClose: () => void;
}

export function SkillDetail({ skill, onClose }: Props) {
  // ESC to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const value = skill.numericValue ?? DIFFICULTY_VALUES[skill.difficulty];

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/80 backdrop-blur-sm p-4 animate-fade"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-4 text-slate-400 hover:text-white text-xl leading-none"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-3 pr-8">
          <EgBadge eg={skill.elementGroup} />
          <DifficultyBadge difficulty={skill.difficulty} numericValue={skill.numericValue} />
          <span className="text-xs font-mono text-slate-400">
            {elementRef(skill)}
            {skill.pageRef !== undefined && ` · CoP p. ${skill.pageRef}`}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-slate-100 leading-snug">{skill.name}</h2>
        {skill.eponym && (
          <p className="text-sm italic text-slate-400">named after {skill.eponym}</p>
        )}

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Element group</dt>
            <dd className="text-slate-100">{skill.elementGroup}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Difficulty value</dt>
            <dd className="text-slate-100">
              {skill.numericValue === undefined && `${skill.difficulty} · `}
              {value.toFixed(1)}
            </dd>
          </div>
        </dl>
        {skill.notes && <p className="mt-3 text-xs text-slate-400">{skill.notes}</p>}

        <a
          href={copLink(skill)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2"
        >
          Official FIG Code of Points{skill.pageRef !== undefined && ` · CoP p. ${skill.pageRef}`} ↗
        </a>
      </div>
    </div>
  );
}
