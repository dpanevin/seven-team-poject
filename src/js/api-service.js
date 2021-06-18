const API_KEY = '925491183043d455ae6efbd6833f46c6';

export default class MoviesApi {


            console.log(error)
    }
  }




<<<<<<< HEAD
    try {
      const response = await fetch(url);
      const movies = response.json();
      this.totalResults = movies.total_results;
      this.currentRequest = 'search';
      return movies;
    } catch (error) {
      console.log(error);
=======
        try {
            const response = await fetch(url);
            const movies = await response.json();
            this.totalResults = movies.total_results;
            this.currentRequest = 'search';
            return movies;
        } catch (error) {
            console.log(error)
        }
>>>>>>> parent of 6e87f07 (removes duplicate await from fetchTrendingMovies)
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