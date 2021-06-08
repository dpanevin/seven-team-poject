const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '925491183043d455ae6efbd6833f46c6';

export default class MoviesApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchTrendingMovies() {
        const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ru`;

        try {
            const response = await fetch(url);
            const movies = response.json();
            return movies;
        } catch (error) {
            console.log(error)
        }
    }

    async fetchMoviesByQuery() {
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru&page=${this.page}&include_adult=false&query=${this.query}`;

        try {
            const response = await fetch(url);
            const movies = response.json();
            return movies;
        } catch (error) {
            console.log(error)
        }
    }

    async fetchMovieById(id) {
        const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru&external_source=imdb_id`;

        try {
            const response = await fetch(url);
            const movie = response.json();
            return movie;
        } catch (error) {
            console.log(error)
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}