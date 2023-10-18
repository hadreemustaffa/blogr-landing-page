const btnToggle = document.querySelector('.btn-toggle');
const mainMenu = document.querySelector('.main-menu');
const dropdownMenu = document.querySelectorAll('.dropdown');

const menuIconOpen = 'images/icon-hamburger.svg';
const menuIconClose = 'images/icon-close.svg';

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

const expandSubmenu = (itemSelector) => {
  const isExpanded = itemSelector.getAttribute('aria-expanded') === 'true';
  const itemArrow = itemSelector.firstElementChild;
  const itemList = itemSelector.nextElementSibling;

  if (!isExpanded) {
    itemSelector.setAttribute('aria-expanded', 'true');
    itemArrow.style.transform = 'rotate(180deg)';
    itemList.style.display = 'flex';
  } else {
    itemSelector.setAttribute('aria-expanded', 'false');
    itemArrow.style.transform = 'rotate(0)';
    itemList.style.display = 'none';
  }
  itemSelector.classList.toggle('active');
};

btnToggle.addEventListener('click', () => {
  toggleMainMenu();
});

Array.from(dropdownMenu).forEach((item) => {
  item.addEventListener('click', () => {
    expandSubmenu(item);
  });
});
