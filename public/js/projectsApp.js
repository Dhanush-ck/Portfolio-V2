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
                        link : "./projects/portfolio-v1.html",
                        order : 1,
                        details : "This is my first portfolio website, sharing about my details, skills and contact info. Simple UI and easy to understand.",
                        language : [
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                        ]
                    },
                    {
                        name : "Image Gallery",
                        src : "../img/imagegallery.png",
                        link : "./projects/image-gallery.html",
                        order : 2,
                        details : "It is an image gallery showing images in grid, we can add, remove & replace images. It also contians slideshow feature.",
                        language : [
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                        ]
                    },
                    {
                        name : "Stone Paper Scissors",
                        src : "../img/stonepaper.png",
                        link : "./projects/stone-paper-scissor.html",
                        order : 3,
                        details : "This is a digital interface for the normal Rock Paper Scissor we use to play with our hands. In this we play with the computer.",
                        language : [
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                        ]
                    },
                    {
                        name : "Tic Tac Toe",
                        src : "../img/tictactoe.png",
                        link : "./projects/tic-tac-toe.html",
                        order : 4,
                        details : "This is XOX or Tic Tac Toe game. It is two player game, played using X and O. Player who get three consecutively.",
                        language : [
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                        ]
                    },
                    {
                        name : "Portfolio V2",
                        src : "../img/portfoliov2.png",
                        link : "./projects/portfolio-v2.html",
                        order : 5,
                        details : "My latest portfolio. Contains features that aren't in the first portfolio. It has an attractive and simple UI.",
                        language : [
                            "CSS",
                            "HTML",
                            "Git",
                            "JavaScript",
                        ]
                    },
                    {
                        name : "Vijnana 2025",
                        src : "../img/vijnana25.png",
                        link : "./projects/vijnana25.html",
                        order : 6,
                        details : "Official website of vijnana 2025. Registration and details of the events as part of vijnana are present in this.",
                        language : [
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                        ]
                    },
                    {
                        name : "BMI Calculator",
                        src : "../img/projects/bmi-calculator/1.png",
                        link : "./projects/bmi-calculator.html",
                        order : 7,
                        details : "A simple website for calculating your bmi using height and weight.",
                        language : [
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                            "React",
                            "Tailwind CSS",
                        ]
                    },
                    {
                        name : "Trivia App",
                        src : "../img/projects/trivia_app/1.png",
                        link : "./projects/trivia_app.html",
                        order : 8,
                        details : " A simple trivia website where you can answer questions and get your score.",
                        language : [
                            "Django",
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                            "Python",
                        ]
                    },
                    {
                        name : "Vijñäna 2026",
                        src : "../img/projects/vijnana26/1.png",
                        link : "./projects/vijnana26.html",
                        order : 9,
                        details : "Official website of Vijñäna 2026. Registration and details of the events as part of Vijñäna are present in this.",
                        language : [
                            "CSS",
                            "Git",
                            "HTML",
                            "JavaScript",
                        ]
                    },
                    {
                        name : "Treasure Hunt",
                        src : "../img/projects/treasure-hunt/1.jpg",
                        link : "./projects/treasure-hunt.html",
                        order : 10,
                        details : "Website for conducting treasure hunt as part of Vijñäna 2026",
                        language : [
                            "CSS",
                            "Firebase",
                            "Git",
                            "HTML",
                            "JavaScript",
                        ]
                    },
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
    var i = 1;
    tempLists.forEach((tempList)=>{
        projects.innerHTML += `<div class="projects-elements" style="--i:${i}"><img src="${tempList.src}"><span class="project-name">${tempList.name}</span><p>${tempList.details}</p><a href="${tempList.link}"><div class="hover-div"><span class="hover-button">View</span></div></a></div>`;
        i++;
    }) 

    hoverDivs = document.querySelectorAll('.hover-div');
    
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
}
sortElements(3);
