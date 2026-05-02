import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Plan } from "../types";

interface CrammrDB extends DBSchema {
  plans: {
    key: string;
    value: Plan;
  };
}

const DB_NAME = "crammr";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<CrammrDB>> | null = null;

function getDb(): Promise<IDBPDatabase<CrammrDB>> {
  if (!dbPromise) {
    dbPromise = openDB<CrammrDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("plans")) {
          db.createObjectStore("plans", { keyPath: "id" });
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
