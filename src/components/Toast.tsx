// Lightweight toast notification system. One toast at a time is enough for
// the actions this app surfaces (save, delete, add skill).

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type ToastVariant = "success" | "info" | "warning" | "error";

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  notify: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const notify = useCallback((message: string, variant: ToastVariant = "success") => {
    // Keep only the latest toast on screen at a time.
    const id = Date.now() + Math.random();
    setToasts([{ id, message, variant }]);
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastState[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: "bg-emerald-600 text-white border-emerald-400",
  info: "bg-sky-700 text-white border-sky-400",
  warning: "bg-amber-600 text-white border-amber-400",
  error: "bg-rose-700 text-white border-rose-400",
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
  success: "✓",
  info: "ⓘ",
  warning: "⚠",
  error: "✕",
};

function ToastItem({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className={`px-4 py-2 rounded-full border shadow-lg flex items-center gap-2 text-sm font-medium pointer-events-auto animate-toast ${VARIANT_STYLES[toast.variant]}`}
    >
      <span className="text-base leading-none">{VARIANT_ICONS[toast.variant]}</span>
      <span>{toast.message}</span>
    </div>
  );
}
