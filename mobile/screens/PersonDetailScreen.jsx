import { View, Text, TouchableOpacity, Dimensions, Platform, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { styles } from '../styles/globalStyles';
import { 
    MovieList, 
    Loading 
} from '../components'
import { fallbackPersonImage, fetchPersonDetail, fetchPersonMovies, image342 } from '../api/moviedb'


let { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios'  
const verticalmargin = ios ? '' : " my-3"

export default function PersonDetailScreen() {
    const {params: item} = useRoute()
    const [isFavorite, setIsFavorite] = useState(false)
    const [personMovie, setPersonMovie] = useState()
    const [person, setPerson] = useState()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        setLoading(true)
        // console.log(item, "==> ITEM NIH");
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    }, [])

    const getPersonDetails = async id => {
        try {
            const data = await fetchPersonDetail(id)
            if (data) {
                setLoading(false)
                setPerson(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPersonMovies = async id => {
        try {
            const data = await fetchPersonMovies(id)
            // console.log(data.data, "==> INI DIA");
            if (data || data.data.cast) {
                setPersonMovie(data.data.cast)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleBack = () => {
        navigation.goBack()
    }

    const handleFavortie = () => {
        if (isFavorite) {
            setIsFavorite(false)
        }else {
            setIsFavorite(true)
        }
    }

    return (

        <ScrollView 
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1"
            style={styles.background}
        >  

            {/* Back Button and Like Button */}
            <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4 " + verticalmargin}>
                <TouchableOpacity style={styles.backgroundYellow} className="rounded-xl p-1" onPress={handleBack}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white"/>
                </TouchableOpacity> 

                <TouchableOpacity onPress={handleFavortie}>
                    <HeartIcon size={35} color={isFavorite ? "red" : "white"}/>
                </TouchableOpacity>
            </SafeAreaView>

            {
                loading ? (
                    <Loading/>
                ) : (
                    <>
                    {/* Person Details */}
                    <View>
                        {/* Handle Gambar Profile Person */}
                        <View className="flex-row justify-center"
                            style={{
                                shadowColor: "grey",
                                shadowOpacity: 1,
                                shadowRadius: 40,
                                shadowOffset: 1
                            }}
                        >
                            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                                <Image 
                                    // source={require("../assets/images/castImage1.png")}
                                    source={{
                                        uri: image342(person?.profile_path) || fallbackPersonImage
                                    }}
                                    style={{
                                        height: height*0.43,
                                        width: width*0.74
                                    }}
                                />
                            </View>
                        </View>
                    
                        {/* Handle Text for Information Name and Birthdate Place Person Actor */}
                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                {
                                    person?.name
                                }
                            </Text>

                            <Text className="text-base text-neutral-500 text-center">
                                {
                                    person?.place_of_birth
                                }
                            </Text>
                        </View>

                        {/* Handle Text for Information Gender */}
                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            
                            {/* Information Gender */}
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">
                                    Gender
                                </Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.gender == 1 ? "Female" : "Male"
                                    }
                                </Text>
                            </View>

                            {/* Information Bithday */}
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">
                                    Birthday
                                </Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.birthday 
                                    }
                                </Text>
                            </View>

                            {/* Information Known */}
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">
                                    Known for
                                </Text>
                                <Text className="text-neutral-300 text-sm">
                                    { person?.known_for_department}
                                </Text>
                            </View>

                            {/* Information Popularity */}
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">
                                    Popularity
                                </Text>
                                <Text className="text-neutral-300 text-sm">
                                    { person?.popularity?.toFixed(2) } %
                                </Text>
                            </View>
                        </View>

                        {/* Biography */}
                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">
                                Biography
                            </Text>
                            <Text className="text-neutral-400 tracking-wide">
                                {
                                    person?.biography || "N/A"
                                }
                            </Text>
                        </View>

                        {/* Movies List */}
                        <MovieList title={"Movies"} hideSeeAll={true} data={personMovie}/>
                    </View>
                    </>
                )
            }
            
            

        </ScrollView>
    )
}