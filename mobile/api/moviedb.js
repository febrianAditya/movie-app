import axios from "axios";
import {
    API_KEY
} from "@env"

const baseUrl = "https://api.themoviedb.org/3"

// endpoints
const trandingMovieEndpoint = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`
 
  
// endpoints Movie DYNAMIC with ID
const getIdMovieDetails = id => `${baseUrl}/movie/${id}?api_key=${API_KEY}`;
const getMovieCredits = id => `${baseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const getSimilarMovies = id => `${baseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

// endpoints Person
const personDetailsEndpoint = id=> `${baseUrl}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint = id=> `${baseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = (posterPath) => posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = (posterPath) => posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = (posterPath) => posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

export const cekEnv = () => {
    console.log(API_KEY, "==> CEK KEY ");
}

const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params? params: {}
    }

    try {
        const response = await axios.request(options)
        return response
    } catch (error) {
        console.log("Error : ", error);
        return {};
    }
}


// Home Screen Apis
export const fetchTrandingMovies = () => {
    return apiCall(trandingMovieEndpoint)
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = id => {
    return apiCall(getIdMovieDetails(id))
}

export const fetchMovieCredits = id => {
    return apiCall(getMovieCredits(id))
}

export const fetchSimilarMovies = id => {
    return apiCall(getSimilarMovies(id))
}

export const fetchPersonDetail = id => {
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id ))
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}