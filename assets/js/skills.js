const skills = document.querySelector('.skills');
const list = document.querySelector('.dropdown-list');
const selected = document.querySelector('.selected');
const listItems = document.querySelectorAll('.dropdown-list-elements');
const order = document.querySelector('.order');
const arrow = document.querySelector('.arrow');

const listLeft = document.querySelector('.dropdown-list-left');
const selectedLeft = document.querySelector('.selected-left');
const listItemsLeft = document.querySelectorAll('.dropdown-list-elements-left');
const orderLeft = document.querySelector('.order-left');
const arrowLeft = document.querySelector('.arrow-left');

const imageLinks = [{
                        name : 'C++', 
                        src : "../assets/img/skills/cpp.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name: 'C', 
                        src : "../assets/img/skills/c.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'Python', 
                        src : "../assets/img/skills/python.svg",  
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'Java', 
                        src : "../assets/img/skills/java.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'JavaScript', 
                        src : "../assets/img/skills/javascript.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'VS Code', 
                        src : "../assets/img/skills/vscode.svg", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    }, 
                    {
                        name : 'Git', 
                        src : "../assets/img/skills/git.svg", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    },
                    {
                        name : 'GitHub', 
                        src : "../assets/img/skills/github.svg", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    },
                    {
                        name : 'WordPress', 
                        src : "../assets/img/skills/wordpress.svg", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    },
                    {
                        name : 'HTML', 
                        src : "../assets/img/skills/html5.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    }, 
                    {
                        name : 'CSS', 
                        src : "../assets/img/skills/css3.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'MySQL', 
                        src : "../assets/img/skills/mysql.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'SQLite', 
                        src : "../assets/img/skills/sqlite.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'Tailwind CSS', 
                        src : "../assets/img/skills/tailwindcss.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'React', 
                        src : "../assets/img/skills/react.svg", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'Django',
                        src : "../assets/img/skills/django.svg",
                        type : {
                            language : true,
                            tool : false
                        }
                    },
                    {
                        name : 'PHP',
                        src : "../assets/img/skills/php.svg",
                        type : {
                            language : true,
                            tool : false
                        }
                    },
];

const dropdowns = [selected, listItems[0], listItems[1]];
const dropdownsLeft = [selectedLeft, listItemsLeft[0], listItemsLeft[1], listItemsLeft[2]];
var currentImageLinks = imageLinks;
var currentSort;

dropdowns.forEach((dropdown)=> {
    dropdown.addEventListener('mouseover', ()=>{
        list.classList.add('fadeIn');
        list.classList.remove('fadeOut7');
        list.classList.add('show');
        arrow.style.transform = "rotate(180deg)";
    })
    
    dropdown.addEventListener('mouseout', ()=> {
        arrow.style.transform = "rotate(0deg)";
        list.classList.add('fadeOut7');
        list.addEventListener('animationend', (e)=>{
            if(e.animationName ===  'fadeOut'){
                list.classList.remove('show');
            }
            list.removeEventListener('animationend', e);
        })
    })
})

dropdownsLeft.forEach((dropdownLeft)=>{
    dropdownLeft.addEventListener('mouseover', ()=>{
        listLeft.classList.add('fadeIn');
        listLeft.classList.remove('fadeOut7');
        listLeft.classList.add('show');
        arrowLeft.style.transform = "rotate(180deg)";
    })
    
    dropdownLeft.addEventListener('mouseout', ()=> {
        arrowLeft.style.transform = "rotate(0deg)";
        listLeft.classList.add('fadeOut7');
        listLeft.addEventListener('animationend', (e)=>{
            if(e.animationName ===  'fadeOut'){
                listLeft.classList.remove('show');
            }
            listLeft.removeEventListener('animationend', e);
        })
    })
})

//filter
listItemsLeft.forEach((listItemLeft)=>{
    listItemLeft.addEventListener('click', ()=>{
        skills.innerHTML = "";
        var tempLinks = [];
        // console.log(tempLinks.length);
        const currentValue = listItemLeft.getAttribute('data-value');
        if(currentValue == 1 ) {
            imageLinks.forEach((imageLink)=>{
                tempLinks.push(imageLink);
                // skills.innerHTML += `<div class="skill-elements"><img src="${imageLink.src}"><span>${imageLink.name}</span></div>`;
            })
        }
        else if(currentValue == 2) {
            imageLinks.forEach((imageLink)=>{
                if(imageLink.type.language){
                    tempLinks.push(imageLink);
                    // skills.innerHTML += `<div class="skill-elements"><img src="${imageLink.src}"><span>${imageLink.name}</span></div>`;
                }
            })
        }
        else if(currentValue == 3) {
            imageLinks.forEach((imageLink)=>{
                if(imageLink.type.tool){
                    tempLinks.push(imageLink);
                    // skills.innerHTML += `<div class="skill-elements"><img src="${imageLink.src}"><span>${imageLink.name}</span></div>`;
                }
            })
        }
        currentImageLinks = tempLinks;
        sortElements(currentSort);
        listLeft.classList.remove('show-left');
        orderLeft.innerHTML = listItemLeft.innerHTML;
        arrowLeft.style.transform = "rotate(0deg)";
    })
})

//sort
listItems.forEach((listItem)=>{
    listItem.addEventListener('click', ()=>{
        const currentValue = listItem.getAttribute('data-value');
        currentSort = currentValue;
        sortElements(currentValue);
        list.classList.remove('show');
        order.innerHTML = listItem.innerHTML;
        arrow.style.transform = "rotate(0deg)";
    })
})

function sortElements(e) {
    if(e == 1){
        currentImageLinks.sort((a,b)=>a.name.localeCompare(b.name));
    }
    else if(e == 2) {
        currentImageLinks.sort((a,b)=>b.name.localeCompare(a.name));
    }
    skills.innerHTML = "";
    var i = 1;
    currentImageLinks.forEach((tempLink)=>{
        skills.innerHTML += `<div class="skill-elements" style="--i:${i}"><img src="${tempLink.src}" style="--i:${i}"><span>${tempLink.name}</span></div>`;
        i++;
    })
}

function displaySkills(){
    imageLinks.sort((a,b)=>a.name.localeCompare(b.name));
    var i = 1;
    imageLinks.forEach((tempLink)=>{
        skills.innerHTML += `<div class="skill-elements" style="--i:${i}"><img src="${tempLink.src}" style="--i:${i}"><span>${tempLink.name}</span></div>`;
        i++;
    })
}
displaySkills();