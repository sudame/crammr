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
  const [planManagementOpen, setPlanManagementOpen] = useState(false);

  useEffect(() => {
    Promise.all([listPlans(), getActivePlanId()]).then(([loaded, savedId]) => {
      setPlans(loaded);
      if (savedId && loaded.some((p) => p.id === savedId)) {
        setActiveId(savedId);
      } else if (loaded.length > 0) {
        setActiveId(loaded[loaded.length - 1].id);
      }
      setPlanManagementOpen(loaded.length === 0);
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
        <Countdown examDate={examDate} />
        {activePlan && <div data-testid="plan-name">{activePlan.name}</div>}
      </header>

      <main data-app-main>
        {activePlan ? (
          <PlanWorkspace planId={activePlan.id} />
        ) : (
          <section data-testid="empty-state">
            <p>
              まずはプランを作成しましょう。下の「プラン管理」を開いて、試験名と試験日を入力してください。
            </p>
          </section>
        )}

        <details
          data-testid="plan-management"
          open={planManagementOpen}
          onToggle={(e) =>
            setPlanManagementOpen((e.currentTarget as HTMLDetailsElement).open)
          }
        >
          <summary>プラン管理</summary>
          <div data-testid="plan-management-body">
            {hasPlans && (
              <label>
                アクティブなプラン
                <PlanSwitcher
                  plans={plans}
                  activePlanId={activeId}
                  onChange={handleSwitch}
                />
              </label>
            )}
            <h2>{hasPlans ? "プランを追加" : "プランを作成"}</h2>
            <PlanForm onSubmit={handleSubmit} />
          </div>
        </details>
      </main>

      <footer data-app-footer>
        <a href="https://github.com/sudame/crammr">crammr</a>
      </footer>
    </>
  );
}
