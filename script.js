const header=document.querySelector('.site-header'),menu=document.querySelector('.menu');
menu.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));
const filters=document.querySelectorAll('.filters button'),items=document.querySelectorAll('.gallery figure');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));button.classList.add('active');const value=button.dataset.filter;let order=0;items.forEach(item=>{const show=value==='all'||item.dataset.cat===value;item.classList.toggle('hide',!show);item.classList.remove('reveal');if(show){item.style.animationDelay=`${Math.min(order,8)*42}ms`;void item.offsetWidth;item.classList.add('reveal');order++}})}));
const dialog=document.querySelector('.lightbox'),dialogImg=dialog.querySelector('img'),dialogText=dialog.querySelector('p');
items.forEach(item=>item.addEventListener('click',()=>{const img=item.querySelector('img');dialogImg.src=img.src;dialogImg.alt=img.alt;dialogText.textContent=item.querySelector('figcaption').textContent;dialog.showModal()}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const brandItems=[...document.querySelectorAll('.brand-item')];let brandIndex=0;
function showBrand(index){brandItems.forEach((item,i)=>item.classList.toggle('current',i===index))}
if(brandItems.length){showBrand(0);setInterval(()=>{if(innerWidth<=800){brandIndex=(brandIndex+1)%brandItems.length;showBrand(brandIndex)}},2200)}
