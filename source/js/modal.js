const modalTriggers = document.querySelectorAll('.js-modalOpen')
const bodyBlackout = document.querySelector('.js-modalBlackout')

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (evt) => {
    const popupTrigger = trigger.dataset.popupTrigger
    const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`)

    evt.preventDefault();
    popupModal.classList.add('is--visible')
    bodyBlackout.classList.add('is-blacked-out')

    bodyBlackout.addEventListener('click', () => {
      popupModal.classList.remove('is--visible')
      bodyBlackout.classList.remove('is-blacked-out')
    })

    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        if (popupModal.classList.contains('is--visible')) {
          evt.preventDefault();
          popupModal.classList.remove('is--visible')
          bodyBlackout.classList.remove('is-blacked-out')
        }
      }
    })
  })
})
