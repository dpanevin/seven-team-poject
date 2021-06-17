import './sass/main.scss';
import MoviesApi from './js/api-service';
const moviesApi = new MoviesApi;
export {moviesApi};
import { addSpinner, stopSpinner } from './js/spinner';
// вызывай функции addSpinner() или stopSpinner(), чтобы запустить или остановить спиннер
import './js/header';
import markupRender from './js/markupRender';
import {homePageRender} from './js/home';
import './js/header'
import {onSearch} from './js/search';
import './js/modal';
import './js/library';
import { initPagination } from './js/pagination';


homePageRender(moviesApi, markupRender);

import './js/modal'
import './js/teamCard';
import getRefs from './js/refs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onFormSubmit);
async function onFormSubmit(e) {
    e.preventDefault();
    await onSearch(e, moviesApi);
    initPagination();
}

// refs.searchForm.addEventListener('submit', () => {
//     onSearch(e, API);
// });
