
import filmcard from './../templates/filmcard-modal.hbs';
import MoviesApi from './api-service';
// const movieapi = new MoviesApi();

// async function e() {
//     const r = await movieapi.fetchMovieById("34335");
//     const markup = filmcard(r);
//     modal.innerHTML = markup;
//     return r;
// }
// e();

// (() => {
//     const refs = {
//       openModalById: document.querySelector('[data-attribute=id]'),
//       closeModalBtn: document.querySelector('[data-modal-close]'),
//       modal: document.querySelector('[data-modal]'),
//     };
  
//     refs.openModalByIdImg.addEventListener('click', toggleModal);
//     refs.closeModalBtn.addEventListener('click', toggleModal);
  
//     async function toggleModal() {
//         refs.modal.classList.toggle('is-hidden');
//           const movieapi = new MoviesApi();
//         async function e() {
//     const r = await movieapi.fetchMovieById("34335");
//     const markup = filmcard(r);
//     refs.modal.insertAdjacentHTML('beforeend', markup);
//     return r;
//      }
//         
//     }
// })e();


const modal = document.querySelector('.modal');
const movieapi = new MoviesApi();

async function e() {
    const renderId = await movieapi.fetchMovieById("34335");
    const markup = filmcard(renderId);
    modal.insertAdjacentHTML('beforeend', markup);;
    return renderId;
}
e();
//========================================================
//
//     const refs = {
//       openModalById: document.querySelector('[data-attribute=id]'),
//       closeModalBtn: document.querySelector('[data-modal-close]'),
//       modal: document.querySelector('[data-modal]'),
//     };

//     refs.openModalByIdImg.addEventListener('click', onOpenModalById);
