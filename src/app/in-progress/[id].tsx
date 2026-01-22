import { Alert, View, } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import dayjs from "dayjs";


import { PageHeader } from "@/components/PageHeader/indes";
import { Progress } from "@/components/Progress";
import { Button } from "@/components/Butto";
import { List } from "@/components/List/indes";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { Loading } from "@/components/Loading";


import { TransactionType } from "@/utils/transactionTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberTocurrency";


export default function InProgress() {

    const [isLoading, setIsLoading] = useState(true);
    const [TransactionsDetails, setTransactionsDetails] = useState<TransactionProps[]>([]);
    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        percentage: "R$ 0,00",
        target: 0
    })
    const transactionsDatabase = useTransactionsDatabase();
    const params = useLocalSearchParams<TransactionType>();
    const targetDatabase = useTargetDatabase();
    async function fetchTransactionsDetails() {
        try {
            const response = await transactionsDatabase.listByTargetId(Number(params.id));
            console.log(response);
            setTransactionsDetails(response.map((item) => ({
                id: String(item.id),
                amount: numberToCurrency(item.amount),
                date: dayjs(item.create_at).format('DD/MM/YYYY [às] HH:mm'),
                description: item.observation,
                type: item.amount < 0 ? TransactionType.Output : TransactionType.Input,
            }))
            )
        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar transações');

        }
    }

    async function fectDetails() {
        try {
            const response = await targetDatabase.show(Number(params.id));
            setDetails({
                name: response.name,
                current: numberToCurrency(response.current),
                percentage: String(response.percentage),
                target: response.amount
            })
        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar meta');
        }
    }

    async function fetchData() {
        const fectDetailsPromise = fectDetails();
        const fetchTransitionsPromise = fetchTransactionsDetails();
        await Promise.all([fectDetailsPromise, fetchTransitionsPromise]);
        setIsLoading(false);
    }
    function handleTransactionRemove(id: number) {
        Alert.alert('Remover', 'Deseja remover essa transação?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Remover',
                style: 'destructive',
                onPress: async () => {
                    TransactionRemove(id);
                    fetchTransactionsDetails();
                }
            }
        ]);

    }
    async function TransactionRemove(id: number) {
        try {
            await transactionsDatabase.removeByTargetId(Number(id));
            fetchData();
            Alert.alert('Sucesso', 'Transação removida com sucesso');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao remover transação');
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )

    if (isLoading) return <Loading />
    console.log(TransactionsDetails);

    return (
        <View style={{ flex: 1, padding: 24, gap: 24 }}>
            <PageHeader title={details.name}
                rightButton={{
                    icon: "edit", onPress: () => {
                        router.navigate(`/target?id=${params.id}`)
                    }
                }}
            />
            <Progress data={{
                current: details.current, target:
                    String(details.target), percentage: Number(details.percentage)
            }} />
            <List
                title="Transções" data={TransactionsDetails}
                renderItem={({ item }) => (
                    <Transaction data={item} onRemove={() => handleTransactionRemove(Number(item.id))} />

                )}
                emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
            />
            <Button
                title="Nova transação"
                onPress={() => { router.navigate(`/transaction/${params.id}`) }}
            />
        </View>
    );
}
