// Vertical scroll
const tools = document.querySelector('.tools');

tools.addEventListener('wheel', (event) => {
    event.preventDefault();
    tools.scrollLeft += event.deltaY;
});

// Navigation scroll state
const navEl = document.querySelector('.top-nav');
window.addEventListener('scroll', ()=>{
    navEl.classList.toggle('scrolled', window.scrollY > 20);
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