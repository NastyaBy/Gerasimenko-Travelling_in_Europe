const modalTriggers = document.querySelectorAll('.js-modalOpen');
const bodyBlackout = document.querySelector('.js-modalBlackout');
const modalCloseBtn = document.querySelector('.js-modalCloseBtn');
const inputEmail = document.querySelector('.js-validateEmail');
const inputTel = document.querySelector('.js-validateTel');
const form = document.querySelector('.js-form');
const sendForm = document.querySelector('.js-sendForm');
const success = document.querySelector('.js-success');

const clearFormErrors = () => {
  const errorMessages = Array.prototype.slice.call(
    document.querySelectorAll('.form-input__error'));

  errorMessages.forEach((errorMessage) => {
    errorMessage.parentNode.removeChild(errorMessage);
  });
};

const closeModal = (popup) => {
  popup.classList.remove('is--visible');
  bodyBlackout.classList.remove('is-blacked-out');
  success.classList.remove('modal__success--show');

  clearFormErrors()
}

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (evt) => {
    const popupTrigger = trigger.dataset.popupTrigger;
    const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`);

    evt.preventDefault();
    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');

    bodyBlackout.addEventListener('click', () => {
      closeModal(popupModal);
    });

    modalCloseBtn.addEventListener('click', () => {
      closeModal(popupModal);
    });
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        if (popupModal.classList.contains('is--visible')) {
          evt.preventDefault();
          closeModal(popupModal);
        }
      }
    });
  });
});

const validateInput = (input, type, errorMessage) => {
  const re = type === 'email' ?
    (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) :
    (/^\d{10}$/);
  const value = input.value;
  const valid = re.test(value);
  if (!valid) {
    const message = document.createElement('div');
    message.classList.add('form-input__error');
    message.innerHTML += errorMessage;
    input.parentNode.insertBefore(message, input);
  }
  return valid;
};

sendForm.addEventListener('click', () => {
  clearFormErrors();

  if (!validateInput(inputTel, `tel`, 'Данные не верны') &&
    !validateInput(inputEmail, 'email', 'Данные не верны')) {

  } else {
    success.classList.add('modal__success--show');
  }
});



