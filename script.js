const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#primary-navigation');

function setMenuOpen(open) {
  header.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
}
menu.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (header.classList.contains('is-open') && !header.contains(event.target)) setMenuOpen(false);
});

const cards = [...document.querySelectorAll('.gallery-item')];
const categoryButtons = [...document.querySelectorAll('.filter-chip')];
const brandButtons = [...document.querySelectorAll('.brand-chip')];
const count = document.querySelector('.visible-count');

function filterGallery(type, value) {
  categoryButtons.forEach(button => {
    const active = type === 'category' && button.dataset.filter === value;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  brandButtons.forEach(button => {
    const active = type === 'brand' && button.dataset.brand === value;
    button.setAttribute('aria-pressed', String(active));
  });

  let visible = 0;
  cards.forEach(card => {
    const categories = (card.dataset.category || '').split(/\s+/);
    const brands = (card.dataset.brands || '').split(/\s+/);
    const show = value === 'all' || (type === 'category' && (categories.includes(value) || brands.includes(value))) || (type === 'brand' && brands.includes(value));
    card.hidden = !show;
    if (show) visible++;
  });
  count.textContent = String(visible);
}

categoryButtons.forEach(button => button.addEventListener('click', () => filterGallery('category', button.dataset.filter)));
brandButtons.forEach(button => button.addEventListener('click', () => {
  filterGallery('brand', button.dataset.brand);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector('#galeri').scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'});
}));

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogCaption = dialog.querySelector('p');
cards.forEach(card => {
  const button = card.querySelector('.gallery-button');
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = button.querySelector('.photo-caption strong').textContent;
    dialog.showModal();
  });
});
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  dialogImage.removeAttribute('src');
  dialogImage.alt = '';
});
