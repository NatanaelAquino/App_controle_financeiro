import { Suspense } from "react"
import { Stack } from "expo-router"
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold

} from "@expo-google-fonts/inter"
import { SQLiteProvider } from "expo-sqlite"


import { migrate } from "@/database/migrate"

import { colors } from "@/theme/colors"
import { Loading } from "@/components/Loading"

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold
    })
    if (!fontsLoaded) {
        return <Loading />
    }
    return (
        <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="meu_novo_banco_v2.db"
                onInit={migrate}
                useSuspense
            >
                <Stack screenOptions={{
                    contentStyle: { backgroundColor: colors.white },
                    headerShown: false,

                }} />
            </SQLiteProvider>
        </Suspense>


    )
}