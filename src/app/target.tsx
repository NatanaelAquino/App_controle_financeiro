import { Button } from "@/components/Butto";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader/indes";
import {  View } from "react-native";

export default function Target() {
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Cadastrar meta"
                subTitle="Economize para alcançar sua meta financeira"
            />

            <View style={{ marginTop: 32, gap: 24 }}>
                <Input label="Nome da meta"  placeholder="Ex: Viagem para praia, Apple Watch"/>
                <CurrencyInput label="Valor Alvo"  value={24350.73}/>
                <Button
                    title="Salvar"
                
                />
            </View>
        </View>
    );
}