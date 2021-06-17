export default async function homePageRender(API, fn) {
    const movie = API;

    try {

        const mvs = await movie.fetchTrendingMovies(); // фильмы

        fn(mvs); // рендер (колбек)

    } catch (error) {
        console.log('Error ',error);
    }    
}
