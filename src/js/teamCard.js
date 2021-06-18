import cardTpl from '../templates/teamTpl.hbs';
import teamModal from '../team.json';
import getRefs from './refs';

const refs = getRefs();

/* const refs = {
    markupModal:document.querySelector("ul.team"),
    teamLink:document.querySelector(".footer__caption-link"),
    teamCard:document.querySelector(".team__card")
    } */
const markupTeamModal = cardTpl(teamModal);
refs.markupModal.insertAdjacentHTML('beforeend', markupTeamModal);

refs.teamLink.addEventListener('click', onTeamCardOpen);
refs.teamCard.addEventListener('click', onBackdropClick);
window.addEventListener('keydown', onEscClick);

function onTeamCardOpen(event) {
  event.preventDefault();
  refs.teamCard.classList.remove('is-hidden');
}

function onCloseTeamCard() {
  refs.teamCard.classList.add('is-hidden');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseTeamCard();
  }
}

function onEscClick() {
  if (event.key === `Escape`) {
    onCloseTeamCard();
  }
}
