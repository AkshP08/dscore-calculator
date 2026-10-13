// Hand-drawn SVG icons for each men's gymnastics apparatus.
// All icons share a 24×24 viewBox so they swap cleanly in any size.

import type { GymEvent } from "../codes/types";

interface IconProps {
  className?: string;
}

function Floor({ className }: IconProps) {
  // Floor mat — tilted square seen in perspective with diagonal pass marks.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 8 L21 8 L18 20 L6 20 Z" />
      <path d="M6 20 L9 11" opacity="0.55" />
      <path d="M18 20 L15 11" opacity="0.55" />
      <path d="M9 11 L15 11" opacity="0.55" />
    </svg>
  );
}

function Pommel({ className }: IconProps) {
  // Pommel horse — horizontal body with two pommels and angled legs.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="5" rx="2" />
      <path d="M8.5 11 L8.5 8 Q8.5 7 9.5 7 Q10.5 7 10.5 8 L10.5 11" />
      <path d="M13.5 11 L13.5 8 Q13.5 7 14.5 7 Q15.5 7 15.5 8 L15.5 11" />
      <path d="M5 16 L3 22" />
      <path d="M19 16 L21 22" />
    </svg>
  );
}

function Rings({ className }: IconProps) {
  // Still rings — two circles hanging from cables.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3 L21 3" strokeWidth="2" />
      <path d="M9 3 L9 13" />
      <path d="M15 3 L15 13" />
      <circle cx="9" cy="17" r="4" />
      <circle cx="15" cy="17" r="4" />
    </svg>
  );
}

function Vault({ className }: IconProps) {
  // Vault table — rounded block on a center post.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 9 Q3 7 6 7 L18 7 Q21 7 21 9 L21 12 L3 12 Z" />
      <path d="M11 12 L11 19 L13 19 L13 12" />
      <path d="M9 22 L15 22" />
    </svg>
  );
}

function ParallelBars({ className }: IconProps) {
  // Parallel bars — two horizontal rails on supports.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 9 L22 9" strokeWidth="2" />
      <path d="M2 15 L22 15" strokeWidth="2" />
      <path d="M5 9 L5 22" />
      <path d="M19 9 L19 22" />
      <path d="M5 15 L5 22" opacity="0.4" />
      <path d="M19 15 L19 22" opacity="0.4" />
    </svg>
  );
}

function HorizontalBar({ className }: IconProps) {
  // Horizontal bar — single bar with diagonal support cables.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 6 L22 6" strokeWidth="2" />
      <path d="M6 6 L2 22" />
      <path d="M18 6 L22 22" />
      <path d="M6 6 L10 22" opacity="0.45" />
      <path d="M18 6 L14 22" opacity="0.45" />
    </svg>
  );
}

export function EventIcon({ event, className }: { event: GymEvent; className?: string }) {
  switch (event) {
    case "FX":
      return <Floor className={className} />;
    case "PH":
      return <Pommel className={className} />;
    case "SR":
      return <Rings className={className} />;
    case "VT":
      return <Vault className={className} />;
    case "PB":
      return <ParallelBars className={className} />;
    case "HB":
      return <HorizontalBar className={className} />;
  }
}
