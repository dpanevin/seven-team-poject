import MoviesApi from './api-service';

import markupRender from './markupRender'
// import { alert } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

import getRefs from './refs';

const refs = getRefs();

const filmsApi = new MoviesApi; 

export default function onSearch(e) {

    e.preventDefault();

    const form = e.currentTarget;
    
    filmsApi.query = form.elements.query.value;

    form.reset();
    filmsApi.resetPage();

    try {
        if (filmsApi.query === '') {
            clearMarkup();
            filmsApi.fetchTrendingMovies().then(movies => {markupRender(movies);
            });
        } else {
            filmsApi.fetchMoviesByQuery().then(movies => {markupRender(movies);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

function clearMarkup() {
    refs.cardSetEl.innerHTML = '';
};

 
refs.searchForm.addEventListener('submit', onSearch);