const tools = document.querySelector('.tools');

tools.addEventListener('wheel', (event) => {
    event.preventDefault();
    tools.scrollLeft += event.deltaY;
});