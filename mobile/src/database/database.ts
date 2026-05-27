import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

export const db =
  Platform.OS === 'web' ? null : SQLite.openDatabaseSync('cinema.db');

export function initDatabase() {
  if (Platform.OS === 'web') {
    return;
  }

  if (!db) {
    return;
  }

  db.execSync(`
    CREATE TABLE IF NOT EXISTS tickets (
      localId TEXT PRIMARY KEY NOT NULL,
      serverId TEXT,
      userId TEXT NOT NULL,
      payload TEXT NOT NULL,
      syncStatus TEXT NOT NULL,
      purchasedAt TEXT NOT NULL
    );
  `);
}
