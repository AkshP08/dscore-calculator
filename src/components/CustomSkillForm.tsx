import { useState } from "react";
import type { Difficulty, ElementGroup, GymEvent, Skill } from "../codes/types";
import { ALL_DIFFICULTIES, ALL_ELEMENT_GROUPS, ALL_VAULT_GROUPS } from "../codes/types";
import { uid } from "../lib/uid";

interface Props {
  codeId: string;
  event: GymEvent;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
}

export function CustomSkillForm({ codeId, event, onSave, onCancel }: Props) {
  const [name, setName] = useState("");
  const [elementGroup, setElementGroup] = useState<ElementGroup>("I");
  const [difficulty, setDifficulty] = useState<Difficulty>("A");
  const [eponym, setEponym] = useState("");
  const [isMultiSalto, setIsMultiSalto] = useState(false);
  const [isBalanceOnOneLeg, setIsBalanceOnOneLeg] = useState(false);
  const [isStrengthElement, setIsStrengthElement] = useState(false);
  const [isCircleFlairRussian, setIsCircleFlairRussian] = useState(false);

  const isVault = event === "VT";
  const groups = isVault ? ALL_VAULT_GROUPS : ALL_ELEMENT_GROUPS;

  const handleSave = () => {
    if (!name.trim()) return;
    const id = `${codeId}:${event}:custom:${uid()}`;
    onSave({
      id,
      codeIdentificationNumber: `custom-${id.slice(-6)}`,
      codeId,
      event,
      elementGroup,
      name: name.trim(),
      eponym: eponym.trim() || undefined,
      difficulty,
      flags: {
        ...(isMultiSalto && { isMultiSalto }),
        ...(isBalanceOnOneLeg && { isBalanceOnOneLeg }),
        ...(isStrengthElement && { isStrengthElement }),
        ...(isCircleFlairRussian && { isCircleFlairRussian }),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-12" onClick={onCancel}>
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-semibold text-slate-100">Add custom skill</h2>

        <label className="block">
          <span className="text-xs text-slate-400">Name</span>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Triple twist"
            className="w-full mt-1 px-2 py-1 rounded bg-slate-800 text-slate-100 outline-none focus:ring-1 focus:ring-slate-500"
          />
        </label>

        <label className="block">
          <span className="text-xs text-slate-400">Eponym (optional)</span>
          <input
            value={eponym}
            onChange={(e) => setEponym(e.target.value)}
            placeholder="e.g. Smith"
            className="w-full mt-1 px-2 py-1 rounded bg-slate-800 text-slate-100 outline-none focus:ring-1 focus:ring-slate-500"
          />
        </label>

        <div className="flex gap-3">
          <label className="flex-1">
            <span className="text-xs text-slate-400">{isVault ? "Vault Group" : "Element Group"}</span>
            <select
              value={elementGroup}
              onChange={(e) => setElementGroup(e.target.value as ElementGroup)}
              className="w-full mt-1 px-2 py-1 rounded bg-slate-800 text-slate-100"
            >
              {groups.map((g) => (
                <option key={g} value={g}>EG {g}</option>
              ))}
            </select>
          </label>
          <label className="flex-1">
            <span className="text-xs text-slate-400">Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full mt-1 px-2 py-1 rounded bg-slate-800 text-slate-100"
            >
              {ALL_DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
        </div>

        {event === "FX" && (
          <fieldset className="space-y-1">
            <legend className="text-xs text-slate-400 mb-1">FX flags</legend>
            <Check label="Multi-salto (eligible as senior dismount)" value={isMultiSalto} onChange={setIsMultiSalto} />
            <Check label="Balance on one leg (fulfills FX requirement)" value={isBalanceOnOneLeg} onChange={setIsBalanceOnOneLeg} />
            <Check label="Strength element (FX special repetition)" value={isStrengthElement} onChange={setIsStrengthElement} />
            <Check label="Circle / flair / Russian (FX special repetition)" value={isCircleFlairRussian} onChange={setIsCircleFlairRussian} />
          </fieldset>
        )}

        <div className="flex gap-2 pt-2">
          <button onClick={onCancel} className="flex-1 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 px-3 py-1.5 rounded bg-slate-100 hover:bg-white text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add skill
          </button>
        </div>
      </div>
    </div>
  );
}

function Check({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-300">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
