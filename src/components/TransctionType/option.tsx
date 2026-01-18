import { ColorValue, Pressable, PressableProps, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from "./styles";
import { colors } from "@/theme";


type OptionProps = PressableProps & {
    isSelected: boolean;
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    selectColor: ColorValue;
}



export function Option({ isSelected, title, icon, selectColor, ...rest }: OptionProps) {
    return (
        <Pressable style={[styles.Option, isSelected && { backgroundColor: selectColor }]} {...rest}>
            <MaterialIcons name={icon} size={24} color={isSelected ? colors.white : colors.gray[500]} />
            <Text style={[styles.title, isSelected && { color: colors.white }]}>{title}</Text>
        </Pressable>
    )
}