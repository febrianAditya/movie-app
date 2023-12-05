import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import MovieCardBig from "./MovieCardBig";

let { width, height } = Dimensions.get('window')

export default function TrendingMovies({ dataTrending }) {
    const navigation = useNavigation()

    const handleClick = (item) => {
        navigation.navigate('MovieDetailScreen', item)
        console.log("Masuk Pak Eko");
    }

    return(
        <View className="mb-8">
            
            <Text className="text-white text-xl mx-4 mb-5 mt-8">
                Trending
            </Text>

            <Carousel
                data={dataTrending}
                renderItem={({item}) => <MovieCardBig item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.64}
                slideStyle={{
                    display: "flex",
                    alignItems: "center"
                }}
                loop={false}
            />

        </View>
    )
}
