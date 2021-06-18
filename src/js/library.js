import firebase from 'firebase/app';
import 'firebase/auth';
import { docWatched, docQueued } from './modal';
export { watchedPageRender };
import getRefs from './refs';
import { addSpinner, stopSpinner } from './spinner';

const refs = getRefs();

const homeEl = document.querySelector('.libr');
homeEl.addEventListener('click', onWatchedElClick);

document.addEventListener('DOMContentLoaded', event => {
  const app = firebase.app();
  // console.log(app);
});

const loginEl = document.querySelector('.auth');
const logoutEl = document.querySelector('.logout');

loginEl.addEventListener('click', googleLogin);
logoutEl.addEventListener('click', googleLogout);

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      // console.log(user);
      loginEl.innerText = `Вы вошли как ${user.displayName}`;
      localStorage.setItem('status', 'loggedin');
      localStorage.setItem('userName', `${user.displayName}`);
      logoutEl.classList.remove('visually-hidden');
    })
    .catch(console.log);
}

function googleLogout() {
  firebase
    .auth()
    .signOut()
    .then(result => {
      loginEl.innerText = `ВОЙТИ`;
      localStorage.setItem('status', '');
      localStorage.setItem('userName', '');
      logoutEl.classList.add('visually-hidden');
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
}

if (localStorage.getItem('status') === 'loggedin') {
  loginEl.innerText = `Вы вошли как ${localStorage.getItem('userName')}`;
  logoutEl.classList.remove('visually-hidden');
}

const watchedEl = document.querySelector('.library__btn-watched');
// console.log(watchedEl);

watchedEl.addEventListener('click', onWatchedElClick);

const cardSetEl = document.querySelector('.card__set');

function onWatchedElClick() {
  refs.paginationEl.innerHTML = '';
  watchedEl.classList.add('library__btn-clicked');
  queuedEl.classList.remove('library__btn-clicked');
  watchedPageRender();
}

function watchedPageRender() {
  addSpinner();
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
      stopSpinner();
    });
  });
}

const queuedEl = document.querySelector('.library__btn-queue');
// console.log(queuedEl);
queuedEl.addEventListener('click', onQueuedElClick);

function onQueuedElClick() {
  refs.paginationEl.innerHTML = '';
  queuedEl.classList.add('library__btn-clicked');
  watchedEl.classList.remove('library__btn-clicked');
  queuePageRender();
}
function queuePageRender() {
  addSpinner();
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
      stopSpinner();
    });
  });
}
