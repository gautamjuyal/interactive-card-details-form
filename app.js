//dummy card elements
const dummyCardNumber = document.getElementById('dummy-card-number');
const dummyCardName = document.getElementById('dummy-card-name')
const dummyCardMonth = document.querySelector('#dummy-card-exp span:first-of-type');
const dummyCardYear = document.querySelector('#dummy-card-exp span:last-of-type');
const dummyCardCvc = document.getElementById('dummy-card-cvc');


// buttons
const confirmBtn = document.getElementById('confirm-btn');


//form input fields
const inputFieldName = document.getElementById('inputFieldName');
const inputFieldCardNumber = document.getElementById('inputFieldCardNumber');
const inputFieldMonth = document.getElementById('inputFieldMonth');
const inputFieldYear = document.getElementById('inputFieldYear');
const inputFieldCvc = document.getElementById('inputFieldCvc');

//sections

const completeState = document.querySelector('.complete-state');
const originalForm = document.querySelector('.form');


//functions

function changeDummyCardContent(dummyElement, formField) {
    formField.addEventListener('change', event => {
        let retVal;
        // let newString;
        if (dummyElement === dummyCardNumber) {
            if (formField.value.length < 16)
                retVal = formField.value + ('0'.repeat(16 - formField.value.length));
            else if (formField.value.length > dummyElement.textContent.length)
                retVal = formField.value.trim().substring(0, 15);
            else if (isNaN(parseInt(formField.value)))
                retVal = '0000000000000000'
            else
                retVal = formField.value;
            retVal = retVal.slice(0, 4) + ' ' + retVal.slice(4, 8) + ' ' + retVal.slice(8, 12) + ' ' + retVal.slice(12);
        } else
            retVal = formField.value;
        dummyElement.textContent = retVal;
    })
}

function throwError(field, string) {
    if (field.parentElement.querySelector('p')) {
        field.parentElement.querySelector('p').textContent = string;
        return;
    }

    field.classList.add('error');
    const p = document.createElement('p');
    p.textContent = string;
    p.classList.add('error-text');
    field.closest('div').appendChild(p);
}

function removeError(field) {
    field.classList.remove('error');
    if (field.parentElement.querySelector('p'))
        field.parentElement.removeChild(field.parentElement.querySelector('p'));
}

function checkValidity(field) {
    if (field.value.trim() === '') {
        throwError(field, "Can't be blank");
        return false;
    } else if (isNaN(parseInt(field.value)) & field !== inputFieldName) {
        throwError(field, 'Wrong format, numbers only');
        return false;
    } else {
        removeError(field);
        return true;
    }
}

function confirmBtnHandler(event) {
    event.preventDefault();
    let validInputs;
    validInputs = checkValidity(inputFieldName) &
        checkValidity(inputFieldCardNumber) &
        checkValidity(inputFieldCvc) &
        checkValidity(inputFieldMonth) &
        checkValidity(inputFieldYear);

    console.log(checkValidity(inputFieldName),
        checkValidity(inputFieldCardNumber),
        checkValidity(inputFieldCvc),
        checkValidity(inputFieldMonth),
        checkValidity(inputFieldYear))

    console.log(validInputs)
    if (validInputs) {
        originalForm.style.display = 'none';
        completeState.style.display = 'flex';
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.addEventListener('click', continueBtnHandler)
    }
}

function clearInputs() {
    for (const input of document.querySelectorAll('input'))
        input.value = '';
}

function resetDummyCard() {
    dummyCardName.textContent = 'Jane Appleseed';
    dummyCardNumber.textContent = '0000 0000 0000 0000';
    dummyCardCvc.textContent = '000';
    dummyCardMonth.textContent = '00';
    dummyCardYear.textContent = '00';
}

function continueBtnHandler() {
    originalForm.style.display = 'flex';
    completeState.style.display = 'none';
    clearInputs();
    resetDummyCard();
}

//function executions

changeDummyCardContent(dummyCardName, inputFieldName)
changeDummyCardContent(dummyCardNumber, inputFieldCardNumber)
changeDummyCardContent(dummyCardMonth, inputFieldMonth)
changeDummyCardContent(dummyCardYear, inputFieldYear)
changeDummyCardContent(dummyCardCvc, inputFieldCvc)

confirmBtn.addEventListener('click', confirmBtnHandler);

// since continue btn is created after confirmBtnHandler runs successfully