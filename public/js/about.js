document.addEventListener("DOMContentLoaded", () => {

    const revealEls = document.querySelectorAll(".reveal");

    // Respect users who've asked for reduced motion.
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
                    // small stagger so grouped cards don't all pop at once
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

const photoCard = document.querySelector('.about-photo-card');
photoCard.addEventListener('animationend', (e)=> {
    photoCard.classList.add('animation-repeat');
})

const navEl = document.querySelector('.top-nav');
window.addEventListener('scroll', ()=>{
    navEl.classList.toggle('scrolled', window.scrollY > 20);
});