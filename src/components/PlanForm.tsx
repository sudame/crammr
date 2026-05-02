import { useState, type FormEvent } from "react";
import type { Plan } from "../types";

type Props = {
  onSubmit: (plan: Plan) => void;
};

export function PlanForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [examDate, setExamDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !examDate) return;
    onSubmit({
      id: crypto.randomUUID(),
      name,
      examDate: new Date(`${examDate}T00:00:00+09:00`),
    });
    setName("");
    setExamDate("");
  };

  return (
    <form data-testid="plan-form" onSubmit={handleSubmit}>
      <label>
        プラン名
        <input
          data-testid="plan-name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        試験日
        <input
          data-testid="plan-exam-date-input"
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />
      </label>
      <button data-testid="plan-save-button" type="submit">
        保存
      </button>
    </form>
  );
}
