import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/globalStyles';
import { 
    HeaderHomeScreen, 
    TrendingMovies,
    MovieList,
    Loading
} from '../components';
import { 
    cekEnv, 
    fetchTrandingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies 
} from '../api/moviedb';

const ios = Platform.OS === "ios"

export default function HomeScreen() {
    const [dataTrending, setDataTrending] = useState([])
    const [upcomingMovie, setUpcomingMovie] = useState([])
    const [topRatedMovie, setTopRatedMovie] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // cekApi()
        getTrendingMovies()
        getUpcomingMovies()
        getTopratedMovies()
    }, [])



    const getTrendingMovies = async() => {
        const data = await fetchTrandingMovies()
        if (data && data.data.results) {
            setDataTrending(data.data.results)
        }
        setLoading(false)
    }

    const getUpcomingMovies = async() => {
        const data = await fetchUpcomingMovies()
        // console.log(data.data.results, "==> DATA");
        if (data && data.data.results) {
            setUpcomingMovie(data.data.results)
        }
        // setLoading(false)
    }

    const getTopratedMovies = async() => {
        const data = await fetchTopRatedMovies()
        // console.log(data.data.results,"==> CEK");
        if (data && data.data.results) {
            setTopRatedMovie(data.data.results)
        }
        // setLoading(false)
    }



    return(
        <View style={styles.background} className="flex-1">
            <SafeAreaView className={ios? "mb-2" : "mb-3"}>
                {/* untuk bar diatas seperti batrai dan wifi */}
                <StatusBar style="light" />
                
                <HeaderHomeScreen />

                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={{paddingBottom: 10}}
                        >
                            {/* Trending Movie */}
                            {
                                dataTrending.length > 0 && (
                                    <TrendingMovies dataTrending={dataTrending} />
                                )
                            }
                            

                            <MovieList title={"Upcoming"} data={upcomingMovie} />


                            <MovieList title={"Top Rated"} data={topRatedMovie} />
                            
                        </ScrollView>
                    )
                }


            </SafeAreaView>
        </View>
    )
}
  