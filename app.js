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
    formField.addEventListener('keyup', event => {
        let retVal;
        // let newString;
        if (formField === inputFieldCardNumber) {
            if (formField.value.length === 4 ||
                formField.value.length === 9 ||
                formField.value.length === 14)
                formField.value = formField.value.concat(' ')
        }
        if (dummyElement === dummyCardNumber) {
            if (formField.value.trim().length < 16) {
                retVal = formField.value + ('0'.repeat(16 - formField.value.trim().length));
                // retVal = retVal.slice(0, 4) + ' ' + retVal.slice(4, 8) + ' ' + retVal.slice(8, 12) + ' ' + retVal.slice(12);
            }
            // else if (formField.value.length > dummyElement.textContent.length)
            //     retVal = formField.value.trim().substring(0, 18);
            else if (isNaN(parseInt(formField.value)))
                retVal = '0000 0000 0000 0000'
            else
                retVal = formField.value;
            // retVal = retVal.slice(0, 4) + ' ' + retVal.slice(4, 8) + ' ' + retVal.slice(8, 12) + ' ' + retVal.slice(12);
        } else
            retVal = formField.value;
        dummyElement.textContent = retVal;
    })
}

function throwError(field, string) {
    if (!field.classList.contains('error'))
        field.classList.add('error');
    // if (string === '')
    //     return;
    if (field === inputFieldMonth || field === inputFieldYear) {
        if (field.closest('div').querySelector('p'))
            return;
    } else if (field.closest('div').querySelector('p')) {
        field.closest('div').querySelector('p').textContent = string;
        return;
    }

    field.classList.add('error');
    const p = document.createElement('p');
    p.textContent = string;
    p.classList.add('error-text');
    field.closest('div').appendChild(p);
}

// function throwError2(field1, field2){

// }

function removeError(field) {
    removeError2(field);
    if (field.closest('div').querySelector('p')) {
        // if (field === inputFieldMonth || field === inputFieldYear)
        field.closest('div').removeChild(field.closest('div').querySelector('p'));
    }
}

function removeError2(field) {
    field.classList.remove('error');
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

function checkValidity2(field1, field2) {
    if (field1.value.trim() === '' & !(field2.value.trim() === '')) {
        throwError(field1, "Can't be blank");
        removeError2(field2);
        return false;
    } else if (!(field1.value.trim() === '') & field2.value.trim() === '') {
        throwError(field2, "Can't be blank");
        removeError2(field1);
        return false;
    } else if (field1.value.trim() === '' & field2.value.trim() === '') {
        throwError(field1, "Can't be blank");
        throwError(field2);
        return false;
    } else {
        removeError(field1);
        removeError(field2);
        return true;
    }
}

function confirmBtnHandler(event) {
    event.preventDefault();
    let validInputs;
    validInputs = checkValidity(inputFieldName) &
        checkValidity(inputFieldCardNumber) &
        checkValidity(inputFieldCvc) &
        checkValidity2(inputFieldMonth, inputFieldYear);

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

function restoreDefaults() {
    for (const input of document.querySelectorAll('input')) {
        input.addEventListener('keyup', function() {
            if (input.value.trim().length < 1)
                resetDummyCard(input);
        })
    }
}

function resetDummyCard(field) {
    if (field === inputFieldName)
        dummyCardName.textContent = 'Jane Appleseed';
    if (field === inputFieldCardNumber)
        dummyCardNumber.textContent = '0000 0000 0000 0000';
    if (field === inputFieldCvc)
        dummyCardCvc.textContent = '000';
    if (field === inputFieldMonth)
        dummyCardMonth.textContent = '00';
    if (field === inputFieldYear)
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

restoreDefaults();

confirmBtn.addEventListener('click', confirmBtnHandler);

// since continue btn is created after confirmBtnHandler runs successfully