import type { CodeOfPoints, GymEvent } from "../codes/types";
import { EVENT_NAMES } from "../codes/types";
import { EventIcon } from "./EventIcons";
import { EVENT_THEME } from "./HomePage";

interface Props {
  code: CodeOfPoints;
  event: GymEvent;
  onSelectEvent: (e: GymEvent) => void;
  onGoHome: () => void;
}

const ALL_EVENTS: GymEvent[] = ["FX", "PH", "SR", "VT", "PB", "HB"];

export function Header({ code, event, onSelectEvent, onGoHome }: Props) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <button
          onClick={onGoHome}
          className="text-left hover:opacity-80 transition-opacity flex items-center gap-2"
          title="Back to home"
        >
          <span
            aria-hidden
            className="w-7 h-7 rounded-md grid place-items-center bg-gradient-to-br from-sky-500/30 to-violet-600/30 border border-white/10 text-sky-200 text-sm"
          >
            ←
          </span>
          <div>
            <h1 className="text-base font-semibold tracking-tight">
              Start Value Calculator
            </h1>
            <p className="text-[11px] text-slate-500">{code.shortName}</p>
          </div>
        </button>
        <nav className="ml-auto flex gap-1">
          {ALL_EVENTS.map((e) => {
            const enabled = code.supportedEvents.includes(e);
            const active = e === event;
            const theme = EVENT_THEME[e];
            return (
              <button
                key={e}
                disabled={!enabled}
                onClick={() => enabled && onSelectEvent(e)}
                title={enabled ? EVENT_NAMES[e] : `${EVENT_NAMES[e]} — coming soon`}
                className={[
                  "px-2 sm:px-3 py-1.5 rounded-md text-sm font-mono flex items-center gap-1.5 transition-colors",
                  active
                    ? `${theme.chip} border ring-1 ring-inset ${theme.ring.replace("hover:", "")}`
                    : enabled
                      ? "bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 border border-transparent"
                      : "bg-slate-900/40 text-slate-600 cursor-not-allowed border border-transparent",
                ].join(" ")}
              >
                <EventIcon event={e} className="w-4 h-4 hidden sm:inline" />
                <span>{e}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
