import MoviesApi from './api-service';

import createMarkup from './markupRender'
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import getRefs from './refs';

const refs = getRefs();

const filmsApi = new MoviesApi; 

export default function onSearch(e) {

    e.preventDefault();

    const form = e.currentTarget;
    
    filmsApi.query = form.elements.query.value;

    // form.reset();
    filmsApi.resetPage();

    try {
        if (filmsApi.query === '') {
            clearMarkup();
            onFetchError();
            filmsApi.fetchTrendingMovies().then(movies => {
                createMarkup(movies);
            });
        } 
        else {
            filmsApi.fetchMoviesByQuery().then(movies => {createMarkup(movies);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

function clearMarkup() {
    refs.cardSetEl.innerHTML = '';
};

function onFetchError() {
    alert({
      text: 'Search field is empty. Please enter the movie name!',
    });
}
 
refs.searchForm.addEventListener('submit', onSearch);
