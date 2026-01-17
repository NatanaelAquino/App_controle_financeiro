import { View, StatusBar } from "react-native";
import { router } from "expo-router";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List/indes";
import { Target } from "@/components/Target";
import { Button } from "@/components/Butto";

const targets = [
    {
        id: "1",
        name: "Alimentação",
        percentage: "50%",
        current: "R$ 1.000,00",
        target: "R$ 2.000,00"
    },
    {
        id: "2",
        name: "Alimentação",
        percentage: "75%",
        current: "R$ 900,00",
        target: "R$ 1.750,00"
    },
    {
        id: "3",
        name: "Alimentação",
        percentage: "75%",
        current: "R$ 1.200,00",
        target: "R$ 3.000,00"
    },
]
const summary = {
    total: "R$ 2680,00",
    entries: { label: "Entradas", amount: "R$ 6,184.90" },
    expensives: { label: "Saidas", amount: "R$ 883.65" }
}
export default function Index() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content"/>
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