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
                        src : "../img/c-.png", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name: 'C', 
                        src : "../img/icons8-c-programming-480.png", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'Python', 
                        src : "../img/python.png",  
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'Java', 
                        src : "../img/java.png", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'JavaScript', 
                        src : "../img/js.png", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'VS Code', 
                        src : "../img/icons8-vs-code-512.png", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    }, 
                    {
                        name : 'Git', 
                        src : "../img/git.png", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    },
                    {
                        name : 'GitHub', 
                        src : "../img/github.png", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    },
                    {
                        name : 'WordPress', 
                        src : "../img/wordpress.png", 
                        type : {
                            language : false, 
                            tool : true
                        }
                    },
                    {
                        name : 'HTML', 
                        src : "../img/html-5.png", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    }, 
                    {
                        name : 'CSS', 
                        src : "../img/css-3.png", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    },
                    {
                        name : 'SQL', 
                        src : "../img/mysql.png", 
                        type : {
                            language : true, 
                            tool : false
                        }
                    }
];

const dropdowns = [selected, listItems[0], listItems[1]];
const dropdownsLeft = [selectedLeft, listItemsLeft[0], listItemsLeft[1], listItemsLeft[2]];
var currentImageLinks = imageLinks;
var currentSort;

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

dropdownsLeft.forEach((dropdownLeft)=>{
    dropdownLeft.addEventListener('mouseover', ()=>{
        listLeft.classList.add('fadeIn');
        listLeft.classList.remove('fadeOut');
        listLeft.classList.add('show');
        arrowLeft.style.transform = "rotate(180deg)";
    })
    
    dropdownLeft.addEventListener('mouseout', ()=> {
        arrowLeft.style.transform = "rotate(0deg)";
        listLeft.classList.add('fadeOut');
        listLeft.addEventListener('fadeOut', ()=>{
            listLeft.classList.remove('show');
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