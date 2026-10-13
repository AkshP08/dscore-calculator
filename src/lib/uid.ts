/** Cheap unique-id generator for routine skills and modals. */
export function uid(): string {
  return (
    Math.random().toString(36).slice(2, 10) +
    Date.now().toString(36).slice(-4)
  );
}
