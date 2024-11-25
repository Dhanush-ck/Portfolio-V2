const sort = document.querySelector('.sort');
const selected = document.querySelector('.selected');
const arrow = document.querySelector('.arrow');
const order = document.querySelector('.order');
const list = document.querySelector('.dropdown-list');
const listItems = document.querySelectorAll('.dropdown-list-elements');

const dropdowns = [selected, listItems[0], listItems[1]];

dropdowns.forEach((dropdown)=> {
    dropdown.addEventListener('mouseover', ()=>{
        list.classList.add('fadeIn');
        list.classList.remove('fadeOut');
        list.classList.add('show');
        arrow.style.transform = "rotate(180deg)";
    })
    
    dropdown.addEventListener('mouseout', ()=> {
        arrow.style.transform = "rotate(0deg)";
        list.classList.add('fadeOut');
        list.addEventListener('fadeOut', ()=>{
            list.classList.remove('show');
        })
    })
})