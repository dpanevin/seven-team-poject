export default function homePageRender(API, fn) {
    const movie = new API;

    try {
        movie.fetchGenres().then(gnr => {
            movie.fetchTrendingMovies().then(mvs => {
                fn(mvs); // рендер (колбек)

                const genreIdsArray = mvs.results.map(card => card.genre_ids);
                // массив (карточек) с массивами ID жанров

                const genreNamesArray = genreIdsArray.map(film => film.map(genre => getNameById(gnr.genres, genre).name));
                // массив (карточек) с массивами имен жанров
                
                const genreEl = document.querySelectorAll('.film__genre');
                // строка жанров

                genreEl.forEach((el, ind) => el.textContent = genreNamesArray[ind].join(', '));
                // меняем циферки на кошерные имена
            });
        });
    } catch (error) {
        console.log('Error ',error);
    }    
}

function getNameById(arr, id) {
    return arr.find(x => x.id === id);
} 