import createMarkup from './markupRender';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import getRefs from './refs';

const refs = getRefs();

export { onSearch, renderSearchPage };

async function onSearch(e, filmsApi) {
  const form = e.currentTarget;

  filmsApi.query = form.elements.query.value;

  // form.reset();
  filmsApi.resetPage();

  await renderSearchPage(filmsApi);
}

async function renderSearchPage(filmsApi) {
  try {
    if (filmsApi.query === '') {
      clearMarkup();
      onFetchError();
      filmsApi.fetchTrendingMovies().then(movies => {
        createMarkup(movies);
      });
    } else {
      // filmsApi.fetchMoviesByQuery().then(movies => {
      //     createMarkup(movies);

      // });

      const allPromises = await Promise.all([
        filmsApi.fetchGenres(), // жанры
        filmsApi.fetchMoviesByQuery(), // фильмы
      ]);
      const gnr = allPromises[0]; // жанры
      const movies = allPromises[1]; // фильмы
      createMarkup(movies);
      const genreIdsArray = movies.results.map(card => card.genre_ids);
      const genreNamesArray = genreIdsArray.map(film =>
        film.map(genre => getNameById(gnr.genres, genre).name),
      );
      const genreEl = document.querySelectorAll('.film__genre');
      genreEl.forEach((el, ind) => (el.textContent = genreNamesArray[ind].splice(0, 2).join(', ')));
    }
  } catch (error) {
    console.log(error);
  }
}

function clearMarkup() {
  refs.cardSetEl.innerHTML = '';
}

function onFetchError() {
  alert({
    text: 'Поле поиска фильма пустое! Пожалуйста, введите название фильма',
  });
}

function getNameById(arr, id) {
  return arr.find(x => x.id === id);
}
