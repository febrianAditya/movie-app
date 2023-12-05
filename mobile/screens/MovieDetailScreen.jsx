import { View, Text, Platform, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { LinearGradient } from 'expo-linear-gradient';
import { 
    Cast, 
    MovieList, 
    Loading 
} from '../components';
import { 
    fallbackMoviePoster,
    fetchMovieCredits,
    fetchMovieDetails, fetchSimilarMovies, image500
} from '../api/moviedb';


const ios = Platform.OS === "ios"
let { width, height } = Dimensions.get('window')
const topMargin = ios? "": "mt-3"

export default function MovieDetailScreen() {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [isFavorite, setIsFavorite] = useState(false)
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5])
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState()
    let titleMovie = "Ant-Man and the Wasp"

    useEffect(() => {
        // console.log("Item ID: ", item.id);
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilar(item.id)
    }, [])

    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id)
        const dataMovie = data.data

        if (dataMovie) {
            setMovie(dataMovie)
        }
        setLoading(false) 
    }

    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id)
        const castData = data.data.cast
        
        if (data && castData) {
            setCast(castData)
        }
    }

    const getSimilar = async (id) => {
        const data = await fetchSimilarMovies(id)
        const results = data.data.results
        // console.log(results,"==> DATA APA");
        if (data && results) {
            setSimilarMovies(results)
        }
    }

    const handleBack = () => {
        // navigation.navigate('Home')
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

            <View className="w-full">
                    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
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
                            <View>
                                <Image
                                    // source={require("../assets/images/moviePoster1.png")}
                                    source={{
                                        uri: image500(movie?.poster_path) || fallbackMoviePoster
                                    }}
                                    style= {{
                                        width, height: height * 0.55
                                    }}
                                />
                                <LinearGradient 
                                    colors={['transparent', 'rgba(22, 33, 62, 0.8)', 'rgba(22, 33, 62, 1)']}
                                    style={{
                                        width, height: height * 0.40
                                    }}
                                    start={{
                                        x: 0.5,
                                        y: 0
                                    }}
                                    end={{
                                        x: 0.5,
                                        y: 1
                                    }}
                                    className="absolute bottom-0"
                                />
                            </View>
                        )
                    }
                    
            </View>

            {/* Movie Detail */}
            <View
                style={{
                    marginTop: -(height * 0.09)
                }}
                className="space-y-3"
            >
                {/* Movie Title */}
                <Text
                    className="text-white text-center text-3xl font-bold tracking-wider"
                >
                    { movie?.title }
                </Text>

                {/* Movie Status, Release, runtime */}
                <Text
                    className="text-neutral-400 text-center font-semibold text-base"
                >
                    { movie?.status } · { movie?.release_date?.split("-")[0] } · { movie?.runtime } min
                </Text>

                {/* genres*/}
                <View
                    className="flex-row justify-center mx-4 space-x-2"
                >
                    {
                        // console.log(movie.genres,"==> GENRE")
                        movie?.genres?.map((genre, idx) => {
                            let showDot = idx+1 != movie.genres.length
                            return(
                                <Text
                                    className="text-neutral-400 text-center font-semibold text-base"
                                    key={idx}
                                >
                                    { genre?.name } { showDot? "  ·" : null }
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    { movie?.overview }
                </Text>
            </View>

            {/* cast */}
            <Cast cast={cast}/>
    
            {/* Similar Movies */}
            { similarMovies.length > 0 && <MovieList title="Similar Movies" data={similarMovies} hideSeeAll={true}/> }
        </ScrollView>
    )
}