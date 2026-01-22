import { Alert, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";


import { PageHeader } from "@/components/PageHeader/indes";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Button } from "@/components/Butto";
import { TransctionType } from "@/components/TransctionType";

import { TransactionType } from "@/utils/transactionTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";



type TransactionProps = {
    id: string
}

export default function Transaction() {
    const [amount, setAmount] = useState(0);
    const [observation, setObservation] = useState('');
    const [type, setType] = useState(TransactionType.Input);
    const [isLoading, setIsLoading] = useState(false);

    const params = useLocalSearchParams<TransactionProps>();

    const TransactionsDatabase = useTransactionsDatabase();
    async function handleNewTransaction() {
        try {
            if (amount <= 0) {
                Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
                return;
            }
            setIsLoading(true);

            await TransactionsDatabase.create({
                target_id: Number(params.id),
                amount: type === TransactionType.Output ? amount * -1 : amount,
                observation
            });
            Alert.alert('Sucesso', 'Transação salva com sucesso!',[
                {
                    text: 'Ok',
                    onPress: () => router.back()
                }
            ]);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a transação.');
            setIsLoading(false);
        }
    }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Nova transação"
                subTitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
            />

            <View style={{ marginTop: 32, gap: 24 }}>
                <TransctionType selected={type} onChange={setType} />
                <CurrencyInput
                    value={amount}
                    onChangeValue={setAmount}
                    label="Valor"
                />
                <Input label="Motivo (Opcional)"
                    value={observation}
                    onChangeText={setObservation}
                    placeholder="Ex: Investir em CDB de 110% no banco XPTO" />

                <Button
                    title="Salvar"
                    onPress={handleNewTransaction}
                    isLoading={isLoading}
                />
            </View>

        </View>
    );
}