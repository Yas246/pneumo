import type { LogEntry } from "@/types/user";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

const LOGS_COLLECTION = "logs";

// Créer un nouveau log
export const createLog = async (
  logData: Omit<LogEntry, "id" | "timestamp">
): Promise<void> => {
  try {
    await addDoc(collection(db, LOGS_COLLECTION), {
      ...logData,
      timestamp: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Erreur lors de la création du log:", error);
    throw error;
  }
};

// Récupérer les logs (avec pagination)
export const getLogs = async (
  limit_count: number = 100
): Promise<LogEntry[]> => {
  try {
    const logsQuery = query(
      collection(db, LOGS_COLLECTION),
      orderBy("timestamp", "desc"),
      limit(limit_count)
    );

    const snapshot = await getDocs(logsQuery);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      timestamp: (doc.data().timestamp as Timestamp).toDate(),
    })) as LogEntry[];
  } catch (error) {
    console.error("Erreur lors de la récupération des logs:", error);
    throw error;
  }
};
