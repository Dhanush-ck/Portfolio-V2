const skillText = document.querySelector('.skill');
const skillInfo = ["Full Stack Developer", "Editor"];
var i = 0;
var time = 5000;

function skillTextChange() {
    skillText.classList.remove('fadeIn');
    setTimeout(hideText, 200);
    skillText.innerHTML = skillInfo[i];
    // skillText.style.opacity = 0;
    (i<skillInfo.length-1)? i++: i = 0;
    setTimeout(setVisibleText, 200)
    setTimeout(skillTextChange, time);
}

function hideText() {
    skillText.classList.add('fadeOut');
    skillText.addEventListener('animationend', ()=>{
        skillText.style.opacity = 0;
    })
}

function setVisibleText() {
    skillText.classList.remove('fadeOut');
    skillText.classList.add('fadeIn');
}

skillTextChange();