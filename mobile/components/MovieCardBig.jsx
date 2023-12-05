import { TouchableWithoutFeedback, Image, Dimensions } from "react-native"
import { image500 } from "../api/moviedb";

let { width, height } = Dimensions.get('window')

export default function MovieCardBig({ item, handleClick }) {
    const posterPath = item.poster_path
    return(
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            
            <Image
                // source={
                //     require("../assets/images/moviePoster1.png")
                // }

                source={{
                    uri: image500(posterPath)
                }}

                style={{
                    width: width*0.6,
                    height: height*0.4
                }}
                className="rounded-3xl"
            />
            
        </TouchableWithoutFeedback>
    )
}