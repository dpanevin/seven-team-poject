import cardMarkupTpl from '../templates/card-template.hbs'; // забираем шаблон карточки

const refs = {
    cardSetEl: document.querySelector('.card__set')  // список для рендеринга
};

export default function markupRender(movieObj) {
    const markup = createMarkup(movieObj);
    refs.cardSetEl.innerHTML = markup;  // заполняется список
}

function createMarkup(cards) {
    return cardMarkupTpl(cards);  // создается разметка
}
