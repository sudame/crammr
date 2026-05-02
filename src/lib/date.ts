export function todayJst(now: Date = new Date()): string {
  const t = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const y = t.getUTCFullYear();
  const m = String(t.getUTCMonth() + 1).padStart(2, "0");
  const d = String(t.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function yesterdayJst(now: Date = new Date()): string {
  return todayJst(new Date(now.getTime() - 24 * 60 * 60 * 1000));
}
