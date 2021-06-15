import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';

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
      console.log(user);
    })
    .catch(console.log);
}

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
const docRef = db.collection('watchedFilms');
// console.log(docRef);

// const filmEl = document.querySelector('.card__set');
// // console.log(filmEl);

// filmEl.addEventListener('click', onFilmClick);

// function onFilmClick(e) {
//   const filmID = e.target.dataset.attribute;
//   console.log(filmID);

//   docRef
//     .add({ id: filmID })
//     .then(function () {
//       console.log('Document successfully written!');
//     })
//     .catch(function (error) {
//       console.log('Error adding document: ', error);
//     });
// }

// const watchedEl = document.querySelector('.library__btn-watched');
// // console.log(watchedEl);

// watchedEl.addEventListener('click', onWatchedElClick);

// function onWatchedElClick() {
//   docRef.get().then(watchedFilms => {
//     watchedFilms.forEach(doc => {
//       const data = doc.data();
//       console.log(data);
//     });
//   });
// }
