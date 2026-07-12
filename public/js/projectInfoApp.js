const tools = document.querySelector('.tools');

tools.addEventListener('wheel', (event) => {
    event.preventDefault();
    tools.scrollLeft += event.deltaY;
});

const navEl = document.querySelector('.navigation-panel');
window.addEventListener('scroll', ()=>{
    navEl.classList.toggle('scrolled', window.scrollY > 20);
});