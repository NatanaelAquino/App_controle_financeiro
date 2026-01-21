import { type SQLiteDatabase } from "expo-sqlite";

export async function migrate(database: SQLiteDatabase) {
  // 1. Habilita suporte a chaves estrangeiras
  await database.execAsync(`PRAGMA foreign_keys = ON;`);

  // 2. Cria as tabelas na ordem correta
  await database.execAsync(`

    CREATE TABLE IF NOT EXISTS targets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount FLOAT NOT NULL,
        create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        target_id INTEGER NOT NULL,
        amount FLOAT NOT NULL,
        observation TEXT,
        create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (target_id) REFERENCES targets (id) ON DELETE CASCADE
    );
  `);
}