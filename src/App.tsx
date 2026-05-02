import { useEffect, useState } from "react";
import { Countdown } from "./components/Countdown";
import { DailyQuotaPanel } from "./components/DailyQuotaPanel";
import { PlanForm } from "./components/PlanForm";
import { PlanSwitcher } from "./components/PlanSwitcher";
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

  return (
    <>
      <header>
        <Countdown examDate={examDate} />
        {activePlan && (
          <div data-testid="plan-name">{activePlan.name}</div>
        )}
        <PlanSwitcher
          plans={plans}
          activePlanId={activeId}
          onChange={handleSwitch}
        />
      </header>
      <h1>crammr</h1>
      <PlanForm onSubmit={handleSubmit} />
      {activePlan && <DailyQuotaPanel planId={activePlan.id} />}
    </>
  );
}
