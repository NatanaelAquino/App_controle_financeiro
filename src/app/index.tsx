import { Text, View, Button } from "react-native";
import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";

export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontFamily: fontFamily.bold}}>Home</Text>

            <Button title="NOVA META" onPress={() => router.navigate("/target")} />
            <Button title="transação" onPress={() => router.navigate("/transaction/1")} />
            <Button title="Progresso" onPress={() => router.navigate("/in-progress/12")} />

        </View>
    )
} 