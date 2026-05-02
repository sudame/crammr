import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Attempt, DailyQuota, Plan, Problem } from "../types";

type SettingEntry = { key: string; value: string };

interface CrammrDB extends DBSchema {
  plans: {
    key: string;
    value: Plan;
  };
  settings: {
    key: string;
    value: SettingEntry;
  };
  quotas: {
    key: string;
    value: DailyQuota;
    indexes: { "by-plan-date": [string, string] };
  };
  problems: {
    key: string;
    value: Problem;
    indexes: { "by-plan": string };
  };
  attempts: {
    key: string;
    value: Attempt;
    indexes: {
      "by-plan": string;
      "by-problem": string;
      "by-identifier": [string, string];
    };
  };
}

const DB_NAME = "crammr";
const DB_VERSION = 5;

let dbPromise: Promise<IDBPDatabase<CrammrDB>> | null = null;

function getDb(): Promise<IDBPDatabase<CrammrDB>> {
  if (!dbPromise) {
    dbPromise = openDB<CrammrDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, _newVersion, tx) {
        if (oldVersion < 1) {
          db.createObjectStore("plans", { keyPath: "id" });
        }
        if (oldVersion < 2) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
        if (oldVersion < 3) {
          const store = db.createObjectStore("quotas", { keyPath: "id" });
          store.createIndex("by-plan-date", ["planId", "date"]);
        }
        if (oldVersion < 4) {
          const problems = db.createObjectStore("problems", {
            keyPath: "id",
          });
          problems.createIndex("by-plan", "planId");
          const attempts = db.createObjectStore("attempts", {
            keyPath: "id",
          });
          attempts.createIndex("by-plan", "planId");
          attempts.createIndex("by-problem", "problemId");
        }
        if (oldVersion < 5) {
          tx.objectStore("attempts").createIndex(
            "by-identifier",
            ["planId", "identifier"],
          );
        }
      },
    });
  }
  return dbPromise;
}

export async function savePlan(plan: Plan): Promise<void> {
  const db = await getDb();
  await db.put("plans", plan);
}

export async function listPlans(): Promise<Plan[]> {
  const db = await getDb();
  return db.getAll("plans");
}

export async function setActivePlanId(planId: string): Promise<void> {
  const db = await getDb();
  await db.put("settings", { key: "activePlanId", value: planId });
}

export async function getActivePlanId(): Promise<string | null> {
  const db = await getDb();
  const entry = await db.get("settings", "activePlanId");
  return entry?.value ?? null;
}

export async function saveQuota(quota: DailyQuota): Promise<void> {
  const db = await getDb();
  await db.put("quotas", quota);
}

export async function getQuota(
  planId: string,
  date: string,
): Promise<DailyQuota | undefined> {
  const db = await getDb();
  return db.getFromIndex("quotas", "by-plan-date", [planId, date]);
}

export async function saveProblem(problem: Problem): Promise<void> {
  const db = await getDb();
  await db.put("problems", problem);
}

export async function listProblems(planId: string): Promise<Problem[]> {
  const db = await getDb();
  return db.getAllFromIndex("problems", "by-plan", planId);
}

export async function saveAttempt(attempt: Attempt): Promise<void> {
  const db = await getDb();
  await db.put("attempts", attempt);
}

export async function listAttemptsByProblem(
  problemId: string,
): Promise<Attempt[]> {
  const db = await getDb();
  return db.getAllFromIndex("attempts", "by-problem", problemId);
}

export async function listAttemptsByPlan(planId: string): Promise<Attempt[]> {
  const db = await getDb();
  return db.getAllFromIndex("attempts", "by-plan", planId);
}
