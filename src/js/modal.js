import filmcard from './../templates/filmcard-modal.hbs';
import MoviesApi from './api-service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { alert, success, defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

defaults.sticker = false;
defaults.closer = true;
defaults.icon = true;
defaults.minHeight = '20px';
defaults.delay = 2000;
defaults.closerHover = false;
defaults.width = '300px';

import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import getRefs from './refs';
//==================================================
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
const refs = getRefs();
const movieapi = new MoviesApi();

//======================================================

refs.cardSetEl.addEventListener('click', onClickCard);

function onClickCard(evt) {
  if (!evt.target.dataset.attribute) {
    return;
  }
  const idCard = evt.target.dataset.attribute;

  refs.backdrop.classList.toggle('is-hidden');
  refs.bodyEl.classList.add('modal-open');

  async function e() {
    const renderId = await movieapi.fetchMovieById(idCard);
    // console.log(renderId);

    refs.modal.insertAdjacentHTML('beforeend', filmcard(renderId));
    return renderId;
  }

  e()
    .then(response => {
      const filmGenres = response.genres
        .map(genre => genre.name)
        .slice(0, 2)
        .join(', ');
      // console.log(filmGenres);
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
      // const genreEl = document.querySelector('.filmcard-image').dataset.genre;
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
            text: 'Этот фильм уже просмотрен. Проверь страницу "Библиотека"',
          });
          return;
        } else if (noUpdateQueued) {
          alert({
            text: 'Этот фильм уже в очереди на просмотр. Проверь страницу "Библиотека"',
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
              genre: filmGenres,
            })
            .then(function () {
              success({
                text: 'Фильм добавлен в "Просмотренные"',
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
            text: 'Этот фильм уже в очереди на просмотр. Проверь страницу "Библиотека"',
          });
          return;
        } else if (noUpdateWatched) {
          alert({
            text: 'Этот фильм уже просмотрен. Проверь страницу "Библиотека"',
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
              genre: filmGenres,
            })
            .then(function () {
              success({
                text: 'Фильм добавлен в "Очередь"',
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

  document.addEventListener(`keyup`, onEscModalClick);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', closeBackdrop);
}
function closeBackdrop(e) {
  if (e.target.classList.value === `backdrop`) {
    closeModal();
  }
}
function onEscModalClick(e) {
  if (e.key === `Escape`) {
    closeModal();
  }
}

function closeModal() {
  refs.bodyEl.classList.remove('modal-open');
  refs.backdrop.classList.add('is-hidden');
  const modalCard = document.querySelector('.filmcard');

  if (modalCard) {
    modalCard.remove();
  }
  document.removeEventListener(`keyup`, onEscModalClick);
  refs.closeModalBtn.removeEventListener('click', closeModal);
  refs.backdrop.removeEventListener('click', closeBackdrop);
}
