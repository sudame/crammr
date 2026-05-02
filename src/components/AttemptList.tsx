import type { Attempt } from "../types";

type Props = {
  attempts: Attempt[];
};

const LIMIT = 20;

export function AttemptList({ attempts }: Props) {
  const recent = [...attempts]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, LIMIT);

  if (recent.length === 0) {
    return (
      <section data-testid="attempt-list">
        <h3>直近の記録</h3>
        <p data-testid="attempt-list-empty">まだ記録がありません。</p>
      </section>
    );
  }

  return (
    <section data-testid="attempt-list">
      <h3>直近の記録(最新 {recent.length} 件)</h3>
      <ul>
        {recent.map((a) => (
          <li key={a.id} data-testid="attempt-list-item">
            <span data-testid="attempt-list-identifier">{a.identifier}</span>
            {" — "}
            <span data-testid="attempt-list-correct">
              {a.correct ? "正解" : "不正解"}
            </span>
            {a.category && <> [{a.category}]</>}
            {a.pattern && <> ({a.pattern})</>}
            {a.durationMs !== undefined && (
              <> {Math.round(a.durationMs / 1000)} 秒</>
            )}
            {a.memo && <div data-testid="attempt-list-memo">{a.memo}</div>}
          </li>
        ))}
      </ul>
    </section>
  );
}
