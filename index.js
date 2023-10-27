const btnToggle = document.querySelector('.btn-toggle');
const mainMenu = document.querySelector('.main-menu');
const dropdownMenu = document.querySelectorAll('.dropdown');

const menuIconOpen = 'images/icon-hamburger.svg';
const menuIconClose = 'images/icon-close.svg';
const arrowDark = 'images/icon-arrow-dark.svg';
const arrowLight = 'images/icon-arrow-light.svg';

const toggleMainMenu = () => {
  const isExpanded = btnToggle.getAttribute('aria-expanded') === 'true';

  if (!isExpanded) {
    btnToggle.setAttribute('aria-expanded', 'true');
    btnToggle.firstElementChild.src = menuIconClose;
  } else {
    btnToggle.firstElementChild.src = menuIconOpen;
    btnToggle.setAttribute('aria-expanded', 'false');
  }
  mainMenu.classList.toggle('open');
};

// event listeners
btnToggle.addEventListener('click', () => {
  toggleMainMenu();
});

dropdownMenu.forEach((dropdown) => {
  const itemList = dropdown.nextElementSibling;

  itemList.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('active');
      dropdown.focus({ focusVisible: true });
    }
  });
});

document.addEventListener('click', (e) => {
  const isDropdownBtn = e.target.matches('li .dropdown');
  if (!isDropdownBtn && e.target.closest('.submenu') != null) return;
  let currentDropdown;
  if (isDropdownBtn) {
    currentDropdown = e.target.closest('.dropdown');
    currentDropdown.setAttribute('aria-expanded', 'true');
    currentDropdown.classList.toggle('active');
  }

  document.querySelectorAll('.dropdown.active').forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('active');
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dropdownMenu.forEach((dropdown) => {
      dropdown.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('active');
    });
  }
});
