import './sass/main.scss';
import { addSpinner, stopSpinner } from './js/spinner';
// вызывай функции addSpinner() или stopSpinner(), чтобы запустить или остановить спиннер
const l = document.querySelector(".modal");
import filmcard from './templates/filmcard-modal.hbs';
import MoviesApi from './js/api-service';
const movieapi = new MoviesApi();

async function e() {
    const r = await movieapi.fetchMovieById("34335");
    const markup = filmcard(r);
    l.innerHTML = markup;
    return r;
}

e();