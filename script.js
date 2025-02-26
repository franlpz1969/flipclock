// script.js

// Crear el reloj flip
function createFlipCard(value) {
    const card = document.createElement('div');
    card.className = 'flip-card';

    const inner = document.createElement('div');
    inner.className = 'flip-card-inner';

    const front = document.createElement('div');
    front.className = 'flip-card-front';
    front.textContent = value;

    const back = document.createElement('div');
    back.className = 'flip-card-back';
    back.textContent = value;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    return card;
}

// Actualizar el reloj flip
function updateFlipClock() {
    const timezone = document.getElementById('timezone').value;
    const clockContainer = document.getElementById('flip-clock');
    const colorPicker = document.getElementById('color');

    // Limpiar el contenedor del reloj
    clockContainer.innerHTML = '';

    // Obtener la hora actual en la zona horaria seleccionada
    const now = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
    const [hours, minutes, seconds] = now.split(':');

    // Dividir horas, minutos y segundos en dígitos individuales
    const digits = [
        ...hours.padStart(2, '0'),
        ':',
        ...minutes.padStart(2, '0'),
        ':',
        ...seconds.padStart(2, '0')
    ];

    // Crear tarjetas flip para cada dígito
    digits.forEach((digit) => {
        const card = createFlipCard(digit);
        clockContainer.appendChild(card);
    });

    // Cambiar el color del reloj
    const cards = document.querySelectorAll('.flip-card-front, .flip-card-back');
    cards.forEach((card) => (card.style.color = colorPicker.value));
}

// Animar el volteo de las tarjetas
function animateFlip(card, newValue) {
    const inner = card.querySelector('.flip-card-inner');
    const back = card.querySelector('.flip-card-back');

    back.textContent = newValue;
    inner.style.transform = 'rotateX(180deg)';
    setTimeout(() => {
        card.querySelector('.flip-card-front').textContent = newValue;
        inner.style.transform = 'rotateX(0deg)';
    }, 600); // Duración de la animación
}

// Configuración de la alarma
document.getElementById('set-alarm').addEventListener('click', () => {
    const alarmTime = document.getElementById('alarm-time').value;
    const alarmMessage = document.getElementById('alarm-message');

    if (!alarmTime) {
        alarmMessage.textContent = 'Por favor, configura una hora válida.';
        return;
    }

    const [hours, minutes] = alarmTime.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const timeUntilAlarm = alarmDate - now;

    if (timeUntilAlarm > 0) {
        setTimeout(() => {
            alarmMessage.textContent = '¡Alarma activada!';
            alert('¡Es hora!');
        }, timeUntilAlarm);
    } else {
        alarmMessage.textContent = 'La alarma no puede ser en el pasado.';
    }
});

// Actualizar el reloj cada segundo
setInterval(updateFlipClock, 1000);

// Iniciar el reloj al cargar la página
updateFlipClock();
