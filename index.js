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

const expandSubmenu = (itemSelector, listIcon) => {
  itemSelector.setAttribute('aria-expanded', 'true');
  listIcon.style.transform = 'rotate(180deg)';
  itemSelector.classList.add('active');
};

const collapseSubmenu = (itemSelector, listIcon) => {
  itemSelector.setAttribute('aria-expanded', 'false');
  listIcon.style.transform = 'rotate(0)';
  itemSelector.classList.remove('active');
};

const collapseActiveSubmenu = () => {
  dropdownMenu.forEach((item) => {
    collapseSubmenu(item, item.querySelector('.arrow'));
  });
};

// event listeners
btnToggle.addEventListener('click', () => {
  toggleMainMenu();
});

dropdownMenu.forEach((item) => {
  const itemArrow = item.querySelector('.arrow');
  const itemList = item.nextElementSibling;

  item.addEventListener('click', (e) => {
    if (item.getAttribute('aria-expanded') === 'false') {
      expandSubmenu(item, itemArrow);
    } else {
      collapseSubmenu(item, itemArrow);
    }
  });

  itemList.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      collapseSubmenu(item, itemArrow);
      item.focus({ focusVisible: true });
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    collapseActiveSubmenu();
  }
});

window.addEventListener('click', (e) => {
  if (!e.target.matches('.dropdown')) {
    collapseActiveSubmenu();
  }
});
