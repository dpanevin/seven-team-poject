import createMarkup from '../templates/card-template.hbs'; // забираем шаблон карточки
import onClickCard from './modal'
import getRefs from './refs';
// const refs = {
//     cardSetEl: document.querySelector('.card__set')  // список для рендеринга
// };

const refs = getRefs();

export default function markupRender(movieObj) {
  const markup = createMarkup(movieObj);
  refs.cardSetEl.innerHTML = markup; // заполняется список

  const years = document.querySelectorAll('.film__release');

    years.forEach(el => {
      el.textContent = el.textContent.trim().split('').splice(0, 4).join('');
    })
}

