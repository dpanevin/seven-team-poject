export default async function homePageRender(API, fn) {
    const movie = new API;

    try {
        const gnr = await movie.fetchGenres();
        const mvs = await movie.fetchTrendingMovies();
        fn(mvs); // рендер (колбек)

        // массив (карточек) с массивами ID жанров
        const genreIdsArray = mvs.results.map(card => card.genre_ids);

        // массив (карточек) с массивами имен жанров
        const genreNamesArray = genreIdsArray.map(film => film.map(genre => getNameById(gnr.genres, genre).name));
                
        // строка жанров
        const genreEl = document.querySelectorAll('.film__genre');

        genreEl.forEach((el, ind) => el.textContent = genreNamesArray[ind].join(', '));

    } catch (error) {
        console.log('Error ',error);
    }    
}

function getNameById(arr, id) {
    return arr.find(x => x.id === id);
} 