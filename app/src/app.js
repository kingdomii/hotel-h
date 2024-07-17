import { renderAvailableSearchBtns } from "./presentation/render-available-search-btns.js";
import { renderHotelTitle } from "./presentation/render-hotel-title.js";
import { renderOrderingFilters } from "./presentation/render-reserved-order-filter.js";
import { renderRooms } from "./presentation/render-rooms.js";
import { renderSearchRoomTypeForm } from "./presentation/render-search-room-type-form.js";
import Storage from './storage/hotel-storage.js';

let HTMLElement;

export const App = (element) => {

    if (!HTMLElement) HTMLElement = document.querySelector(element);


    (() => {
        renderHotelTitle('.header__title');
        renderRooms(HTMLElement);
        renderAvailableSearchBtns();
        renderSearchRoomTypeForm();
        renderOrderingFilters();
    })();


    // Events

    const AvailabilityBtns = document.querySelectorAll('.search__availability-btn');
    AvailabilityBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;
            if (target.id === 'availableRoomsSearchBtn') {
                target.classList.add('inactive');
                document.querySelector('#unavailableRoomsSearchBtn').classList.remove('active');
                target.classList.add('active');
                Storage.setAvailableFilter(true);
                Storage.setOrderFilter(Storage.OrderFilter.Default);
                Storage.setTypeFilter(Storage.TypeFilter.All);
                unChecksBtns();
                renderOrderingFilters();
                renderRooms();
            } else {
                target.classList.add('inactive');
                document.querySelector('#availableRoomsSearchBtn').classList.remove('active');
                target.classList.add('active');
                Storage.setAvailableFilter(false);
                Storage.setTypeFilter(Storage.TypeFilter.All);
                Storage.setOrderFilter(Storage.OrderFilter.Default);
                unChecksBtns();
                renderOrderingFilters();
                renderRooms();
            }
        })
    })



    const typeChecks = document.querySelectorAll('.search__room-type-checkbox');
    typeChecks.forEach(input => {
        input.addEventListener('change', (event) => {
            event.preventDefault();
            const target = event.target;
            let others = Array.from(typeChecks).filter(check => check !== target);
            others.forEach(check => check.checked = false);
            if (target.checked) {
                Storage.setTypeFilter(target.name);
                renderRooms();
            }
            if(!target.checked) {
                Storage.setTypeFilter(Storage.TypeFilter.All);
                renderRooms();
            }
        })
    })

    const unChecksBtns = () => {
        typeChecks.forEach(check => check.checked = false);
    }


}