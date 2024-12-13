const form = document.querySelector('#mortgageForm');
const contentGeneralUno = document.querySelector('#contenidoGeneralUno');
const contentGeneralDos = document.querySelector('#contentGeneralDos');
const clearButton = document.querySelector('#clearButton');
const monto = document.querySelector('#monto');
const years = document.querySelector('#years');
const porcent = document.querySelector('#porcent');
const inputGeneralDos1 = document.querySelector('#inputGeneralDos1');
const inputGeneralDos2 = document.querySelector('#inputGeneralDos2');
const parrafo = document.querySelector('#parrafo');
const image1 = document.querySelector('#image1');
const buttonCalculator = document.querySelector('#buttonCalculator');
const errorMonto = document.querySelector('#errorMonto');
const errorYears = document.querySelector('#errorYears');
const errorPorcent = document.querySelector('#errorPorcent');
const radioRepayment = document.querySelector('#flexRadioDefault1');
const radioInterestOnly = document.querySelector('#flexRadioDefault2');


function calculatePayment(monto, porcent, years) {
    const tasaMensual = porcent / 100 / 12;
    const totalPagos = years * 12;
    const numerador = monto * tasaMensual * Math.pow(1 + tasaMensual, totalPagos);
    const denominador = Math.pow(1 + tasaMensual, totalPagos) - 1;
    const pagoMensual = numerador / denominador;
    return pagoMensual.toFixed(2);
}


function calculateInterest(monto, porcent) {
    return (monto * (porcent / 100)).toFixed(2);
}


form.addEventListener('submit', function (e) {
    e.preventDefault();


    clearErrors();

    const montoValor = parseFloat(monto.value);
    const porcentValor = parseFloat(porcent.value);
    const yearsValor = parseInt(years.value);

    let valid = true;


    if (isNaN(montoValor)) {
        monto.classList.add('input-error');
        errorMonto.classList.remove('d-none');
        valid = false;
    }

    if (isNaN(yearsValor)) {
        years.classList.add('input-error');
        errorYears.classList.remove('d-none');
        valid = false;
    }

    if (isNaN(porcentValor)) {
        porcent.classList.add('input-error');
        errorPorcent.classList.remove('d-none');
        valid = false;
    }

    if (!valid) return;


    let result;
    if (radioRepayment.checked) {
        result = calculatePayment(montoValor, porcentValor, yearsValor);
        inputGeneralDos2.value = `€ ${result}`;
    } else if (radioInterestOnly.checked) {
        result = calculateInterest(montoValor, porcentValor);
        inputGeneralDos1.value = `€ ${result}`;
    }


    contentGeneralUno.classList.add('d-none');
    contentGeneralDos.classList.remove('d-none');
});


function clearErrors() {
    monto.classList.remove('input-error');
    years.classList.remove('input-error');
    porcent.classList.remove('input-error');
    errorMonto.classList.add('d-none');
    errorYears.classList.add('d-none');
    errorPorcent.classList.add('d-none');
}


clearButton.addEventListener('click', function () {
    form.reset();
    clearErrors();
    contentGeneralUno.classList.remove('d-none');
    contentGeneralDos.classList.add('d-none');
    inputGeneralDos1.value = '';
    inputGeneralDos2.value = '';
});
