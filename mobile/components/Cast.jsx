import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, useAnimatedValue  } from 'react-native'
import { fallbackPersonImage, image185 } from '../api/moviedb'

export default function Cast( { cast } ) {
    let characterName = "Boy Anak Gedung"
    let personName = "Febrian Aditya"
    const navigation = useNavigation()

    const handleCast = (person) => {
        navigation.navigate('PersonDetailScreen', person)
    }

    return (
        <View className="my-6">
        <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15
            }}
        >
            {
                cast && cast.map((person, idx) => {
                    return(
                        <TouchableOpacity
                            key={idx}
                            className="mr-4 items-center"
                            onPress={() => handleCast(person)}
                        >
                            <View
                                className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500"
                            >
                                <Image
                                    className="rounded-2xl h-24 w-20"
                                    // source={require("../assets/images/castImage1.png")}
                                    source={{
                                        uri: image185(person?.profile_path) || fallbackPersonImage
                                    }}
                                />
                            </View>

                            <Text className="text-white text-xs mt-1">
                                {
                                    person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character
                                }
                            </Text>
                            <Text className="text-white text-xs mt-1">
                                {
                                    person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }

        </ScrollView>
        </View>
    )
}