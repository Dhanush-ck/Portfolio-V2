const sort = document.querySelector('.sort');
const selected = document.querySelector('.selected');
const arrow = document.querySelector('.arrow');
const order = document.querySelector('.order');
const list = document.querySelector('.dropdown-list');
const listItems = document.querySelectorAll('.dropdown-list-elements');
const projects = document.querySelector('.projects');
var hoverDivs = document.querySelectorAll('.hover-div');
const projectElements = document.querySelectorAll('.projects-elements');

const dropdowns = [selected, listItems[0], listItems[1], listItems[2], listItems[3]];

dropdowns.forEach((dropdown)=> {
    dropdown.addEventListener('mouseover', ()=>{
        list.style.zIndex = "1000";
        list.classList.add('fadeIn');
        list.classList.remove('fadeOut7');
        list.classList.add('show');
        arrow.style.transform = "rotate(180deg)";
    })
    
    dropdown.addEventListener('mouseout', ()=> {
        arrow.style.transform = "rotate(0deg)";
        list.classList.add('fadeOut7');
        list.addEventListener('animationend', (e)=> {
            if (e.animationName === 'fadeOut') {
                list.style.zIndex = "0";
                list.classList.remove('show');
                list.removeEventListener('animationend');
            }
        });
    })
})

const projectList = [{
                        name : "Portfolio V1",
                        src : "../img/portfoliov1.png",
                        order : 1,
                        details : "This is my first portfolio website, sharing about my details, skills and contact info. Simple UI and easy to understand.",
                        language : [
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "Git"
                        ]
                    },
                    {
                        name : "Image Gallery",
                        src : "../img/imagegallery.png",
                        order : 2,
                        details : "It is an image gallery showing images in grid, we can add, remove & replace images. It also contians slideshow feature.",
                        language : [
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "Git"
                        ]
                    },
                    {
                        name : "Stone Paper Scissors",
                        src : "../img/stonepaper.png",
                        order : 3,
                        details : "This is a digital interface for the normal Rock Paper Scissor we use to play with our hands. In this we play with the computer.",
                        language : [
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "Git"
                        ]
                    },
                    {
                        name : "Tic Tac Toe",
                        src : "../img/tictactoe.png",
                        order : 4,
                        details : "This is XOX or Tic Tac Toe game. It is two player game, played using X and O. Player who get three consecutively.",
                        language : [
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "Git"
                        ]
                    },
                    {
                        name : "Portfolio V2",
                        src : "../img/portfoliov2.png",
                        order : 5,
                        details : "My latest portfolio. Contains features that aren't in the first portfolio. It has an attractive and simple UI.",
                        language : [
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "Git"
                        ]
                    }
];

const tempLists = projectList;

listItems.forEach((listItem)=> {
    listItem.addEventListener('click', ()=> {
        const currentValue = listItem.getAttribute('data-value');
        sortElements(currentValue);
        list.classList.remove('show');
        order.innerHTML = listItem.innerHTML;
        arrow.style.transform = "rotate(0deg)";
    })
})

function sortElements(e) {
    if(e == 1) {
        tempLists.sort((a,b)=>a.name.localeCompare(b.name));
    }
    else if(e == 2) {
        tempLists.sort((a,b)=>b.name.localeCompare(a.name));
    }
    else if(e == 3) {
        tempLists.sort((a,b)=>b.order-a.order)
    }
    else if(e == 4) {
        tempLists.sort((a,b)=>a.order-b.order)
    }
    projects.innerHTML = " ";
    tempLists.forEach((tempList)=>{
        projects.innerHTML += `<div class="projects-elements"><img src="${tempList.src}"><span class="project-name">${tempList.name}</span><p>${tempList.details}</p><div class="hover-div"><span class="hover-button">View</span></div></div>`;
    }) 
    hoverDivs = document.querySelectorAll('.hover-div');
}
sortElements(3);

hoverDivs.forEach((hoverDiv)=>{
    hoverDiv.addEventListener('mouseover', ()=>{
        hoverDiv.classList.add('fadeInO9');
        hoverDiv.classList.remove('fadeOutO9');
        hoverDiv.classList.add('show-hover');
    })

    hoverDiv.addEventListener('mouseout', ()=>{
        hoverDiv.classList.add('fadeOutO9');
        hoverDiv.classList.remove('fadeInO9');
        hoverDiv.addEventListener('fadeOutO9', ()=>{
            hoverDiv.classList.remove('show-hover');
        });
    })
})