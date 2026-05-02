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
