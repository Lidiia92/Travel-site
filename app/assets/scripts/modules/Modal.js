import $ from 'jquery';

class Modal {
    //selecting elements we will need to open the modal
    constructor() {
        this.openModalButton = $('.open-modal');
        this.modal = $('.modal');
        this.closeModalButton = $('.modal__close');
        this.events();
    }
    
    events() {
        //clicking the open modal button
        // this keyword stays to what its currently set to with bind method
        this.openModalButton.click(this.openModal.bind(this)); 
        
        //clicking the closing modal button
         this.closeModalButton.click(this.closeModal.bind(this));
        
        //pushes any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }
    
    keyPressHandler(e) {
        if(e.keyCode == 27) {
            this.closeModal();
        }
    }
    
    openModal() {
        this.modal.addClass('modal--is-visible');
        return false; /* 1 */
    }
    
    closeModal() {
        this.modal.removeClass('modal--is-visible');
    }
}

export default Modal;

/* 

1.When you click our button link the browser automatically scrolls to the top of the page, we are returning dalse to prevent that default bahavior;

*/