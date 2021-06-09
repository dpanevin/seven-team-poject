import './sass/main.scss';
// import { addSpinner, stopSpinner } from './js/spinner';
// вызывай функции addSpinner() или stopSpinner(), чтобы запустить или остановить спиннер

import markupRender from './js/markupRender';
// markupRender(filmCards); - здесь filmCards - объект JSON, который прилетает в ответ на успешный запрос


//---- заполнил страницу популярными фильмами для вида (можно удалять) ---------------------
import API from './js/api-service';

const qwe = new API;

qwe.fetchTrendingMovies().then(x => {
    console.log(x);
    markupRender(x);
});
//---- конец импровизации