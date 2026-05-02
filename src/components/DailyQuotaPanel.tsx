import { useEffect, useState } from "react";
import { todayJst, yesterdayJst } from "../lib/date";
import { getQuota, saveQuota } from "../lib/db";
import type { DailyQuota } from "../types";

type Props = {
  planId: string;
};

export function DailyQuotaPanel({ planId }: Props) {
  const today = todayJst();
  const yesterday = yesterdayJst();
  const [todayQuota, setTodayQuota] = useState<DailyQuota | null>(null);
  const [yesterdayQuota, setYesterdayQuota] = useState<DailyQuota | null>(
    null,
  );
  const [declareInput, setDeclareInput] = useState("");
  const [achieveInput, setAchieveInput] = useState("");

  useEffect(() => {
    Promise.all([
      getQuota(planId, today),
      getQuota(planId, yesterday),
    ]).then(([t, y]) => {
      setTodayQuota(t ?? null);
      setYesterdayQuota(y ?? null);
    });
  }, [planId, today, yesterday]);

  const carryover =
    yesterdayQuota
      ? Math.max(0, yesterdayQuota.declared - yesterdayQuota.achieved)
      : 0;
  const effectiveDeclared = (todayQuota?.declared ?? 0) + carryover;

  const declare = async () => {
    const declared = Number(declareInput);
    if (!Number.isFinite(declared) || declared < 0) return;
    const next: DailyQuota = todayQuota
      ? { ...todayQuota, declared }
      : {
          id: crypto.randomUUID(),
          planId,
          date: today,
          declared,
          achieved: 0,
        };
    await saveQuota(next);
    setTodayQuota(next);
    setDeclareInput("");
  };

  const achieve = async () => {
    const achieved = Number(achieveInput);
    if (!Number.isFinite(achieved) || achieved < 0 || !todayQuota) return;
    const next = { ...todayQuota, achieved };
    await saveQuota(next);
    setTodayQuota(next);
    setAchieveInput("");
  };

  return (
    <section data-testid="daily-quota">
      <h2>当日ノルマ</h2>
      <div>
        宣誓:{" "}
        <span data-testid="quota-declared">{todayQuota?.declared ?? 0}</span>
      </div>
      <div>
        繰越: <span data-testid="quota-carryover">{carryover}</span>
      </div>
      <div>
        実効ノルマ:{" "}
        <span data-testid="quota-effective">{effectiveDeclared}</span>
      </div>
      <div>
        達成: <span data-testid="quota-achieved">{todayQuota?.achieved ?? 0}</span>
      </div>
      <label>
        宣誓数
        <input
          data-testid="quota-declare-input"
          type="number"
          min="0"
          value={declareInput}
          onChange={(e) => setDeclareInput(e.target.value)}
        />
      </label>
      <button data-testid="quota-declare-button" onClick={declare}>
        宣誓
      </button>
      <label>
        達成数
        <input
          data-testid="quota-achieve-input"
          type="number"
          min="0"
          value={achieveInput}
          onChange={(e) => setAchieveInput(e.target.value)}
        />
      </label>
      <button data-testid="quota-achieve-button" onClick={achieve}>
        記録
      </button>
    </section>
  );
}
