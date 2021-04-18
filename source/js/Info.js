const tabLinks = document.querySelectorAll('.info__nav-button');
const wrapper = document.querySelector('.info__list');

const ACTIVE_LINK_CLASS = 'info__nav-button--active'

let activeLink = 0;

tabLinks[activeLink].classList.add(ACTIVE_LINK_CLASS);

for (let i = 0; i < tabLinks.length; i++) {
  let link = tabLinks[i];
  link.addEventListener('click', setClickedTab);
}

function setClickedTab(e) {
  removeActive();

  const clickedTab = e.target;
  activeLink = clickedTab.dataset.id;

  changePosition(clickedTab);
}

function changePosition(link) {
  link.classList.add(ACTIVE_LINK_CLASS);

  wrapper.style.left = (link.getAttribute('data-id') - 1) * -100 + '%';
}

function removeActive() {
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove(ACTIVE_LINK_CLASS);
  }
}
