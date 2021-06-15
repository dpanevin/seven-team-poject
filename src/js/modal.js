import filmcard from './../templates/filmcard-modal.hbs';
import MoviesApi from './api-service';

//===========================================================

const movieapi = new MoviesApi();

//======================================================
const refs1 = {
  openModalByIdCard: document.querySelector('.card__set'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('.modal'),
  backdrop: document.querySelector('.backdrop'),
  modalCard: document.querySelector('.filmcard'),
  bodyEl: document.querySelector('body'),
};

refs1.openModalByIdCard.addEventListener('click', onClickCard);

function onClickCard(evt) {
  const idCard = evt.target.dataset.attribute;

  refs1.backdrop.classList.toggle('is-hidden');
  refs1.bodyEl.classList.add('modal-open');

  async function e() {
    const renderId = await movieapi.fetchMovieById(idCard);
    // const markup = ;

    refs1.modal.insertAdjacentHTML('beforeend', filmcard(renderId));
    return renderId;
  }
  e().then(response => {
    const btnEl = document.querySelector('.btnwatched');
    console.log(btnEl);
  });
}

document.addEventListener(`keyup`, e => {
  if (e.key === `Escape`) {
    closeModal();
  }
});

function closeModal() {
  refs1.bodyEl.classList.remove('modal-open');
  refs1.backdrop.classList.add('is-hidden');
  const modalCard = document.querySelector('.filmcard');

  if (modalCard) {
    modalCard.remove();
  }
}

refs1.closeModalBtn.addEventListener('click', closeModal);
closeModal();
