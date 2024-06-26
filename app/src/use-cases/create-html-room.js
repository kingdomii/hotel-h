export const createHTMLRoom = (room) => {
    const roomElement = document.createElement('div');
    roomElement.classList.add('room');
    roomElement.setAttribute('data-room', room.number);

    let availability = room.available ? 'Si' : 'No';

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    let checkin = room.checkin !== "" ? new Date(addDays(room.checkin, 1)).toLocaleDateString("es-US") : 'No Registrada';

    let button = {
        name: '',
        class: '',
    };

    if (room.available) {
        button.name = 'Reservar';
        button.class = 'reserve__btn';
    } else {
        button.name = 'Cancelar Reserva';
        button.class = 'cancel__reserve__btn';
    }

    const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
    }

    today.month = today.month < 10 ? `0${today.month}` : today.month;

    today.day = today.day < 10 ? `0${today.day}` : today.day;

    const isShow = room.checkin !== "" ? 'style="display: none"' : '';

    const noShow = room.checkin === "" ? 'style="display: none"' : '';

    roomElement.innerHTML = `
        <picture>
            <img src="${room.picture}" alt="Imagen de Habitación">
        </picture>
        <div class="room__info">
        <header>
            <h3>${room.type}</h3>
        </header>
        <div>
            <p><strong>Numero de Habitación:</strong> ${room.number}</p>
            <p><strong>Precio:</strong> ${room.price}</p>
            <p><strong>Disponible:</strong> ${availability}</p>
            <p ${noShow}><strong>Fecha de Ingreso:</strong> ${checkin}</p>
        </div>
        <form ${isShow} class="checkin__date__form">
            <label>
                <strong>Fecha de Ingreso</strong>
                <input type="date" name="checkinDate" min="${today.year}-${today.month}-${today.day}" placeholder="Fecha de Checkin" required>
            </label>
        </form>
        <div>
            <button class="${button.class}">${button.name}</button>
        </div>
        </div>
    `;

    return roomElement;
}