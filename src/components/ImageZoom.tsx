// Full-screen zoom modal for skill diagrams. Triggered by clicking the diagram
// area on a skill card or routine entry.

import { useEffect } from "react";
import type { Skill } from "../codes/types";
import { EgBadge, DifficultyBadge } from "./Badges";

interface Props {
  skill: Skill;
  src: string;
  onClose: () => void;
}

export function ImageZoom({ skill, src, onClose }: Props) {
  // ESC to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/90 backdrop-blur-sm p-4 animate-fade"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-4 text-slate-300 hover:text-white text-2xl leading-none z-10"
      >
        ✕
      </button>

      <header
        className="flex items-center gap-3 max-w-3xl mx-auto w-full mb-3"
        onClick={(e) => e.stopPropagation()}
      >
        <EgBadge eg={skill.elementGroup} />
        <DifficultyBadge difficulty={skill.difficulty} numericValue={skill.numericValue} />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-slate-100 truncate">{skill.name}</h2>
          {skill.eponym && (
            <p className="text-sm italic text-slate-400">named after {skill.eponym}</p>
          )}
        </div>
        <span className="text-xs font-mono text-slate-500">
          {skill.codeIdentificationNumber}
          {skill.pageRef !== undefined && ` · CoP p.${skill.pageRef}`}
        </span>
      </header>

      <div
        className="flex-1 grid place-items-center overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={skill.name}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl bg-white"
        />
      </div>

      <p className="text-center text-xs text-slate-500 mt-3">Click anywhere or press Esc to close</p>
    </div>
  );
}
