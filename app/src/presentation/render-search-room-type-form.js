import Storage from '../storage/hotel-storage.js';

let HTMLelement;

export const renderSearchRoomTypeForm = () => {

    if (!HTMLelement) HTMLelement = document.querySelector('#searchRoomTypeForm');

    const view = Storage.getCurrentTypeFilter();

    const individualLabel = document.createElement('label');
    individualLabel.innerText = 'Individual';
    const individualInput = document.createElement('input');
    individualInput.type = 'checkbox';
    individualInput.name = Storage.TypeFilter.Individual;
    individualInput.id = 'individualCheck';
    individualLabel.appendChild(individualInput);
    individualInput.classList.add('search__room-type-checkbox');

    const dobleLabel = document.createElement('label');
    dobleLabel.innerText = 'Doble';
    const dobleInput = document.createElement('input');
    dobleInput.type = 'checkbox';
    dobleInput.name = Storage.TypeFilter.Doble;
    dobleInput.id = 'dobleCheck';
    dobleLabel.appendChild(dobleInput);
    dobleInput.classList.add('search__room-type-checkbox');

    const suiteLabel = document.createElement('label');
    suiteLabel.innerText = 'Suite';
    const suiteInput = document.createElement('input');
    suiteInput.type = 'checkbox';
    suiteInput.name = Storage.TypeFilter.Suite;
    suiteInput.id = 'suiteCheck';
    suiteLabel.appendChild(suiteInput);
    suiteInput.classList.add('search__room-type-checkbox');

    if(view !== Storage.TypeFilter.All) {
        switch(view) {
            case Storage.TypeFilter.Individual:
                individualInput.checked = true;
                break;
            case Storage.TypeFilter.Doble:
                dobleInput.checked = true;
                break;
            case Storage.TypeFilter.Suite:
                suiteInput.checked = true;
                break;
        }

    }

    HTMLelement.append(individualLabel, dobleLabel, suiteLabel);


}