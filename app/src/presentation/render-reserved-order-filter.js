import Storage from "../storage/hotel-storage.js";
import { renderRooms } from "./render-rooms.js";

let HTMLelement;

export const renderOrderingFilters = () => {

    if (!HTMLelement) HTMLelement = document.querySelector('#orderReserveFilters');

    HTMLelement.innerHTML = '';

    const availableFilter = Storage.getAvailableFilter();

    if(availableFilter)  return;


    HTMLelement.innerHTML = 
    `
        <select id="orderReserveFilter">
            <option value="">Elija un Filtro</option>
            <option value="OrderNumAsc">Ordenar Por Habitación Asc</option>
            <option value="OrderNumDesc">Ordenar Por Habitación Desc</option>
            <option value="OrderDateAsc">Ordenar Por Fecha Asc</option>
            <option value="OrderDateDesc">Ordenar Por Fecha Desc</option>
        </select>
    `;

    const orderReserveFilter = document.querySelector('#orderReserveFilter');

    orderReserveFilter.addEventListener('change', (event) => {
        const target = event.target;
        const value = target.value;
        Storage.setOrderFilter(value);
        renderRooms();
    })

}