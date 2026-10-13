// USA Gymnastics Junior Elite — Technical Sequences.
//
// Tech Sequences are similar to compulsory routines: a prescribed sequence
// of "boxes" (numbered groupings) with "Major Elements" (high-value
// required skills, highlighted purple in the manual) and supporting
// elements. JE athletes at Levels 6, 8, 9, and 10 must perform tech
// sequences on all 6 events to qualify for development nationals.
//
// Source status: the USA Gymnastics Technical Sequence Manual is a separate,
// annually-updated document sold through USAG (not the same as the
// Competition Manual). The 2021-2024 Junior Competition Manual confirms:
//   "Technical Sequences are divided into six exercises … the Technical
//    Sequence Manual is updated and published each year prior to the state
//    championships."
//
// What I have publicly:
//   - MDP Newsletter #4 (Feb 2025) includes box-wording clarifications for
//     specific tech sequences (Level 6E PH box 3/6, Level 8E/9E/10E FX
//     box 7, Level 10E PH boxes 6-7). These are clarifications, not full
//     enumerations.
//   - 2025 Directives PDF describes the box structure and "Major Elements"
//     concept but doesn't transcribe the sequences.
//
// Until the Technical Sequence Manual is supplied, the JE Tech Sequence
// codes here are stubs — they show in the picker so the user knows the
// app supports them in principle, but routine-building is gated.

import type { CodeOfPoints, ScoreBreakdown } from "../types";
import { ALL_ELEMENT_GROUPS } from "../types";

function makeStub(level: 6 | 8 | 9 | 10): CodeOfPoints {
  const label = level === 6 ? "Future Stars" : `Level ${level}`;
  const placeholder: ScoreBreakdown = {
    difficultyValue: 0,
    elementGroupBonus: 0,
    connectionValue: 0,
    startValue: 0,
    countingUids: [],
    droppedUids: [],
    elementGroups: ALL_ELEMENT_GROUPS.map((eg) => ({ elementGroup: eg, bonus: 0 })),
    connections: [],
    warnings: [
      `USAG JE ${label} Technical Sequences are not yet implemented. The official Technical Sequence Manual (sold separately by USA Gymnastics, updated annually) is required to enumerate the boxes, Major Elements, and required parts. Share the manual and I can transcribe it the same way I did for the Levels 4–6 compulsories.`,
    ],
  };

  return {
    id: `usag-je-tech-l${level}`,
    name: `USAG Junior Elite — ${label} Technical Sequences`,
    shortName: `JE Tech L${level}`,
    enabled: false, // not buildable; surfaces "coming soon" badge in picker
    supportedEvents: ["FX", "PH", "SR", "VT", "PB", "HB"],
    getSkillCatalog() {
      return [];
    },
    calculateStartValue() {
      return placeholder;
    },
  };
}

export const jeTechL6 = makeStub(6);
export const jeTechL8 = makeStub(8);
export const jeTechL9 = makeStub(9);
export const jeTechL10 = makeStub(10);
