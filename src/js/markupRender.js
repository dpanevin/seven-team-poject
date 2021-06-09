import cardMarkupTpl from '../templates/card-template.hbs'; // забираем шаблон карточки

const refs = {
    cardSetEl: document.querySelector('.card-set')  // список для рендеринга
};

export default function markupRender({ results }) {
    const markup = createMarkup(results);
    refs.cardSetEl.innerHTML = markup;  // заполняется список
}

function createMarkup(cards) {
    return cards.map(cardMarkupTpl).join(''); // создается разметка
}
