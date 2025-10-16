const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');


toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});