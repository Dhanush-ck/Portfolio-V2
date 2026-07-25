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

// Animations
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

// Portfolio list
const projectList = [{
                        name : "Portfolio V1",
                        src : "../assets/img/project/portfoliov1/1.webp",
                        link : "../project/portfoliov1",
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
                        name : "Portfolio V2",
                        src : "../assets/img/project/portfoliov2/1.webp",
                        link : "../project/portfoliov2",
                        order : 2,
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
                        src : "../assets/img/project/vijnana25/1.webp",
                        link : "../project/vijnana25",
                        order : 3,
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
                        src : "../assets/img/project/bmicalculator/1.webp",
                        link : "../project/bmicalculator",
                        order : 4,
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
                        src : "../assets/img/project/triviaapp/1.webp",
                        link : "../project/triviaapp",
                        order : 5,
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
                        src : "../assets/img/project/vijnana26/1.webp",
                        link : "../project/vijnana26",
                        order : 6,
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
                        src : "../assets/img/project/treasurehunt/1.webp",
                        link : "../project/treasurehunt",
                        order : 7,
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
        projects.innerHTML += `<div class="projects-elements" style="--i:${i}" data-value=${i}><img src="${tempList.src}" alt="${tempList.name} Thumbnail" loading="lazy"><span class="project-name">${tempList.name}</span><p>${tempList.details}</p><a href="${tempList.link}"><div class="hover-div"><span class="hover-button">View</span></div></a></div>`;
        i++;
    }) 

    hoverDivs = document.querySelectorAll('.hover-div');
    
    hoverDivs.forEach((hoverDiv)=>{
        hoverDiv.addEventListener('mouseover', ()=>{
            hoverDiv.classList.add('fadeIn');
            hoverDiv.classList.remove('fadeOut');
            hoverDiv.classList.add('show-hover');
        })
    
        hoverDiv.addEventListener('mouseout', ()=>{
            hoverDiv.classList.add('fadeOut');
            hoverDiv.classList.remove('fadeIn');
            hoverDiv.addEventListener('fadeOut', ()=>{
                hoverDiv.classList.remove('show-hover');
            });
        })
    })
}
sortElements(3);

// Page refresh after window resize
let resizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        location.reload();
    }, 1); 
});

// Side menu (Hamburger menu)
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

function openMenu(){
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu(){
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

menuBtn.onclick = openMenu;
closeBtn.onclick = closeMenu;
overlay.onclick = closeMenu;

document.querySelectorAll(".mobile-menu a").forEach(link=>{
    link.onclick = closeMenu;
});