import homePageRender from './home';
import MovieAPI from './api-service';
import markupRender from './markupRender';

const movieAPI = new MovieAPI();

const refs = {
  navHome: document.querySelector('.home'),
  navLibr: document.querySelector('.libr'),
  searchLine: document.querySelector('.search__line'),
  libBtn: document.querySelector('.library__btn'),
  carSetEl: document.querySelector('.card__set'),
  logoEl: document.querySelector('.logo'),
};
refs.navLibr.addEventListener('click', onLibrClick);
function onLibrClick(event) {
  event.preventDefault();
  refs.searchLine.classList.add('visually-hidden');
  refs.libBtn.classList.remove('visually-hidden');
  refs.navLibr.classList.add('current');
  refs.navHome.classList.remove('current');
  refs.carSetEl.innerHTML = '';
}

refs.logoEl.addEventListener('click', onRenderPage);

function onRenderPage() {
  event.preventDefault();
  refs.navHome.classList.add('current');
  refs.navLibr.classList.remove('current');
  refs.libBtn.classList.add('visually-hidden');
  refs.searchLine.classList.remove('visually-hidden');
  homePageRender(movieAPI, markupRender);
}
