import { Button, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";


import { PageHeader } from "@/components/PageHeader/indes";
type TransactionType = {
    id: string
}

export default function Transaction() {
    const { id } = useLocalSearchParams<TransactionType>();
    return (
        <View style={{ flex: 1 }}>
            <PageHeader 
            title="Nova transação" 
            subTitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
            />
            <Button title="Voltar" onPress={() => router.back()} />

        </View>
    );
}