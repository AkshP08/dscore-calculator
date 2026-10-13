import { useMemo, useState } from "react";
import type { Difficulty, ElementGroup, Skill } from "../codes/types";
import {
  ALL_DIFFICULTIES,
  ALL_ELEMENT_GROUPS,
  ALL_VAULT_GROUPS,
  DIFFICULTY_VALUES,
} from "../codes/types";
import { DifficultyBadge, EgBadge } from "./Badges";
import { ImageZoom } from "./ImageZoom";
import { resolveSkillImage, skillImageSources } from "../lib/skill-image";
import { buildSearchIndex, parseQuery, scoreEntry } from "../lib/skill-search";

interface Props {
  catalog: Skill[];
  isVault: boolean;
  onPick: (skill: Skill) => void;
  onClose: () => void;
  onOpenCustom: () => void;
}

export function SkillPicker({ catalog, isVault, onPick, onClose, onOpenCustom }: Props) {
  const [search, setSearch] = useState("");
  const [egFilter, setEgFilter] = useState<ElementGroup | null>(null);
  const [diffFilter, setDiffFilter] = useState<Difficulty | null>(null);
  const [zoomSkill, setZoomSkill] = useState<Skill | null>(null);

  const groups = isVault ? ALL_VAULT_GROUPS : ALL_ELEMENT_GROUPS;

  const availableDifficulties = useMemo(() => {
    const set = new Set<Difficulty>();
    for (const s of catalog) set.add(s.difficulty);
    return ALL_DIFFICULTIES.filter((d) => set.has(d));
  }, [catalog]);

  const searchIndex = useMemo(() => buildSearchIndex(catalog), [catalog]);

  const filtered = useMemo(() => {
    const q = parseQuery(search);
    const hasQuery = q.tokens.length > 0;
    const scored: { skill: Skill; score: number }[] = [];
    for (const entry of searchIndex) {
      const s = entry.skill;
      if (egFilter && s.elementGroup !== egFilter) continue;
      if (diffFilter && s.difficulty !== diffFilter) continue;
      const score = hasQuery ? scoreEntry(entry, q) : 1;
      if (score <= 0) continue;
      scored.push({ skill: s, score });
    }
    // With a query, rank best matches first; otherwise keep catalog order.
    if (hasQuery) scored.sort((a, b) => b.score - a.score);
    return scored.map((x) => x.skill);
  }, [searchIndex, search, egFilter, diffFilter]);

  const byEg = useMemo(() => {
    const m = new Map<ElementGroup, Skill[]>();
    for (const eg of groups) m.set(eg, []);
    for (const s of filtered) m.get(s.elementGroup)?.push(s);
    return m;
  }, [filtered, groups]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center gap-3 p-3 border-b border-slate-800">
          <h2 className="font-semibold text-slate-100">
            {isVault ? "Choose a vault" : "Add a skill"}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {filtered.length}/{catalog.length}
          </span>
          <button onClick={onClose} className="ml-auto text-slate-400 hover:text-slate-100 px-2">
            ✕
          </button>
        </header>

        <div className="p-3 border-b border-slate-800 space-y-2">
          <input
            autoFocus
            placeholder="Search — try 'back full twist', 'stockli', 'double back', III.41…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 rounded bg-slate-800 text-slate-100 placeholder-slate-500 outline-none focus:ring-1 focus:ring-slate-500"
          />
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-slate-500 font-mono mr-1">EG:</span>
            <FilterChip active={egFilter === null} onClick={() => setEgFilter(null)}>
              all
            </FilterChip>
            {groups.map((eg) => (
              <button
                key={eg}
                onClick={() => setEgFilter(egFilter === eg ? null : eg)}
                className={egFilter === eg ? "ring-1 ring-slate-100 rounded" : ""}
              >
                <EgBadge eg={eg} />
              </button>
            ))}
            <span className="text-xs text-slate-500 font-mono ml-3 mr-1">DV:</span>
            <FilterChip active={diffFilter === null} onClick={() => setDiffFilter(null)}>
              all
            </FilterChip>
            {availableDifficulties.map((d) => (
              <FilterChip
                key={d}
                active={diffFilter === d}
                onClick={() => setDiffFilter(diffFilter === d ? null : d)}
              >
                {d}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {groups.map((eg) => {
            const skills = byEg.get(eg) ?? [];
            if (skills.length === 0) return null;
            return (
              <section key={eg}>
                <div className="flex items-center gap-2 mb-3 sticky top-0 z-10 bg-slate-900/95 backdrop-blur py-1 -mx-1 px-1">
                  <EgBadge eg={eg} />
                  <h3 className="text-xs text-slate-400 font-mono uppercase">
                    {skills.length} skill{skills.length === 1 ? "" : "s"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skills.map((s) => (
                    <SkillCard
                      key={s.id}
                      skill={s}
                      onPick={onPick}
                      onZoom={() => setZoomSkill(s)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-slate-500 italic py-8">No skills match those filters.</p>
          )}
        </div>

        <footer className="p-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
          <button
            onClick={onOpenCustom}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            + Custom skill
          </button>
          <span className="self-center italic">
            Click a card to add · click the diagram to zoom.
          </span>
        </footer>
      </div>

      {zoomSkill && (
        <ImageZoom
          skill={zoomSkill}
          src={resolveSkillImage(zoomSkill)}
          onClose={() => setZoomSkill(null)}
        />
      )}
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2 py-0.5 rounded font-mono ${active ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
    >
      {children}
    </button>
  );
}

function SkillCard({
  skill,
  onPick,
  onZoom,
}: {
  skill: Skill;
  onPick: (s: Skill) => void;
  onZoom: () => void;
}) {
  const value = skill.numericValue ?? DIFFICULTY_VALUES[skill.difficulty];
  return (
    <div className="group flex flex-col rounded-lg border border-slate-800 bg-slate-900/80 hover:border-sky-500/60 hover:bg-slate-800/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-900/20 transition-all overflow-hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onZoom();
        }}
        className="block focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        title="Click to enlarge diagram"
        aria-label="Zoom diagram"
      >
        <DiagramArea skill={skill} />
      </button>
      <button
        onClick={() => onPick(skill)}
        className="text-left flex-1 flex flex-col"
      >
        <div className="flex items-center gap-1.5 px-3 pt-3">
          <EgBadge eg={skill.elementGroup} />
          <DifficultyBadge difficulty={skill.difficulty} numericValue={skill.numericValue} />
          <span className="ml-auto text-[11px] font-mono text-slate-500">
            {skill.codeIdentificationNumber}
          </span>
        </div>
        <div className="px-3 py-2 flex-1">
          <h4 className="text-sm font-medium leading-snug text-slate-100">{skill.name}</h4>
          {skill.eponym && (
            <p className="text-xs italic text-slate-400 mt-0.5">named after {skill.eponym}</p>
          )}
          {skill.notes && <p className="text-xs text-slate-500 mt-1">{skill.notes}</p>}
        </div>
        <footer className="px-3 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>value {value.toFixed(1)}</span>
          <span className="group-hover:text-sky-300 transition-colors">+ add to routine</span>
        </footer>
      </button>
    </div>
  );
}

function DiagramArea({ skill }: { skill: Skill }) {
  const sources = skillImageSources(skill);
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];
  const isPageFallback = src !== undefined && src.startsWith("/images/cop-pages/");

  return (
    <div className="aspect-[4/3] bg-slate-950 border-b border-slate-800 grid place-items-center relative overflow-hidden group/diagram">
      {src ? (
        <>
          <img
            src={src}
            alt={skill.name}
            loading="lazy"
            onError={() => setSourceIndex((i) => i + 1)}
            className="w-full h-full object-contain transition-transform duration-300 group-hover/diagram:scale-105"
          />
          {isPageFallback && (
            <span className="absolute bottom-1 right-1 text-[9px] font-mono text-slate-500 bg-slate-950/80 px-1 rounded">
              full page
            </span>
          )}
          <span className="absolute inset-0 grid place-items-center bg-black/0 group-hover/diagram:bg-black/40 transition-colors text-transparent group-hover/diagram:text-white text-xs font-medium pointer-events-none">
            <span className="bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-white/10">
              🔍 zoom
            </span>
          </span>
        </>
      ) : (
        <span className="text-3xl font-mono font-bold text-slate-800 select-none">
          {skill.codeIdentificationNumber}
        </span>
      )}
    </div>
  );
}
