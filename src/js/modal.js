import filmcard from './../templates/filmcard-modal.hbs';
import MoviesApi from './api-service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { alert, success, defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

defaults.sticker = false;
defaults.closer = false;
defaults.icon = false;
defaults.minHeight = '20px';
defaults.delay = 4000;

const firebaseConfig = {
  apiKey: 'AIzaSyDdl0b3K_4fjMGLjZ2-JHtxj81J32at2gE',
  authDomain: 'seven-team-project.firebaseapp.com',
  projectId: 'seven-team-project',
  storageBucket: 'seven-team-project.appspot.com',
  messagingSenderId: '43069771775',
  appId: '1:43069771775:web:2d2b8e1e8f2b325d7de1ca',
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
// console.log(db);
export const docWatched = db.collection('watchedFilms');
// console.log(docWatched);
export const docQueued = db.collection('queuedFilms');
// console.log(docQueued);
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

  e()
    .then(response => {
      const watchedEl = document.querySelector('.btnwatched');
      //   console.log(watchedEl);
      const queuedEl = document.querySelector('.btnqueue');
      //   console.log(queuedEl);
      const idEl = document.querySelector('.filmcard-image').dataset.attribute;
      // console.log(idEl);
      const srcEl = document.querySelector('.filmcard-image').src;
      //   console.log(srcEl);
      const nameEl = document.querySelector('.filmcard-image').alt;
      //   console.log(nameEl);
      const dateEl = document.querySelector('.filmcard-image').dataset.date.slice(0, 4);
      //   console.log(dataEl);
      const voteEl = document.querySelector('.filmcard-image').dataset.vote;
      //   console.log(voteEl);
      const genreEl = document.querySelector('.filmcard-image').dataset.genre;
      // console.log(genreEl);
      watchedEl.addEventListener('click', onWatchedElClick);

      let noUpdateWatched = null;
      let noUpdateQueued = null;

      docWatched.get().then(watchedFilms => {
        watchedFilms.forEach(doc => {
          const firebaseId = doc.data().id;
          if (idEl === firebaseId) {
            noUpdateWatched = 1;
          }
        });
      });

      docQueued.get().then(queuedFilms => {
        queuedFilms.forEach(doc => {
          const firebaseId = doc.data().id;
          if (idEl === firebaseId) {
            noUpdateQueued = 1;
          }
        });
      });

      function onWatchedElClick(e) {
        if (noUpdateWatched) {
          alert({
            text: 'The film you are trying to add is already in the "WATCHED" list. Check library!',
          });
          return;
        } else if (noUpdateQueued) {
          alert({
            text: 'The film you are trying to add is already in the "QUEUED" list. Check library!',
          });
          return;
        } else {
          docWatched
            .add({
              id: idEl,
              src: srcEl,
              name: nameEl,
              date: dateEl,
              vote: voteEl,
              genre: genreEl,
            })
            .then(function () {
              success({
                text: 'Film added to "WATCHED"',
              });
            })
            .catch(function (error) {
              console.log('Error adding document: ', error);
            });
        }
        setTimeout(closeModal, 1000);
      }

      queuedEl.addEventListener('click', onQueuedElClick);
      function onQueuedElClick(e) {
        if (noUpdateQueued) {
          alert({
            text:
              'The film you are trying to add is already in the "QUEUED" list and can`t be added to library twice',
          });
          return;
        } else if (noUpdateWatched) {
          alert({
            text:
              'The film you are trying to add is already in the "WATCHED" list and can`t be added to library twice',
          });
          return;
        } else {
          docQueued
            .add({
              id: idEl,
              src: srcEl,
              name: nameEl,
              date: dateEl,
              vote: voteEl,
              genre: genreEl,
            })
            .then(function () {
              success({
                text: 'Film added to "QUEUED"',
              });
            })
            .catch(function (error) {
              console.log('Error adding document: ', error);
            });
        }
        setTimeout(closeModal, 1000);
      }
    })
    .catch(error => console.log(error));
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
