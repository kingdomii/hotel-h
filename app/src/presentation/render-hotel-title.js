import Storage from '../storage/hotel-storage.js';

let HTMLelement;

export const renderHotelTitle = (element) => {

    if (!HTMLelement) HTMLelement = document.querySelector(element);

    HTMLelement.innerHTML = '';

    let hotel = Storage.getHotelData();

    const hotelName = document.createElement('h1');
    hotelName.classList.add('hotel-title__name');
    hotelName.textContent = hotel.name;

    const hotelLocation = document.createElement('span');
    hotelLocation.classList.add('hotel-title__location');
    hotelLocation.textContent = hotel.location;

    const hotelTeam = document.createElement('span');
    hotelTeam.classList.add('hotel-title__team');
    hotelTeam.textContent = hotel.team;

    HTMLelement.append(hotelName, hotelLocation, hotelTeam);

}