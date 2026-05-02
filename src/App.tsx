import { useState } from "react";
import { Countdown } from "./components/Countdown";
import { PlanForm } from "./components/PlanForm";
import { EXAM_DATE } from "./lib/countdown";
import type { Plan } from "./types";

export function App() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const examDate = plan?.examDate ?? EXAM_DATE;

  return (
    <>
      <header>
        <Countdown examDate={examDate} />
        {plan && <div data-testid="plan-name">{plan.name}</div>}
      </header>
      <h1>crammr</h1>
      <PlanForm onSubmit={setPlan} />
    </>
  );
}
