
import filmcard from './../templates/filmcard-modal.hbs';
import MoviesApi from './api-service';
import getRefs from './refs';

//======================================================
const refs = getRefs();
const movieapi = new MoviesApi();
//======================================================
    

export default function onClickCard(evt) {
   if (!evt.target.dataset.attribute) {
    return;
    }
    const idCard = evt.target.dataset.attribute;
  
    refs.backdrop.classList.toggle('is-hidden');
    refs.bodyEl.classList.add('modal-open');

    async function e() {
        
      
    const renderId = await movieapi.fetchMovieById(idCard);
        // const markup = ;
       
    refs.modal.insertAdjacentHTML('beforeend', filmcard(renderId));
    return renderId;
}
    e();
    document.addEventListener(`keyup`, onEscModalClick);
    refs.closeModalBtn.addEventListener('click', closeModal);
    refs.backdrop.addEventListener('click', closeBackdrop)

}

function closeBackdrop(e) {
   if (e.target.classList.value === `backdrop`) { closeModal(); }
    
}

function onEscModalClick(e) {
        if( e.key === `Escape` ) {closeModal();}
}

function closeModal() {
    refs.bodyEl.classList.remove('modal-open');
    refs.backdrop.classList.add('is-hidden');

    const modalCard = document.querySelector('.filmcard')

    if (modalCard) {  
    modalCard.remove()  
    }
    
    document.removeEventListener(`keyup`, onEscModalClick);
    refs.closeModalBtn.removeEventListener('click', closeModal); 
};

 

