import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
    HomeScreen, 
    MovieDetailScreen,
    PersonDetailScreen,
    SearchScreen
} from "../screens"

const Stack = createNativeStackNavigator()

export default function AppNavigation() {

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen}/>

                <Stack.Screen name="MovieDetailScreen" options={{headerShown: false}} component={ MovieDetailScreen }/>

                <Stack.Screen name="PersonDetailScreen" options={{ headerShown: false }} component={ PersonDetailScreen }/>

                <Stack.Screen name="SearchScreen" options={{ headerShown: false }} component={ SearchScreen }/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}
