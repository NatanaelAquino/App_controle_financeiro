import {
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = {
    title: string;
    subTitle?: string;
    rightButton?: {
        onPress: () => void;
        icon: keyof typeof MaterialIcons.glyphMap;
    }
}

export function PageHeader({ title, subTitle, rightButton }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.black} />
                </TouchableOpacity>
                {rightButton && (
                    <TouchableOpacity activeOpacity={0.8} onPress={rightButton.onPress} >
                        <MaterialIcons
                            name={rightButton.icon}
                            size={24}
                            color={colors.gray[500]} />
                    </TouchableOpacity>
                )}

            </View>
            <Text style={styles.title}>{title}</Text>
            {subTitle && <Text style={styles.subtitle}>{subTitle}</Text>}
        </View>
    )
}