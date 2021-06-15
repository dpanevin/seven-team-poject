import firebase from 'firebase/app';
import 'firebase/auth';
import { docWatched, docQueued } from './modal';

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

function onWatchedElClick() {
  docWatched.get().then(watchedFilms => {
    watchedFilms.forEach(doc => {
      const data = doc.data();
      console.log(data);
    });
  });
}

const queuedEl = document.querySelector('.library__btn-queue');
// console.log(queuedEl);
queuedEl.addEventListener('click', onQueuedElClick);

function onQueuedElClick() {
  docQueued.get().then(queuedFilms => {
    queuedFilms.forEach(doc => {
      const data = doc.data();
      console.log(data);
    });
  });
}
