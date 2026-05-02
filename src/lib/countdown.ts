export type Remaining = {
  isPast: boolean;
  isExamDay: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function computeRemaining(examDate: Date, now: Date): Remaining {
  const diffMs = examDate.getTime() - now.getTime();
  const isExamDay = sameJstDay(examDate, now);

  if (diffMs <= 0) {
    return {
      isPast: !isExamDay,
      isExamDay,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { isPast: false, isExamDay, days, hours, minutes, seconds };
}

function sameJstDay(a: Date, b: Date): boolean {
  const jst = (d: Date) => {
    const t = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    return `${t.getUTCFullYear()}-${t.getUTCMonth()}-${t.getUTCDate()}`;
  };
  return jst(a) === jst(b);
}

export const EXAM_DATE = new Date("2026-05-16T00:00:00+09:00");
