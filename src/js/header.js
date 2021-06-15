const refs = {
    navHome:document.querySelector(".home"),
    navLibr:document.querySelector(".libr"),
    searchLine:document.querySelector(".search__line"),
    libBtn:document.querySelector(".library__btn"),
    logo:document.querySelector(".logo"),
}
refs.navLibr.addEventListener('click', onLibrClick);
function onLibrClick(event) {
    event.preventDefault();
    refs.searchLine.classList.add('visually-hidden');
    refs.libBtn.classList.remove('visually-hidden');
    refs.navLibr.classList.add('current');
    refs.navHome.classList.remove('current');
  };

  refs.navHome.addEventListener('click', onHomeClick);
  function onHomeClick(event) {
    event.preventDefault();
    refs.navHome.classList.add('current');
    refs.navLibr.classList.remove('current');
    refs.libBtn.classList.add('visually-hidden');
    refs.searchLine.classList.remove('visually-hidden');
}

refs.logo.addEventListener('click', onRenderPage);

function onRenderPage(){
  refs.navHome.classList.add('current');
  refs.navLibr.classList.remove('current');
  refs.libBtn.classList.add('visually-hidden');
  refs.searchLine.classList.remove('visually-hidden');
}