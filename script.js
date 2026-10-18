const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#primary-navigation');

function setMenuOpen(open) {
  header.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
}

menu.addEventListener('click', () => {
  setMenuOpen(menu.getAttribute('aria-expanded') !== 'true');
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menu.focus();
  }
});

const filters = document.querySelectorAll('.filters button');
const items = document.querySelectorAll('.gallery figure');

filters.forEach(button => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  button.addEventListener('click', () => {
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });

    const value = button.dataset.filter;
    let order = 0;

    items.forEach(item => {
      const show = value === 'all' || item.dataset.cat === value;
      item.classList.toggle('hide', !show);
      item.classList.remove('reveal');

      if (show) {
        item.style.animationDelay = `${Math.min(order, 8) * 42}ms`;
        void item.offsetWidth;
        item.classList.add('reveal');
        order++;
      }
    });
  });
});

const dialog = document.querySelector('.lightbox');
const dialogImg = dialog.querySelector('img');
const dialogText = dialog.querySelector('p');

function openLightbox(item) {
  const img = item.querySelector('img');
  dialogImg.src = img.src;
  dialogImg.alt = img.alt;
  dialogText.textContent = item.querySelector('figcaption').textContent;
  dialog.showModal();
}

items.forEach(item => {
  const caption = item.querySelector('figcaption').textContent;
  item.tabIndex = 0;
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', `Görseli büyüt: ${caption}`);
  item.addEventListener('click', () => openLightbox(item));
  item.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(item);
    }
  });
});

dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

const brandItems = [...document.querySelectorAll('.brand-item')];
let brandIndex = 0;

function showBrand(index) {
  brandItems.forEach((item, i) => item.classList.toggle('current', i === index));
}

if (brandItems.length) {
  showBrand(0);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    window.setInterval(() => {
      if (window.innerWidth <= 800) {
        brandIndex = (brandIndex + 1) % brandItems.length;
        showBrand(brandIndex);
      }
    }, 2200);
  }
}
