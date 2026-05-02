import { useEffect, useState } from "react";
import { listAttemptsByPlan, saveAttempt } from "../lib/db";
import type { Attempt } from "../types";
import { AttemptForm } from "./AttemptForm";
import { AttemptList } from "./AttemptList";
import { DailyQuotaPanel } from "./DailyQuotaPanel";

type Props = {
  planId: string;
};

export function PlanWorkspace({ planId }: Props) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    listAttemptsByPlan(planId).then(setAttempts);
  }, [planId]);

  const handleAttempt = async (a: Attempt) => {
    await saveAttempt(a);
    setAttempts((prev) => [...prev, a]);
  };

  return (
    <>
      <DailyQuotaPanel planId={planId} />
      <AttemptForm planId={planId} onSubmit={handleAttempt} />
      <AttemptList attempts={attempts} />
    </>
  );
}
