function calcularSueno() {
    const horaDormir = document.getElementById('bedtime').value;
    const horaDespertar = document.getElementById('waketime').value;

    if (!horaDormir || !horaDespertar) {
        alert('Por favor, ingresa ambas horas.');
        return;
    }

    const [horaD, minD] = horaDormir.split(':').map(Number);
    const [horaW, minW] = horaDespertar.split(':').map(Number);

    let fechaDormir = new Date();
    fechaDormir.setHours(horaD, minD, 0);

    let fechaDespertar = new Date();
    fechaDespertar.setHours(horaW, minW, 0);

    if (fechaDespertar <= fechaDormir) {
        fechaDespertar.setDate(fechaDespertar.getDate() + 1);
    }

    const difMs = fechaDespertar - fechaDormir;
    const difHoras = Math.floor(difMs / (1000 * 60 * 60));
    const difMinutos = Math.floor((difMs % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('resultado').textContent = `Total de sueño: ${difHoras} horas y ${difMinutos} minutos.`;

    let mensaje = '';
    if (difHoras >= 7 && difHoras <= 9) {
        mensaje = '¡Genial! Has dormido suficiente.';
    } else if (difHoras < 7) {
        mensaje = 'Considera dormir más para mejorar tu salud.';
    } else {
        mensaje = 'Has dormido más de lo necesario. Un exceso de sueño también puede afectar tu salud.';
    }

    document.getElementById('recomendacion').textContent = mensaje;
}

function calcularHoraIdealDespertar() {
    const horaDormir = document.getElementById('bedtime').value;

    if (!horaDormir) {
        alert('Por favor, ingresa la hora de dormir.');
        return;
    }

    const [horaD, minD] = horaDormir.split(':').map(Number);
    let fechaDormir = new Date();
    fechaDormir.setHours(horaD, minD, 0);

    const ciclosSueno = 6; // 6 ciclos de sueño de 90 minutos cada uno
    const duracionCiclo = 90 * 60 * 1000; // 90 minutos en milisegundos

    let fechaIdealDespertar = new Date(fechaDormir.getTime() + ciclosSueno * duracionCiclo);
    const horaIdeal = fechaIdealDespertar.getHours().toString().padStart(2, '0');
    const minIdeal = fechaIdealDespertar.getMinutes().toString().padStart(2, '0');

    document.getElementById('horaIdeal').textContent = `Hora ideal para despertar: ${horaIdeal}:${minIdeal}`;
}

document.getElementById('calcularIdeal').addEventListener('click', calcularHoraIdealDespertar);