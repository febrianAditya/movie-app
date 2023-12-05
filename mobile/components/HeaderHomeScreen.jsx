import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "../styles/globalStyles"
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"

export default function HeaderHomeScreen() {
    const navigation = useNavigation()

    const handleSearch = () => {
        navigation.navigate("SearchScreen")
    }

    return(
        <View className="flex-row justify-between items-center mx-4">

            <Bars3BottomLeftIcon size="40" strokeWidth={2} color="white" />

            <Text className="text-white text-3xl font-bold">
                <Text style={styles.textcolor}>M</Text>
                ovies
            </Text>

            <TouchableOpacity onPress={handleSearch}>
                <MagnifyingGlassIcon size={34} strokeWidth={2} color={"white"}/>
            </TouchableOpacity>

        </View>
    )
}