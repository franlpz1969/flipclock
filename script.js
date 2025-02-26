// script.js

// Función para actualizar el reloj
function updateClock() {
    const timezone = document.getElementById('timezone').value;
    const clockElement = document.getElementById('clock');
    const colorPicker = document.getElementById('color');

    // Obtener la hora en la zona horaria seleccionada
    const now = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
    clockElement.textContent = now;

    // Cambiar el color del reloj
    clockElement.style.color = colorPicker.value;
}

// Actualizar el reloj cada segundo
setInterval(updateClock, 1000);

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
        alarmDate.setDate(alarmDate.getDate() + 1); // Si la alarma ya pasó hoy, establecerla para mañana
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

// Iniciar el reloj al cargar la página
updateClock();
