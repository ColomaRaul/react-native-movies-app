import axios from 'axios';

const movieApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params:{
        api_key: 'c9378e74625c038b7b5b71fbffb3cf09',
        language: 'es-ES'
    }
});

export default movieApi;