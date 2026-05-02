import { useState, type FormEvent } from "react";
import type { Attempt } from "../types";

type Props = {
  planId: string;
  onSubmit: (attempt: Attempt) => void;
};

export function AttemptForm({ planId, onSubmit }: Props) {
  const [identifier, setIdentifier] = useState("");
  const [correct, setCorrect] = useState(true);
  const [category, setCategory] = useState("");
  const [pattern, setPattern] = useState("");
  const [memo, setMemo] = useState("");
  const [durationSec, setDurationSec] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    const duration = Number(durationSec);
    onSubmit({
      id: crypto.randomUUID(),
      planId,
      identifier: identifier.trim(),
      correct,
      timestamp: Date.now(),
      category: category.trim() || undefined,
      pattern: pattern.trim() || undefined,
      memo: memo.trim() || undefined,
      durationMs:
        Number.isFinite(duration) && duration > 0
          ? Math.round(duration * 1000)
          : undefined,
    });
    setIdentifier("");
    setCorrect(true);
    setCategory("");
    setPattern("");
    setMemo("");
    setDurationSec("");
  };

  return (
    <form data-testid="attempt-form" onSubmit={handleSubmit}>
      <h3>演習結果を記録</h3>
      <label>
        問題識別子(必須)
        <input
          data-testid="attempt-identifier-input"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="例: TAC問題集 P.42 問3"
          required
        />
      </label>
      <fieldset data-testid="attempt-correct-fieldset">
        <legend>正誤</legend>
        <label>
          <input
            type="radio"
            name="correct"
            data-testid="attempt-correct-yes"
            checked={correct}
            onChange={() => setCorrect(true)}
          />
          正解
        </label>
        <label>
          <input
            type="radio"
            name="correct"
            data-testid="attempt-correct-no"
            checked={!correct}
            onChange={() => setCorrect(false)}
          />
          不正解
        </label>
      </fieldset>
      <label>
        カテゴリ
        <input
          data-testid="attempt-category-input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        パターン
        <input
          data-testid="attempt-pattern-input"
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
      </label>
      <label>
        所要時間(秒)
        <input
          data-testid="attempt-duration-input"
          type="number"
          min="0"
          step="1"
          value={durationSec}
          onChange={(e) => setDurationSec(e.target.value)}
        />
      </label>
      <label>
        メモ
        <textarea
          data-testid="attempt-memo-input"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </label>
      <button data-testid="attempt-save-button" type="submit">
        記録
      </button>
    </form>
  );
}
