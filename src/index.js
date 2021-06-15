import './sass/main.scss';
import MovieAPI from './js/api-service';
const movieAPI = new MovieAPI;
import { addSpinner, stopSpinner } from './js/spinner';
// вызывай функции addSpinner() или stopSpinner(), чтобы запустить или остановить спиннер
import './js/header';
import markupRender from './js/markupRender';
import homePageRender from './js/home';
import './js/header'
import onSearch from './js/search';
import './js/modal';
import './js/library';
import './js/pagination';


homePageRender(movieAPI, markupRender);

import './js/modal'
import getRefs from './js/refs';

const refs = getRefs();

