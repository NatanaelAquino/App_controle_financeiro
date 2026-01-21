import { Button } from "@/components/Butto";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader/indes";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Alert } from "react-native";

export default function Target() {

    const [isProcessing, setIsProcessing] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const params = useLocalSearchParams<{ id?: string }>();
    const targetDatabase = useTargetDatabase();
    function handleSave() {
        if (!name.trim() || amount <= 0) {
            return Alert.alert('Atenção', 'Informe o nome e o valor da meta');
        }

        setIsProcessing(true);

        if (params.id) {
            //updade  
            update()
        } else {
            //create
            create();
        }
    }

    async function update() {
        try {
            await targetDatabase.update({ id: Number(params.id), name, amount });
            Alert.alert('Sucesso', 'Meta atualizada com sucesso!',
                [{
                    text: 'OK',
                    onPress: () => router.back()

                }]
            );
        } catch (error) {
            Alert.alert('Erro', 'Erro ao atualizar meta');
            console.log(error);
            setIsProcessing(false);
        }
    }
    async function create() {
        try {
            await targetDatabase.create({ name, amount });
            Alert.alert('Sucesso', 'Meta cadastrada com sucesso!',
                [{
                    text: 'OK',
                    onPress: () => router.back()

                }]
            );
        } catch (error) {
            Alert.alert('Erro', 'Erro ao cadastrar meta');
            setIsProcessing(false);
        }
    }

    async function fetchDatails(id: number) {
        try {
            const response = await targetDatabase.show(id);
            setName(response.name);
            setAmount(response.amount);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar meta');
        }
    }
    useEffect(() => {
        if (params.id) {
            fetchDatails(Number(params.id));
        }
    }, [params.id]);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Cadastrar meta"
                subTitle="Economize para alcançar sua meta financeira"
            />

            <View style={{ marginTop: 32, gap: 24 }}>
                <Input label="Nome da meta"
                    placeholder="Ex: Viagem para praia, Apple Watch"
                    onChangeText={setName}
                    value={name}
                />
                <CurrencyInput
                    label="Valor Alvo"
                    onChangeValue={setAmount}
                    value={amount}
                />
                <Button
                    title="Salvar"
                    isLoading={isProcessing}
                    onPress={handleSave}
                />
            </View>
        </View>
    );
}