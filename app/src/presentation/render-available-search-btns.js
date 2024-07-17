import Storage from '../storage/hotel-storage.js';

let HTMLelement;


export const renderAvailableSearchBtns = () => {

    if (!HTMLelement) HTMLelement = document.querySelector('#availableSearchBtns');

    const view = Storage.getAvailableFilter();

    const availableBtn = document.createElement('button');
    availableBtn.id = 'availableRoomsSearchBtn';
    availableBtn.type = 'button';
    availableBtn.innerText = 'Habitaciones Disponibles';
    availableBtn.classList.add('search__availability-btn')


    const unavailableBtn = document.createElement('button');
    unavailableBtn.id = 'unavailableRoomsSearchBtn';
    unavailableBtn.type = 'button';
    unavailableBtn.innerText = 'Habitaciones Reservadas';
    unavailableBtn.classList.add('search__availability-btn')


    if(view) {
        availableBtn.classList.add('active');
        
    } else {
        unavailableBtn.classList.add('active');
    }

    HTMLelement.append(availableBtn, unavailableBtn);

}