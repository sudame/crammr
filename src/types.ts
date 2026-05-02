export type Plan = {
  id: string;
  name: string;
  examDate: Date;
};

export type DailyQuota = {
  id: string;
  planId: string;
  date: string;
  declared: number;
  achieved: number;
};

export type Problem = {
  id: string;
  planId: string;
  statement: string;
  answer: string;
  explanation: string;
  category: string;
  pattern: string;
};

export type Attempt = {
  id: string;
  planId: string;
  identifier: string;
  correct: boolean;
  timestamp: number;
  category?: string;
  pattern?: string;
  memo?: string;
  durationMs?: number;
  problemId?: string;
};
