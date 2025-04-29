const cElements = document.querySelectorAll('.child')

cElements[cElements.length - 1].addEventListener('animationend', ()=>{
    cElements.forEach((e)=> {
        e.classList.remove('animation');
    })
})

cElements.forEach((e)=> {
    e.addEventListener('mouseover', ()=>{
        if(!e.classList.contains('scaleDown'))
            e.classList.remove('scaleReset');
            e.classList.add('scaleDown');
    })
    e.addEventListener('mouseout', ()=>{
        if(e.classList.contains('scaleDown'))
            e.classList.add('scaleReset');
            e.classList.remove('scaleDown');
    })
})