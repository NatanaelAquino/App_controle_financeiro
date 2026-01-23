import { useCallback, useState } from "react";
import { View, StatusBar, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { List } from "@/components/List/indes";
import { Target, TargetProps } from "@/components/Target";
import { Button } from "@/components/Butto";
import { Loading } from "@/components/Loading";

import { useTargetDatabase } from "@/database/useTargetDatabase"
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberTocurrency";


export default function Index() {
    const [summary, setSummary] = useState<HomeHeaderProps>();
    const [isFetching, setIsFetching] = useState(true);
    const [targets, setTargets] = useState<TargetProps[]>([]);
    const targetDatabase = useTargetDatabase();
    const transactionsDatabase = useTransactionsDatabase();

    async function fetchTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDatabase.listaBySavedValue();
            return response.map((target) => ({
                id: String(target.id),
                name: target.name,
                current: numberToCurrency(target.current),
                percentage: target.percentage.toFixed(0) + "%",
                target: numberToCurrency(target.amount),
            }));

        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar metas');
            console.log(error);
        }
    }
    async function fetchSummary(): Promise<HomeHeaderProps> {
        try {
            const response = await transactionsDatabase.summary();

            return {
                total: numberToCurrency(response.input - response.output),
                entries: {
                    label: "Entradas",
                    amount: numberToCurrency(response.input),
                },
                expensives: {
                    label: "Saídas",
                    amount: numberToCurrency(response.output),
                }

            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar resumo');
            console.log(error);
        }
    }
    async function fetchData() {
        const targetDataPromise = await fetchTargets();
        const summaryPromise = await fetchSummary();
        const [targetsData, summaryData] = await Promise.all([targetDataPromise, summaryPromise]);
        
        setTargets(targetsData);
        setSummary(summaryData);
        setIsFetching(false);
    }



    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )
    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <HomeHeader data={summary} />

            <List
                title="Metas"
                data={targets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Target data={item}
                    onPress={() => router.navigate(`/in-progress/${item.id}`)}

                />}
                emptyMessage="Nenhuma meta. Toque em nova meta para criar."
                containerStyle={{ paddingHorizontal: 24 }}
            />

            <View style={{ padding: 24, paddingBottom: 32 }}>

                <Button title="Nova meta" onPress={() => router.navigate("/target")} />

            </View>
        </View>
    )
} 