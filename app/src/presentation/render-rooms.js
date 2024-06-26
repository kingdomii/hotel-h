import Storage from '../storage/hotel-storage.js';
import {createHTMLRoom} from '../use-cases/create-html-room.js';

let HTMLElement;

export const renderRooms = (element) => {

    if (!HTMLElement) HTMLElement = element;

    HTMLElement.innerHTML = '';

    Storage.updateCurrentView();

    let view = Storage.getCurrentView();

    if (view.length === 0) {
        HTMLElement.innerHTML = '<h2>No hay habitaciones disponibles</h2>';
        return;
    }

    view.forEach(room => {
        HTMLElement.append(createHTMLRoom(room));
    })

    const reserveBtn = document.querySelectorAll('.reserve__btn');
    reserveBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const target = event.target;
            const roomElement = target.closest('.room');
            let roomNumber = roomElement.getAttribute('data-room');
            let checkinDate = roomElement.querySelector('input[name="checkinDate"]').value;
            roomNumber *= 1;
            if(checkinDate === "") {
                alert('Debe seleccionar una fecha de ingreso');
                return;
            };
            Storage.reserveRoom(roomNumber, checkinDate);
        });
    })


    const cancelBtn = document.querySelectorAll('.cancel__reserve__btn');
    cancelBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const target = event.target;
            const roomElement = target.closest('.room');
            let roomNumber = roomElement.getAttribute('data-room');
            roomNumber *= 1;
            Storage.cancelReserve(roomNumber);
        });
    })

};