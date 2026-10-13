// Modal-dialog behavior shared by every overlay in the app: Escape-to-close,
// a focus trap that keeps Tab within the dialog, and focus restoration to the
// element that opened it on dismount. Attach the returned ref to the dialog
// panel and give that panel role="dialog" aria-modal="true" and an aria-label.

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function useDialog<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const node = ref.current;

    // Move focus into the dialog, unless an element inside already claimed it
    // (e.g. an autoFocus search input mounted this frame).
    if (node && !node.contains(document.activeElement)) {
      const focusables = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      (focusables[0] ?? node).focus();
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !node.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !node.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      // Return focus to whatever opened the dialog, if it's still around.
      opener?.focus?.();
    };
  }, [onClose]);

  return ref;
}
