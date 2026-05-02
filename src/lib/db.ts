import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Plan } from "../types";

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
}

const DB_NAME = "crammr";
const DB_VERSION = 2;

let dbPromise: Promise<IDBPDatabase<CrammrDB>> | null = null;

function getDb(): Promise<IDBPDatabase<CrammrDB>> {
  if (!dbPromise) {
    dbPromise = openDB<CrammrDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore("plans", { keyPath: "id" });
        }
        if (oldVersion < 2) {
          db.createObjectStore("settings", { keyPath: "key" });
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
