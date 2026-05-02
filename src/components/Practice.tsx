import { useState } from "react";
import type { Attempt, Problem } from "../types";

type Props = {
  problems: Problem[];
  onAttempt: (attempt: Attempt) => void;
};

export function Practice({ problems, onAttempt }: Props) {
  const [current, setCurrent] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<null | {
    correct: boolean;
    explanation: string;
  }>(null);

  const pickRandom = () => {
    if (problems.length === 0) return;
    const next = problems[Math.floor(Math.random() * problems.length)];
    setCurrent(next);
    setUserAnswer("");
    setResult(null);
  };

  const submit = () => {
    if (!current) return;
    const correct = userAnswer.trim() === current.answer.trim();
    setResult({ correct, explanation: current.explanation });
    onAttempt({
      id: crypto.randomUUID(),
      planId: current.planId,
      problemId: current.id,
      correct,
      timestamp: Date.now(),
    });
  };

  return (
    <section data-testid="practice">
      <h2>演習</h2>
      <button
        data-testid="practice-start-button"
        onClick={pickRandom}
        disabled={problems.length === 0}
      >
        ランダム 1 問
      </button>
      {current && (
        <div>
          <div data-testid="practice-statement">{current.statement}</div>
          <input
            data-testid="practice-answer-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={result !== null}
          />
          <button
            data-testid="practice-submit-button"
            onClick={submit}
            disabled={result !== null}
          >
            回答
          </button>
          {result && (
            <div>
              <div data-testid="practice-result">
                {result.correct ? "正解" : "不正解"}
              </div>
              <div data-testid="practice-explanation">
                {result.explanation}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
