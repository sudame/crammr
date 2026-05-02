import { useEffect, useState } from "react";
import { Countdown } from "./components/Countdown";
import { PlanForm } from "./components/PlanForm";
import { EXAM_DATE } from "./lib/countdown";
import { listPlans, savePlan } from "./lib/db";
import type { Plan } from "./types";

export function App() {
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    listPlans().then((plans) => {
      if (plans.length > 0) {
        setPlan(plans[plans.length - 1]);
      }
    });
  }, []);

  const handleSubmit = async (newPlan: Plan) => {
    await savePlan(newPlan);
    setPlan(newPlan);
  };

  const examDate = plan?.examDate ?? EXAM_DATE;

  return (
    <>
      <header>
        <Countdown examDate={examDate} />
        {plan && <div data-testid="plan-name">{plan.name}</div>}
      </header>
      <h1>crammr</h1>
      <PlanForm onSubmit={handleSubmit} />
    </>
  );
}
