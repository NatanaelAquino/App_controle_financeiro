import { useSQLiteContext } from "expo-sqlite";
import { TargetCreate } from "./useTargetDatabase";


export type TransactionCreate = {
    target_id: number;
    amount: number;
    observation?: string;

}

export type TransactionResponse = {
    id: number;
    target_id: number;
    amount: number;
    observation?: string;
    created_at: Date;
    updated_at: Date;
}

export function useTransactionsDatabase() {
    const database = useSQLiteContext();

    async function create(data: TransactionCreate) {
        const statement = await database.prepareAsync(`
            INSERT INTO transactions (target_id, amount, observation) VALUES ($target_id, $amount, $observation);
        `);
        await statement.executeAsync({
            $target_id: data.target_id,
            $amount: data.amount,
            $observation: data.observation
        });
    }
    async function listByTargetId(id: number) {
        return database.getAllAsync<TransactionResponse>(`
            SELECT id, target_id, amount, observation, create_at, update_at 
            FROM transactions WHERE target_id = ${id};
            ORDER BY create_at DESC
        `);
    }

    async function removeByTargetId(id: number) {

        await database.runAsync(`
        DELETE FROM transactions WHERE id = ? `, id);
    }
    return { create, listByTargetId, removeByTargetId };
}