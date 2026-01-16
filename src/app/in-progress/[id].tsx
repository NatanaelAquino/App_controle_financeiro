import { router, useLocalSearchParams } from "expo-router";
import {View, Button, Text } from "react-native";

type  TransactionType = {
    id: string;
}
export default function InProgress() {
    const {id} = useLocalSearchParams<TransactionType>();

   return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>Transaction {id}</Text>
  
              <Button title="Voltar" onPress={() => router.back()} />
  
          </View>
      );
  }
