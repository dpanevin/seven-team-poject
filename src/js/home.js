export default function homePageRender(API, fn) {
    const movie = new API;
    
    try {
        movie.fetchTrendingMovies().then(fn);
    } catch (error) {
        console.log('Error ',error);
    }    
}

