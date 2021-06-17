import createMarkup from '../templates/card-template.hbs'; // забираем шаблон карточки
import onClickCard from './modal'
import getRefs from './refs';
import MoviesApi from './api-service';
const moviesApi = new MoviesApi; 
// const refs = {
//     cardSetEl: document.querySelector('.card__set')  // список для рендеринга
// };

const refs = getRefs();

export default async function markupRender(movieObj) {
  const markup = createMarkup(movieObj);
  refs.cardSetEl.innerHTML = markup; // заполняется список
  
  try {
    const allPromises = await Promise.all([
    moviesApi.fetchGenres(),    // жанры
    moviesApi.fetchTrendingMovies() // фильмы
    ]);
    const gnr = allPromises[0]; // жанры
    const mvs = allPromises[1]; // фильмы

    // массив (карточек) с массивами ID жанров
    const genreIdsArray = mvs.results.map(card => card.genre_ids);

    // массив (карточек) с массивами имен жанров
    const genreNamesArray = genreIdsArray.map(film => film.map(genre => getNameById(gnr.genres, genre).name));
                
    // строка жанров
    const genreEl = document.querySelectorAll('.film__genre');

    // замена ID на названия
    genreEl.forEach((el, ind) => el.textContent = genreNamesArray[ind].join(', '));
  } catch (error) {
    console.log('Error ',error);
  }


  const years = document.querySelectorAll('.film__release');

    years.forEach(el => {
      el.textContent = el.textContent.trim().split('').splice(0, 4).join('');
    })
}

function getNameById(arr, id) {
    return arr.find(x => x.id === id);
} 
