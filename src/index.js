import './sass/main.scss';
import { addSpinner, stopSpinner } from './js/spinner';
// вызывай функции addSpinner() или stopSpinner(), чтобы запустить или остановить спиннер
import './js/header'
import markupRender from './js/markupRender';
// markupRender(filmCards); - здесь filmCards - объект JSON, который прилетает в ответ на успешный запрос

//---- заполнил страницу популярными фильмами ---------------------
import API from './js/api-service';

import homePageRender from './js/home';
import './js/header'


homePageRender(API, markupRender);
//-------------------------------------------------------------
import onSearch from './js/search';
// MODAL ======================================
import './js/modal'
const moviesApi = new API();
import './js/pagination'