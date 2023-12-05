import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../styles/globalStyles'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { 
    Loading
} from "../components"
import { debounce} from "lodash"
import {
    fallbackMoviePoster,
    image185,
    searchMovies
} from "../api/moviedb"

const { width, height } = Dimensions.get('window')

export default function SearchScreen() {
    const [results, setResult] = useState([1,2,3,4])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const movieName = "Quantum Man"

    const handleSearch = () => {
        navigation.navigate("Home")
    }
    
    const handleMovieSelect = (item) => {
        navigation.push("MovieDetailScreen", item)
    }

    const handleInputSearch = async value => {
        // console.log(value, "==> VALUE");
        if (value && value.length > 2) {
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                const reslutData = data.data
                if (reslutData && reslutData.results) {
                    console.log("==> Ini?", data.data);

                    setResult(reslutData.results)
                }
            })
            // const dataMovie = await searchMovies({
            //     query: value,
            //     include_adult: false,
            //     language: 'en-US',
            //     page: '1'
            // })
            // console.log(dataMovie, "==> KOK");
        } else {
            setLoading(false)
            setResult([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleInputSearch, 400), []) // => CARA TUNGGU BIAR GA LANGSUNG ONCHANGE

    return (
        <SafeAreaView
            className="flex-1"
            style={styles.background}
        >

            {/* Kolom Bar Search */}
            <View className="mt-2 mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={"lightgray"}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />

                <TouchableOpacity
                    className="rounded-full p-3 m-1 bg-neutral-500"
                    onPress={handleSearch}
                >
                    <XMarkIcon size={25} color={"white"}/>
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading/>
                ) : (
                    <>
                    {/* Results */}
                    {
                        results.length > 0 ? (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingHorizontal: 15
                                }}
                                className="space-y-3"
                            >

                                <Text className="text-white font-semibold ml-1">
                                    Results Nih ({ results.length })
                                </Text>

                                <View className="flex-row justify-between flex-wrap">
                                    {
                                        results.map((item, idx) => {
                                            return(
                                                <TouchableWithoutFeedback
                                                    key={idx}
                                                    onPress={() => handleMovieSelect(item)}
                                                >
                                                    <View className="space-y-2 mb-4">

                                                        <Image
                                                            className="rounded-3xl"
                                                            style={{
                                                                width: width*0.44,
                                                                height: height*0.3
                                                            }}
                                                            // source={require("../assets/images/moviePoster2.png")}
                                                            source={{
                                                                uri: image185(item?.poster_path) || fallbackMoviePoster
                                                            }}
                                                            key={idx}
                                                        />
                                                        <Text className="text-neutral-300 ml-1">
                                                            { item?.title.length > 22 ? item?.title.slice(0,22) + "..." : item?.title }
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        })
                                    }
                                </View>

                            </ScrollView>
                        ) : (
                            <View className="flex-row justify-center">
                                <Image
                                    source={require("../assets/images/movieTime.png")}
                                    className="h-96 w-96"
                                />
                            </View>
                        )
                    }
                    </>
                )
            }
        
        </SafeAreaView>
    )
}