import './sass/main.scss';
import { addSpinner, stopSpinner } from './js/spinner';
// вызывай функции addSpinner() или stopSpinner(), чтобы запустить или остановить спиннер

import markupRender from './js/markupRender';
// markupRender(filmCards); - здесь filmCards - объект JSON, который прилетает в ответ на успешный запрос

//---- заполнил страницу популярными фильмами ---------------------
import API from './js/api-service';
const movie = new API;
try {
    movie.fetchTrendingMovies().then(markupRender);
} catch (error) {
    console.log('Error ',error);
}
//-----------------------------------------------------------------
