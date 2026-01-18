import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";


import { PageHeader } from "@/components/PageHeader/indes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Button } from "@/components/Butto";
import { TransctionType } from "@/components/TransctionType";
import { useState } from "react";
import { TransactionType } from "@/utils/transactionTypes";
type TransactionProps = {
    id: string
}

export default function Transaction() {
    const [type, setType] = useState(TransactionType.Input);
    const { id } = useLocalSearchParams<TransactionProps>();
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Nova transação"
                subTitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
            />

            <View style={{ marginTop: 32, gap: 24 }}>
                <TransctionType selected={type} onChange={ setType } />
                <CurrencyInput
                    value={0}
                    label="Valor"
                />
                <Input label="Motivo (Opcional)" placeholder="Ex: Investir em CDB de 110% no banco XPTO" />

                <Button
                    title="Salvar"
                />
            </View>

        </View>
    );
}