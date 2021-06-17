import { initPagination } from './pagination';

export { homePageRender, pageRender };
    
async function homePageRender(API, fn) {
    await pageRender(API, fn);
    initPagination();
}

export default async function pageRender(API, fn) {
    const movie = API;

    try {
        const allPromises = await Promise.all([
            movie.fetchGenres(),    // жанры
            movie.fetchTrendingMovies() // фильмы
        ]);
        const gnr = allPromises[0]; // жанры
        const mvs = allPromises[1]; // фильмы

        fn(mvs); // рендер (колбек)

        // массив (карточек) с массивами ID жанров
        const genreIdsArray = mvs.results.map(card => card.genre_ids);

        // массив (карточек) с массивами имен жанров
        const genreNamesArray = genreIdsArray.map(film => film.map(genre => getNameById(gnr.genres, genre).name));
                
        // строка жанров
        const genreEl = document.querySelectorAll('.film__genre');

        genreEl.forEach((el, ind) => el.textContent = genreNamesArray[ind].splice(0, 2).join(', '));

        
    } catch (error) {
        console.log('Error ',error);
    } 
}

function getNameById(arr, id) {
    return arr.find(x => x.id === id);
} 