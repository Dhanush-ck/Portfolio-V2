const linkedin = document.querySelectorAll('.linkedin-icon');
const instagram = document.querySelectorAll('.instagram-icon');
const github = document.querySelectorAll('.github-icon');

const messageContainer = document.querySelector('.message-container');
const messageIcon = document.getElementById('message-icon');
const messageIconb = document.getElementById('message-iconb');
const linkText = document.getElementById('link-src');
const visit = document.getElementById('visit');
const copy = document.getElementById('copy');
const cross = document.getElementById('cross');

const copyInfoContainer = document.querySelector('.copy-info-container');

const containerElements = document.querySelector('.container-elements');

const buttons = [linkedin[0], linkedin[1], instagram[0], instagram[1], github[0], github[1]];
const links = {
    LinkedIn: 'https://www.linkedin.com/in/dhanush-ck',
    Instagram: 'https://www.instagram.com/_dhanush._.ck/?idsh=MXJjeDByMjBONDc3aQ%3D%3D',
    GitHub: 'https://github.com/Dhanush-ck'
}

const imageSrc = {
    LinkedIn : {
        white : "../img/linkedin-white.png",
        dark : "../img/linkedin-black.png"
    },
    Instagram : {
        white : "../img/instagram-white.png",
        dark : "../img/instagram-black.png"
    },
    GitHub : {
        white : "../img/github-white.png",
        dark : "../img/github-black.png"
    }
}

buttons.forEach(button => {
    button.onclick = ()=> {
        // containerElements.style.display = 'none';
        containerElements.style.filter = 'blur(10px)';
        messageContainer.style.display = 'flex';
        const currentName = button.alt;
        messageIcon.src = imageSrc[currentName].white;
        messageIconb.src = imageSrc[currentName].dark;
        linkText.value = links[currentName];
        visit.parentElement.href = links[currentName];
    }
})

copy.onclick = ()=> {
    linkText.select();
    document.execCommand('copy');
    showCopyMessage();
}

function showCopyMessage() {
    copyInfoContainer.style.display = 'flex';
    copyInfoContainer.classList.add('fadeIn');
    setTimeout(hideCopyMessage, 1500);
}

function hideCopyMessage() {
    copyInfoContainer.classList.remove('fadeIn');
    copyInfoContainer.classList.add('fadeOut');
    copyInfoContainer.addEventListener('animationend', ()=> {
        copyInfoContainer.style.display = 'none';
        copyInfoContainer.classList.remove('fadeOut')
    },
    {once: true});
}

cross.onclick = ()=> {
    const filterInfo = containerElements.style.filter;
    if(filterInfo == 'blur(10px)'){
        containerElements.style.filter = 'none';
        messageContainer.style.display = 'none';
    }
}