import { colors,fontFamily} from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    backgroundColor: colors.blue[500],
    height: 40,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    },
    label:{
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.white
    },
   

})