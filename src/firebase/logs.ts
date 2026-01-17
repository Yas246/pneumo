import type { CreateLogEntry, LogEntry } from "@/types/user";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

const LOGS_COLLECTION = "logs";

// Créer un nouveau log
export const createLog = async (
  logData: CreateLogEntry
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

// Récupérer les logs avec pagination
export const getLogsPaginated = async (
  lastDoc?: QueryDocumentSnapshot | null,
  limit_count: number = 10
): Promise<{ logs: LogEntry[]; lastDoc: QueryDocumentSnapshot | null }> => {
  try {
    let logsQuery = query(
      collection(db, LOGS_COLLECTION),
      orderBy("timestamp", "desc"),
      limit(limit_count + 1) // +1 pour vérifier s'il y en a plus
    );

    if (lastDoc) {
      logsQuery = query(logsQuery, startAfter(lastDoc));
    }

    const snapshot = await getDocs(logsQuery);
    const logsData = snapshot.docs.slice(0, limit_count).map((doc) => ({
      ...doc.data(),
      id: doc.id,
      timestamp: (doc.data().timestamp as Timestamp).toDate(),
    })) as LogEntry[];

    const newLastDoc =
      snapshot.docs.length > limit_count
        ? snapshot.docs[limit_count - 1]
        : null;

    return { logs: logsData, lastDoc: newLastDoc };
  } catch (error) {
    console.error("Erreur lors de la récupération des logs paginés:", error);
    throw error;
  }
};
