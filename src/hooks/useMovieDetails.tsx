import { useEffect, useState } from "react";
import movieApi from "../api/movieApi";
import { MovieFull } from "../interfaces/movieInterface";
import { Cast, CreditsResponse } from "../interfaces/creditsInterface";

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
    const [ state, setState ] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async () => {
        const movieDetailsPromise = movieApi.get<MovieFull>(`/${movieId}`);
        const castPromise = movieApi.get<CreditsResponse>(`/${movieId}/credits`);

        const [ movieDetailsResp, casResp] = await Promise.all([
            movieDetailsPromise,
            castPromise
        ]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: casResp.data.cast
        });
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}
