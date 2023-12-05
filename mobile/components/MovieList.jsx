import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native';
import { image185, fallbackMoviePoster } from '../api/moviedb';

let { width, height } = Dimensions.get('window')

export default function MovieList({ title, data, hideSeeAll }) {
    let movieName = "Ant-man and the Wasp"
    const navigation = useNavigation()

    const handlePress = () => {
        // console.log("NAH INI");  
    }

    const handlePressFilm = (item) => {
        // console.log("COBA");
        navigation.push('MovieDetailScreen', item)
    }

    return (
        <View className="mb-8 space-y-4">

            {/* Upcoming dan See All */}
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-lg mb-5 mt-4">
                    {title}
                </Text>

                {
                    !hideSeeAll && (
                        <TouchableOpacity onPress={handlePress}>
                            <Text className="text-lg" style={styles.textcolor}>
                                See All
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        
            {/* Movie Row Horizontal */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                {
                    data?.map((item, idx) => {
                        return (
                            <TouchableWithoutFeedback
                                key={idx}
                                onPress={() => handlePressFilm(item)}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        // source={require("../assets/images/moviePoster2.png")}
                                        source={{
                                            uri: image185(item.poster_path) || fallbackMoviePoster
                                        }}
                                        className="rounded-3xl"
                                        style={{
                                            width: width*0.33,
                                            height: height*0.22
                                        }}
                                    />

                                    <Text className="text-neutral-300 ml-1">
                                        {  
                                            item.title?.length > 14 ? item.title.slice(0,14) + "..." : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
                
            </ScrollView>
        
        </View>
    )
}