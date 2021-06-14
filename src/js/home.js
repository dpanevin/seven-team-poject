export default async function homePageRender(API, fn) {
    const movie = new API;

    try {
        const gnr = movie.fetchGenres();  // жанры // gnr === allPromises[0]
        const mvs = movie.fetchTrendingMovies(); // фильмы // mvs === allPromises[1]
        const allPromises = await Promise.all([gnr, mvs]);

        fn(allPromises[1]); // рендер (колбек)

        // массив (карточек) с массивами ID жанров
        const genreIdsArray = allPromises[1].results.map(card => card.genre_ids);

        // массив (карточек) с массивами имен жанров
        const genreNamesArray = genreIdsArray.map(film => film.map(genre => getNameById(allPromises[0].genres, genre).name));
                
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
