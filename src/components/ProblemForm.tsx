import { useState, type FormEvent } from "react";
import type { Problem } from "../types";

type Props = {
  planId: string;
  onAdded: (problem: Problem) => void;
};

export function ProblemForm({ planId, onAdded }: Props) {
  const [statement, setStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [category, setCategory] = useState("");
  const [pattern, setPattern] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!statement || !answer) return;
    onAdded({
      id: crypto.randomUUID(),
      planId,
      statement,
      answer,
      explanation,
      category,
      pattern,
    });
    setStatement("");
    setAnswer("");
    setExplanation("");
    setCategory("");
    setPattern("");
  };

  return (
    <form data-testid="problem-form" onSubmit={submit}>
      <h3>問題を追加</h3>
      <input
        data-testid="problem-statement-input"
        placeholder="問題文"
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        required
      />
      <input
        data-testid="problem-answer-input"
        placeholder="正答"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <input
        data-testid="problem-explanation-input"
        placeholder="解説"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />
      <input
        data-testid="problem-category-input"
        placeholder="カテゴリ"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        data-testid="problem-pattern-input"
        placeholder="パターン"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />
      <button data-testid="problem-add-button" type="submit">
        追加
      </button>
    </form>
  );
}
