import { Button, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

type TransactionType = {
    id: string
}

export default function Transaction() {
    const { id } = useLocalSearchParams<TransactionType>();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Transaction {id}</Text>

            <Button title="Voltar" onPress={() => router.back()} />

        </View>
    );
}