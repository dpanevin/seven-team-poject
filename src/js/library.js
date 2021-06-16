import firebase from 'firebase/app';
import 'firebase/auth';
import { docWatched, docQueued } from './modal';

const homeEl = document.querySelector('.libr');
homeEl.addEventListener('click', onWatchedElClick);

document.addEventListener('DOMContentLoaded', event => {
  const app = firebase.app();
  // console.log(app);
});

const loginEl = document.querySelector('.auth');

loginEl.addEventListener('click', googleLogin);

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      loginEl.innerText = `Вы вошли как ${user.displayName}`;
      // console.log(user);
    })
    .catch(console.log);
}

const watchedEl = document.querySelector('.library__btn-watched');
// console.log(watchedEl);

watchedEl.addEventListener('click', onWatchedElClick);

const cardSetEl = document.querySelector('.card__set');

function onWatchedElClick() {
  watchedEl.classList.add('library__btn-clicked');
  queuedEl.classList.remove('library__btn-clicked');
  cardSetEl.innerHTML = '';
  docWatched.get().then(watchedFilms => {
    watchedFilms.forEach(doc => {
      const id = doc.data().id;
      // console.log(id);
      const src = doc.data().src;
      // console.log(src);
      const vote = doc.data().vote;
      // console.log(vote);
      const name = doc.data().name;
      // console.log(name);
      const genre = doc.data().genre;
      // console.log(genre);
      const date = doc.data().date;
      // console.log(date);

      const makeLibrary = (id, src, vote, name, genre, date) => {
        return `
  <li class='card__item' data-attribute='${id}'>
    <div class='card__info' data-attribute='${id}'>
      <img class="card__img" 
      src='${src}' 
      alt='постер фильма' 
      data-attribute='${id}' />
      <div class='card__description' data-attribute='${id}'>
        <p class='film__title'  data-attribute='${id}'>
          ${name}
        </p>
        <div class='film__description'  data-attribute='${id}'>
          <p class='film__genre' data-attribute='${id}'>
            ${genre}
          </p>
          <p class='film__release'  data-attribute='${id}'>
            ${date}
          </p>
          <p class='film__rating'  data-attribute='${id}'>
            ${vote}
          </p>
        </div>
      </div>
    </div>
  </li>
`;
      };

      const markup = makeLibrary(id, src, vote, name, genre, date);

      const libraryEl = document.querySelector('.card__set');
      libraryEl.insertAdjacentHTML('afterbegin', markup);
    });
  });
}

const queuedEl = document.querySelector('.library__btn-queue');
// console.log(queuedEl);
queuedEl.addEventListener('click', onQueuedElClick);

function onQueuedElClick() {
  queuedEl.classList.add('library__btn-clicked');
  watchedEl.classList.remove('library__btn-clicked');
  cardSetEl.innerHTML = '';
  docQueued.get().then(queuedFilms => {
    queuedFilms.forEach(doc => {
      const id = doc.data().id;
      // console.log(id);
      const src = doc.data().src;
      // console.log(src);
      const vote = doc.data().vote;
      // console.log(vote);
      const name = doc.data().name;
      // console.log(name);
      const genre = doc.data().genre;
      // console.log(genre);
      const date = doc.data().date;
      // console.log(date);

      const makeLibrary = (id, src, vote, name, genre, date) => {
        return `
  <li class='card__item' data-attribute='${id}'>
    <div class='card__info' data-attribute='${id}'>
      <img class="card__img" 
      src='${src}' 
      alt='постер фильма' 
      data-attribute='${id}' />
      <div class='card__description' data-attribute='${id}'>
        <p class='film__title'  data-attribute='${id}'>
          ${name}
        </p>
        <div class='film__description'  data-attribute='${id}'>
          <p class='film__genre' data-attribute='${id}'>
            ${genre}
          </p>
          <p class='film__release'  data-attribute='${id}'>
            ${date}
          </p>
          <p class='film__rating'  data-attribute='${id}'>
            ${vote}
          </p>
        </div>
      </div>
    </div>
  </li>
`;
      };

      const markup = makeLibrary(id, src, vote, name, genre, date);

      const libraryEl = document.querySelector('.card__set');
      libraryEl.insertAdjacentHTML('afterbegin', markup);
    });
  });
}
