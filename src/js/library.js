import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdl0b3K_4fjMGLjZ2-JHtxj81J32at2gE',
  authDomain: 'seven-team-project.firebaseapp.com',
  projectId: 'seven-team-project',
  storageBucket: 'seven-team-project.appspot.com',
  messagingSenderId: '43069771775',
  appId: '1:43069771775:web:2d2b8e1e8f2b325d7de1ca',
};

firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore();
// console.log(firestore);

const docRef = firestore.doc('watchedFilms/watchedFilmsID');
// console.log(docRef);

const filmEl = document.querySelector('.card__set');
// console.log(filmEl);

filmEl.addEventListener('click', onFilmClick);

function onFilmClick(e) {
  const filmID = e.target.dataset.attribute;
  // console.log(filmID);

  docRef
    .set({
      film: filmID,
    })
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.log('Error adding document: ', error);
    });
}

const watchedEl = document.querySelector('.library__btn-watched');
// console.log(watchedEl);

watchedEl.addEventListener('click', onWatchedElClick);

function onWatchedElClick() {
  docRef
    .get()
    .then(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        console.log(myData.film);
      }
    })
    .catch(function (error) {
      console.log('Error adding document: ', error);
    });
}
