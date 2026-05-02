import { useEffect, useState } from "react";
import { Countdown } from "./components/Countdown";
import { PlanForm } from "./components/PlanForm";
import { PlanSwitcher } from "./components/PlanSwitcher";
import { PlanWorkspace } from "./components/PlanWorkspace";
import { EXAM_DATE } from "./lib/countdown";
import {
  getActivePlanId,
  listPlans,
  savePlan,
  setActivePlanId,
} from "./lib/db";
import type { Plan } from "./types";

export function App() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([listPlans(), getActivePlanId()]).then(([loaded, savedId]) => {
      setPlans(loaded);
      if (savedId && loaded.some((p) => p.id === savedId)) {
        setActiveId(savedId);
      } else if (loaded.length > 0) {
        setActiveId(loaded[loaded.length - 1].id);
      }
    });
  }, []);

  const handleSubmit = async (newPlan: Plan) => {
    await savePlan(newPlan);
    await setActivePlanId(newPlan.id);
    setPlans((prev) => [...prev, newPlan]);
    setActiveId(newPlan.id);
  };

  const handleSwitch = async (planId: string) => {
    await setActivePlanId(planId);
    setActiveId(planId);
  };

  const activePlan = plans.find((p) => p.id === activeId) ?? null;
  const examDate = activePlan?.examDate ?? EXAM_DATE;
  const hasPlans = plans.length > 0;

  return (
    <>
      <header data-app-header>
        <h1>crammr</h1>
        <p data-app-tagline>短期集中で試験当日に走り切るための学習モチベーション維持アプリ</p>
        <div style={{ marginTop: 12 }}>
          <Countdown examDate={examDate} />
          {activePlan && <div data-testid="plan-name">{activePlan.name}</div>}
        </div>
        {hasPlans && (
          <div style={{ marginTop: 12 }}>
            <label>
              アクティブなプラン
              <PlanSwitcher
                plans={plans}
                activePlanId={activeId}
                onChange={handleSwitch}
              />
            </label>
          </div>
        )}
      </header>

      <main data-app-main>
        <section data-testid="plan-section">
          <h2>{hasPlans ? "プランを追加" : "まずはプランを作成しましょう"}</h2>
          {!hasPlans && (
            <p>
              試験名と試験日を入力すると、上のヘッダーに残り時間のカウントダウンが表示されます。
              複数の試験を並行して管理することもできます。
            </p>
          )}
          <PlanForm onSubmit={handleSubmit} />
        </section>

        {activePlan ? (
          <PlanWorkspace planId={activePlan.id} />
        ) : (
          <section>
            <h2>日々の運用と演習</h2>
            <div data-testid="empty-state">
              プランを 1 つ作成すると、当日ノルマの宣誓・達成記録、問題プールへの追加、ランダム 1 問演習が使えるようになります。
            </div>
          </section>
        )}
      </main>

      <footer data-app-footer>
        <a href="https://github.com/sudame/crammr">sudame/crammr</a>
      </footer>
    </>
  );
}
