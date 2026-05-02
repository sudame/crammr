import { useEffect, useState } from "react";
import {
  listProblems,
  saveAttempt,
  saveProblem,
} from "../lib/db";
import type { Attempt, Problem } from "../types";
import { DailyQuotaPanel } from "./DailyQuotaPanel";
import { Practice } from "./Practice";
import { ProblemForm } from "./ProblemForm";

type Props = {
  planId: string;
};

export function PlanWorkspace({ planId }: Props) {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    listProblems(planId).then(setProblems);
  }, [planId]);

  const handleAddProblem = async (p: Problem) => {
    await saveProblem(p);
    setProblems((prev) => [...prev, p]);
  };

  const handleAttempt = async (a: Attempt) => {
    await saveAttempt(a);
  };

  return (
    <>
      <DailyQuotaPanel planId={planId} />
      <ProblemForm planId={planId} onAdded={handleAddProblem} />
      <Practice problems={problems} onAttempt={handleAttempt} />
    </>
  );
}
