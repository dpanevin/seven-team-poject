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
  };

  return refs;
}
