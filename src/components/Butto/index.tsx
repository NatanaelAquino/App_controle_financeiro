import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";

type Pros = TouchableOpacityProps & {
    title: string;
    isLoading?: boolean;
}




export function Button({ title, isLoading = false, ...rest }: Pros) {
    return (
        <TouchableOpacity style={styles.container} {...rest} activeOpacity={0.8} disabled={isLoading} >
            {isLoading ?
                <ActivityIndicator color={colors.white} />
                :
                <Text style={styles.label}>{
                    isLoading ?
                        <ActivityIndicator color={colors.white} />
                        :
                        title}
                </Text>
            }
        </TouchableOpacity>
    )
}