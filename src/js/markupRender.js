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

  const currentGenreEl = document.querySelectorAll('.film__genre');
  console.log('Genres: ', currentGenreEl);

  const years = document.querySelectorAll('.film__release');

    years.forEach(el => {
      el.textContent = el.textContent.trim().split('').splice(0, 4).join('');
    })
}

function getNameById(arr, id) {
    return arr.find(x => x.id === id);
} 
