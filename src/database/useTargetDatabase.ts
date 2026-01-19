import { useSQLiteContext } from "expo-sqlite";


export type TargetCreate = {
    name: string;
    amount: number;
}

export type TargetResponse = TargetCreate & {
    id: number;
    current: number;
    percentage: number;
    created_at: Date;
    updated_at: Date;
}


export function useTargetDatabase() {
    const database = useSQLiteContext();
    async function create(data: TargetCreate) {
        const statement = await database.prepareAsync(`
            INSERT INTO targets(name, amount) VALUES ($name, $amount);
        `);
        await statement.executeAsync(
            {
                $name: data.name,
                $amount: data.amount
            }
        );
    }

    async function listaBySavedValue() {
        return database.getAllAsync<TargetResponse>(`
            SELECT 
            targets.id,
            targets.name,
            targets.amount,
            COALESCE(SUM(transactions.amount), 0) AS current,
            COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
            targets.create_at,
            targets.update_at
        FROM targets 
        LEFT JOIN transactions ON targets.id = transactions.target_id 
        GROUP BY targets.id, targets.name, targets.amount
        ORDER BY percentage DESC
            `
        );
    }

    return { create,listaBySavedValue }

}