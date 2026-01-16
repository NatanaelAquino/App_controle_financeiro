import {  View, Button } from "react-native";
import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";
import { HomeHeader } from "@/components/HomeHeader";


const summary = {
    total: "R$ 2680,00",
    entries: {label: "Entradas",amount: "R$ 6,184.90"},
    expensives: {label: "Saidas",amount: "R$ 883.65"}
}
export default function Index() {
    return (
        <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
            <HomeHeader data={summary}/>
        </View>
    )
} 