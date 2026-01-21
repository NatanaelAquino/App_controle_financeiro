import { Alert, View, } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { PageHeader } from "@/components/PageHeader/indes";
import { Progress } from "@/components/Progress";
import { Button } from "@/components/Butto";
import { List } from "@/components/List/indes";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { Loading } from "@/components/Loading";



import { TransactionType } from "@/utils/transactionTypes";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberTocurrency";


const Transactions: TransactionProps[] = [
    {
        id: "1",
        value: "R$ 20,00",
        date: "12/04/25",
        description: "",
        type: TransactionType.Output
    },
    {
        id: "2",
        value: "R$ 300,00",
        date: "12/04/25",
        description: "CDB de 110% no banco XPTO",
        type: TransactionType.Input
    },
]

export default function InProgress() {
    const [isLoading, setIsLoading] = useState(true);

    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        percentage: "R$ 0,00",
        target: 0
    })

    const params = useLocalSearchParams<TransactionType>();
    const targetDatabase = useTargetDatabase();


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

    async function  fetchData() {
        const fectDetailsPromise =  fectDetails();

        await Promise.all([fectDetailsPromise]);
        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )

    console.log(details)
    if(isLoading) return <Loading />

    return (
        <View style={{ flex: 1, padding: 24, gap: 24 }}>
            <PageHeader title={details.name}
                rightButton={{ icon: "edit", onPress: () => {
                    router.navigate(`/target?id=${params.id}`)
                 } }}
            />
            <Progress data={{
                current: details.current, target:
                    String(details.target), percentage: Number(details.percentage)
            }} />
            <List
                title="Transções" data={Transactions}
                renderItem={({ item }) => (
                    <Transaction data={item} onRemove={() => { }} />

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
