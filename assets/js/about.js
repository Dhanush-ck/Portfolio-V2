document.addEventListener("DOMContentLoaded", () => {
    const revealEls = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        revealEls.forEach((el) => el.classList.add("in-view"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("in-view");
                    }, i * 80);

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealEls.forEach((el) => observer.observe(el));

});

// Infinite animation delay
const photoCard = document.querySelector('.about-photo-card');
photoCard.addEventListener('animationend', (e)=> {
    photoCard.classList.add('animation-repeat');
})

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