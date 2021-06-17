import {homePageRender} from './home';
import markupRender from './markupRender';
import getRefs from './refs';
import {moviesApi} from '../index'
const refs = getRefs();
/* const refs = {
  navHome: document.querySelector('.home'),
  navLibr: document.querySelector('.libr'),
  searchLine: document.querySelector('.search__line'),
  libBtn: document.querySelector('.library__btn'),
  carSetEl: document.querySelector('.card__set'),
  logoEl: document.querySelector(".logo"),
  header: document.querySelector(".header"),
}; */

refs.navLibr.addEventListener('click', onLibrClick);
function onLibrClick(event) {
  event.preventDefault();
  refs.searchLine.classList.add('visually-hidden');
  refs.libBtn.classList.remove('visually-hidden');
  refs.navLibr.classList.add('current');
  refs.navHome.classList.remove('current');
  refs.header.classList.remove('header');
  refs.header.classList.add('library');
  refs.carSetEl.innerHTML = '';
}

refs.logoEl.addEventListener('click', onRenderPage);
refs.navHome.addEventListener('click',onRenderPage );

function onRenderPage(event) {
  event.preventDefault();
  refs.navHome.classList.add('current');
  refs.navLibr.classList.remove('current');
  refs.libBtn.classList.add('visually-hidden');
  refs.searchLine.classList.remove('visually-hidden');
  refs.header.classList.add('header');
  refs.header.classList.remove('library');
  homePageRender(moviesApi, markupRender);
}

