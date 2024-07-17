import { orderByDateAsc, orderByDateDesc } from "../data-structures/sorting-reserved-rooms-by-date.js";
import { orderByNumberAsc, orderByNumberDesc } from "../data-structures/sorting-reserved-rooms-by-number.js";
import { hotel } from "../data/hotel-data.js";
import { renderRooms } from "../presentation/render-rooms.js";

const TypeFilter = {
    All: 'All',
    Individual: 'Individual',
    Doble: 'Doble',
    Suite: 'Suite',
}

const OrderFilter = {
    Default: 'Default',
    OrderNumAsc: 'OrderNumAsc',
    OrderNumDesc: 'OrderNumDesc',
    OrderDateAsc: 'OrderDateAsc',
    OrderDateDesc: 'OrderDateDesc',
}

let state = {
    typeFilter: TypeFilter.All,
    orderFilter: OrderFilter.Default,
    availableFilter: true,
    rooms: [],
    currentView: [],
}

const init = () => {
    loadStorage();
}

const loadStorage = () => {
    let data = getFromStorage('rooms');
    let currentView;
    if(!data) {
        setToStorage('typeFilter', state.typeFilter);
        setToStorage('availableFilter', state.availableFilter);
        setToStorage('orderFilter', state.orderFilter);
        currentView = hotel.rooms.filter(room => room.available === state.availableFilter);
        if(state.typeFilter !== TypeFilter.All) {
            currentView = currentView.filter(room => room.type === state.typeFilter);
        }
        setToStorage('currentView', currentView);
        setToStorage('rooms', hotel.rooms);
        window.location.reload();
    } else {
        state.typeFilter = getFromStorage('typeFilter');
        state.availableFilter = getFromStorage('availableFilter');
        state.orderFilter = getFromStorage('orderFilter');
        state.rooms = getFromStorage('rooms');
        currentView = state.rooms.filter(room => room.available === state.availableFilter);
        if(state.typeFilter !== TypeFilter.All) {
            currentView = currentView.filter(room => room.type === state.typeFilter);
        }
        setToStorage('currentView', currentView);
    }
    state.currentView = currentView;
}

const getCurrentView = () => {
    return state.currentView;
}

const getAvailableFilter = () => {
    return state.availableFilter;
}

const getFromStorage = (key) => {
    let data = sessionStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
}

const setToStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}

const getCurrentTypeFilter = () => {
    return state.typeFilter;
}

const getCurrentOrderFilter = () => {
    return state.orderFilter;
}

const setTypeFilter = (type) => {
    if(isTypeFilter(type)) {
        state.typeFilter = type;
        setToStorage('typeFilter', type);
    }
}

const setOrderFilter = (type) => {
    if (isOrderFilter(type)) {
        state.orderFilter = type;
        setToStorage('orderFilter', type);
    }
}

const setAvailableFilter = (available) => {
    if(typeof available === 'boolean') {
        state.availableFilter = available;
        setToStorage('availableFilter', available);
    }
}

const isTypeFilter = (type) => {
    for(let i = 0; i < Object.keys(TypeFilter).length; i++) {
        if(type === TypeFilter[Object.keys(TypeFilter)[i]]) return true;
    }
    return false;
}

const isOrderFilter = (type) => {
    for (let i = 0; i < Object.keys(OrderFilter).length; i++) {
        if (type === OrderFilter[Object.keys(OrderFilter)[i]]) return true;
    }
    return false;
}

const updateCurrentView = () => {
    let currentView = state.rooms.filter(room => room.available === state.availableFilter);
    if(state.typeFilter !== TypeFilter.All) {
        currentView = currentView.filter(room => room.type === state.typeFilter);
    }
    if(state.orderFilter !== OrderFilter.Default) {
        currentView = orderReserves(state.orderFilter);
    }
    setToStorage('currentView', currentView);
    state.currentView = currentView;
}

const updateRooms = (update) => {
    const room = state.rooms.find(room => room.number === update.number);
    room.available = update.available;
    room.checkin = update.checkin;
    setToStorage('rooms', state.rooms);
}

const reserveRoom = (roomNumber, checkinDate) => {
    const room = state.currentView.find(room => room.number === roomNumber);
    room.available = false;
    room.checkin = new Date(checkinDate);
    updateRooms(room);
    alert('Reserva realizada con éxito');
    renderRooms();
}

const cancelReserve = (roomNumber) => {
    const room = state.currentView.find(room => room.number === roomNumber);
    room.available = true;
    room.checkin = "";
    updateRooms(room);
    alert('Reserva cancelada con éxito');
    renderRooms();
}

const orderReserves = (value) => {
    let newView;
    switch(value) {
        case OrderFilter.OrderNumAsc:
            newView = orderByNumberAsc(state.currentView);
            break;
        case OrderFilter.OrderNumDesc:
            newView = orderByNumberDesc(state.currentView);
            break;
        case OrderFilter.OrderDateAsc:
            newView = orderByDateAsc(state.currentView);
            break;
        case OrderFilter.OrderDateDesc:
            newView = orderByDateDesc(state.currentView);
            break;
        default:
            return;
    }
    return newView;
}

const getHotelData = () => {
    return hotel;
}


export default {
    init,
    getFromStorage,
    setToStorage,
    setTypeFilter,
    getCurrentTypeFilter,
    getCurrentView,
    getAvailableFilter,
    setAvailableFilter,
    updateCurrentView,
    reserveRoom,
    cancelReserve,
    orderReserves,
    getCurrentOrderFilter,
    setOrderFilter,
    getHotelData,
    OrderFilter,
    TypeFilter,
}