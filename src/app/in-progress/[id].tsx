import { View, } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { PageHeader } from "@/components/PageHeader/indes";
import { Progress } from "@/components/Progress";
import { Button } from "@/components/Butto";
import { List } from "@/components/List/indes";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionType } from "@/utils/transactionTypes";
import { use } from "react";

const data = {
    current: "R$ 580,00",
    target: "R$ 1.790,00",
    percentage: 25
}

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
    const params = useLocalSearchParams<TransactionType>();
    return (
        <View style={{ flex: 1, padding: 24, gap: 24 }}>
            <PageHeader title="Meta em andamento"
                rightButton={{ icon: "edit", onPress: () => { } }}
            />
            <Progress data={data} />
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
