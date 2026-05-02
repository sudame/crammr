import { useEffect, useState } from "react";
import { computeRemaining, EXAM_DATE } from "../lib/countdown";

export function Countdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const r = computeRemaining(EXAM_DATE, now);

  if (r.isExamDay) {
    return (
      <div data-testid="countdown" data-state="exam-day">
        試験当日
      </div>
    );
  }
  if (r.isPast) {
    return (
      <div data-testid="countdown" data-state="past">
        試験は終了しました
      </div>
    );
  }
  return (
    <div data-testid="countdown" data-state="counting">
      残り <span data-testid="countdown-days">{r.days}</span> 日{" "}
      <span data-testid="countdown-hours">{r.hours}</span> 時間{" "}
      <span data-testid="countdown-minutes">{r.minutes}</span> 分{" "}
      <span data-testid="countdown-seconds">{r.seconds}</span> 秒
    </div>
  );
}
