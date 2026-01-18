import { View, Text } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";


import { Option } from "./option";
import { TransactionType } from "@/utils/transactionTypes";



type Props = {
    selected: TransactionType
    onChange: (type: TransactionType) => void
};
export function TransctionType({ selected, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Option 
                isSelected= {selected === TransactionType.Input}
                title = {"Guardar"}
                icon = {"arrow-upward"}
                selectColor={colors.blue[500]}
                onPress= {() => onChange(TransactionType.Input)}

            />
            <Option
                isSelected = {selected === TransactionType.Output}
                title = {"Resgatar"}
                icon = {"arrow-downward"}
                selectColor ={ colors.red[400]}
                onPress = { () => onChange(TransactionType.Output)}
           
            />
        </View>
    );
}