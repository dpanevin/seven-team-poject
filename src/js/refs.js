export default function getRefs() {
    const refs = {
      cardSetEl: document.querySelector('.card__set'),
      cardItemEl: document.querySelector('.card__item'),
      searchForm: document.querySelector('.search__form'),
      closeModalBtn: document.querySelector('[data-modal-close]'),
      modal: document.querySelector('.modal'),
      backdrop: document.querySelector('.backdrop'),
      modalCard: document.querySelector('.filmcard'),
      modalCard: document.querySelector('.filmcard'),
      bodyEl: document.querySelector('body'),
      logoEl: document.querySelector("logo"),
      navHome: document.querySelector('.home'),
      navLibr: document.querySelector('.libr'),
      searchLine: document.querySelector('.search__line'),
      libBtn: document.querySelector('.library__btn'),
      carSetEl: document.querySelector('.card__set'),
      logoEl: document.querySelector(".logo"),
      header: document.querySelector(".header"),
      markupModal:document.querySelector("ul.team"),
      teamLink:document.querySelector(".footer__caption-link"),
      teamCard:document.querySelector(".team__card")
  };

  return refs;
}
