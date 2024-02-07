import { useEffect, useState } from "react";
import movieApi from "../api/movieApi";
import { Movie, MoviesDBResponse } from "../interfaces/movieInterface";

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    });


    const getMovies = async () => {
        const nowPlayingPromise = movieApi.get<MoviesDBResponse>('/now_playing');
        const popularPromise = movieApi.get<MoviesDBResponse>('/popular');
        const topRatedPromise = movieApi.get<MoviesDBResponse>('/top_rated');
        const upcomingPromise = movieApi.get<MoviesDBResponse>('/upcoming');

        const responses = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setMoviesState({
            nowPlaying: responses[0].data.results,
            popular: responses[1].data.results,
            topRated: responses[2].data.results,
            upcoming: responses[3].data.results
        });
        setIsLoading(false);
    };

    useEffect(() => {
        getMovies();
    }, []);

    return {
        ...moviesState,
        isLoading
    }
}
