import Pagination from 'tui-pagination';
import arrow from '../images/sprite.svg';
import getRefs from './refs';
import { moviesApi } from '../index';
import { pageRender } from './home';
import markupRender from './markupRender';
import { watchedPageRender } from './library';
export { initPagination };
import { renderSearchPage } from './search';

const refs = getRefs();

const pageOptions = {
  // below default value of options
  totalItems: 800,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      `<svg class="tui-ico-{{type}}"><use href="${arrow}#arrow-{{type}}"></use></svg>` +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      `<svg class="tui-ico-{{type}}"><use href="${arrow}#arrow-{{type}}"></use></svg>` +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

function initPagination() {
  if (moviesApi.totalResults <= 20) {
    refs.paginationEl.innerHTML = '';
    return;
  }

  pageOptions.totalItems = moviesApi.totalResults;
  const instance = new Pagination(refs.paginationEl, pageOptions);
  instance.on('afterMove', onPageMoving);
}

function onPageMoving(evt) {
  const currentEl = document.querySelector('.current');
  pageOptions.totalItems = moviesApi.totalResults;

  if (refs.navHome === currentEl) {
    onHomeIsCurrent(evt);
  } else if (refs.navLibr === currentEl) {
    onLibIsCurrent();
  }
}

function onHomeIsCurrent(evt) {
  var currentPage = evt.page;

  if (moviesApi.currentRequest === 'trending') {
    moviesApi.page = currentPage;
    pageRender(moviesApi, markupRender);
  } else if (moviesApi.currentRequest === 'search') {
    moviesApi.page = currentPage;
    renderSearchPage(moviesApi);
  }

  // refs.cardSetEl.scrollIntoView(top);
}

function onLibIsCurrent() {
  refs.paginationEl.innerHTML = '';
}
