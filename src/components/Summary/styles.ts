import { colors,fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
       gap: 5
    },
    headers: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    label: {
        fontSize:10,
        color: colors.blue[300],
        fontFamily: fontFamily.regular
    },
    amount: {
        fontSize: 18,
        color: colors.white,
        fontFamily: fontFamily.regular
    }

})