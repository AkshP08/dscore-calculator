import { useEffect, useMemo, useState } from "react";
import type { GymEvent, Routine, Skill } from "./codes/types";
import { ALL_CODES, getCode } from "./codes";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { RoutineBuilder, newRoutineSkill } from "./components/RoutineBuilder";
import { SkillPicker } from "./components/SkillPicker";
import { CustomSkillForm } from "./components/CustomSkillForm";
import { ScoreBreakdownView, MobileScoreBar } from "./components/ScoreBreakdown";
import { CompulsoryRoutineView } from "./components/CompulsoryRoutineView";
import { useToast } from "./components/Toast";
import {
  loadCustomSkills,
  loadRoutines,
  saveCustomSkills,
  saveRoutines,
} from "./storage/routines";
import { uid } from "./lib/uid";

const DEFAULT_CODE = ALL_CODES[0]; // FIG 2025–2028 — only code with an implemented rules engine

type View = "home" | "build";

function makeEmptyRoutine(codeId: string, event: GymEvent): Routine {
  return {
    id: uid(),
    name: `Untitled ${event}`,
    codeId,
    event,
    skills: [],
    updatedAt: Date.now(),
  };
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [codeId, setCodeId] = useState<string>(DEFAULT_CODE.id);
  const code = useMemo(() => getCode(codeId) ?? DEFAULT_CODE, [codeId]);
  const [event, setEvent] = useState<GymEvent>("FX");
  const [routines, setRoutines] = useState<Routine[]>(() => loadRoutines());
  const [customSkills, setCustomSkills] = useState<Skill[]>(() => loadCustomSkills());
  const [currentRoutineId, setCurrentRoutineId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Routine>(() => makeEmptyRoutine(DEFAULT_CODE.id, "FX"));
  const [showPicker, setShowPicker] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const { notify } = useToast();

  useEffect(() => saveRoutines(routines), [routines]);
  useEffect(() => saveCustomSkills(customSkills), [customSkills]);

  const catalog = useMemo(() => {
    const base = code.getSkillCatalog(event);
    const customsForEvent = customSkills.filter((s) => s.event === event);
    return [...base, ...customsForEvent];
  }, [event, customSkills]);

  const breakdown = useMemo(
    () => code.calculateStartValue(draft, catalog),
    [draft, catalog],
  );

  const savedForEvent = useMemo(
    () => routines.filter((r) => r.event === event),
    [routines, event],
  );

  // For the home page: compute the SV of any routine (uses its own event's catalog,
  // which may include custom skills the user defined for that event).
  const computeStartValue = (r: Routine): number => {
    const base = code.getSkillCatalog(r.event);
    const customs = customSkills.filter((s) => s.event === r.event);
    return code.calculateStartValue(r, [...base, ...customs]).startValue;
  };

  const handleBuildEvent = (e: GymEvent) => {
    setEvent(e);
    setDraft(makeEmptyRoutine(code.id, e));
    setCurrentRoutineId(null);
    setView("build");
  };

  const handleLoadFromHome = (id: string) => {
    const r = routines.find((x) => x.id === id);
    if (!r) return;
    setEvent(r.event);
    setDraft(r);
    setCurrentRoutineId(id);
    setView("build");
  };

  const handleSelectEvent = (e: GymEvent) => {
    setEvent(e);
    setDraft(makeEmptyRoutine(code.id, e));
    setCurrentRoutineId(null);
  };

  const handlePickSkill = (skill: Skill) => {
    setDraft({
      ...draft,
      skills: [...draft.skills, newRoutineSkill(skill.id)],
      updatedAt: Date.now(),
    });
    setShowPicker(false);
    notify(`Added ${skill.name}`, "success");
  };

  const handleAddCustomSkill = (skill: Skill) => {
    setCustomSkills((prev) => [...prev, skill]);
    setShowCustomForm(false);
    setDraft((d) => ({
      ...d,
      skills: [...d.skills, newRoutineSkill(skill.id)],
      updatedAt: Date.now(),
    }));
    notify(`Custom skill "${skill.name}" added`, "success");
  };

  const handleSave = () => {
    if (!draft.name.trim()) return;
    const isUpdate = routines.some((r) => r.id === draft.id);
    setRoutines((prev) => {
      const idx = prev.findIndex((r) => r.id === draft.id);
      if (idx === -1) return [...prev, draft];
      const next = [...prev];
      next[idx] = draft;
      return next;
    });
    setCurrentRoutineId(draft.id);
    notify(isUpdate ? `Saved “${draft.name}”` : `Created “${draft.name}”`, "success");
  };

  const handleLoad = (id: string) => {
    const r = routines.find((x) => x.id === id);
    if (!r) return;
    setDraft(r);
    setCurrentRoutineId(id);
    notify(`Loaded “${r.name}”`, "info");
  };

  const handleNew = () => {
    setDraft(makeEmptyRoutine(code.id, event));
    setCurrentRoutineId(null);
  };

  const handleSelectCode = (id: string) => {
    const next = getCode(id);
    if (!next) return;
    if (!next.enabled) {
      notify(`${next.shortName} is not yet available — coming soon.`, "warning");
      return;
    }
    setCodeId(id);
    setDraft(makeEmptyRoutine(id, event));
    setCurrentRoutineId(null);
    notify(`Now using ${next.shortName}`, "info");
  };

  const handleDelete = () => {
    if (!currentRoutineId) return;
    if (!confirm("Delete this saved routine?")) return;
    const name = draft.name;
    setRoutines((prev) => prev.filter((r) => r.id !== currentRoutineId));
    handleNew();
    notify(`Deleted “${name}”`, "info");
  };

  const isDirty =
    currentRoutineId === null
      ? draft.skills.length > 0
      : JSON.stringify(routines.find((r) => r.id === currentRoutineId)) !== JSON.stringify(draft);

  if (view === "home") {
    return (
      <HomePage
        code={code}
        allCodes={ALL_CODES}
        routines={routines}
        computeStartValue={computeStartValue}
        onSelectCode={handleSelectCode}
        onBuildEvent={handleBuildEvent}
        onLoadRoutine={handleLoadFromHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header
        code={code}
        event={event}
        onSelectEvent={handleSelectEvent}
        onGoHome={() => setView("home")}
      />

      <main className="max-w-6xl mx-auto px-4 pt-6 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <button
            onClick={handleNew}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-sm"
          >
            New
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty || !draft.name.trim()}
            className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm text-white"
          >
            {currentRoutineId ? "Save" : "Save as new"}
          </button>
          {currentRoutineId && (
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 rounded bg-rose-900/60 hover:bg-rose-800 text-sm text-rose-100"
            >
              Delete
            </button>
          )}
          {savedForEvent.length > 0 && (
            <label className="ml-auto flex items-center gap-2 text-sm text-slate-400">
              Load:
              <select
                value={currentRoutineId ?? ""}
                onChange={(e) => (e.target.value ? handleLoad(e.target.value) : handleNew())}
                className="px-2 py-1 rounded bg-slate-800 text-slate-100 text-sm"
              >
                <option value="">— new —</option>
                {savedForEvent.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {code.isCompulsory && code.getCompulsoryRoutine ? (
          (() => {
            const compulsory = code.getCompulsoryRoutine(event);
            if (!compulsory) {
              return (
                <p className="text-slate-400 italic">
                  No compulsory routine defined for Level {code.shortName} {event}.
                </p>
              );
            }
            return <CompulsoryRoutineView routine={compulsory} />;
          })()
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6">
              <RoutineBuilder
                routine={draft}
                catalog={catalog}
                breakdown={breakdown}
                onUpdate={setDraft}
                onOpenPicker={() => setShowPicker(true)}
              />
              <ScoreBreakdownView event={event} breakdown={breakdown} catalog={catalog} />
            </div>
            <MobileScoreBar
              startValue={breakdown.startValue}
              detail={
                event === "VT" ? (
                  <span>D {breakdown.difficultyValue.toFixed(1)}</span>
                ) : (
                  <span>
                    D {breakdown.difficultyValue.toFixed(1)} · EG{" "}
                    {breakdown.elementGroupBonus.toFixed(1)} · CV{" "}
                    {breakdown.connectionValue.toFixed(1)}
                  </span>
                )
              }
            />
          </>
        )}
      </main>

      {showPicker && (
        <SkillPicker
          catalog={catalog}
          isVault={event === "VT"}
          onPick={handlePickSkill}
          onClose={() => setShowPicker(false)}
          onOpenCustom={() => {
            setShowPicker(false);
            setShowCustomForm(true);
          }}
        />
      )}

      {showCustomForm && (
        <CustomSkillForm
          codeId={code.id}
          event={event}
          onSave={handleAddCustomSkill}
          onCancel={() => setShowCustomForm(false)}
        />
      )}
    </div>
  );
}
