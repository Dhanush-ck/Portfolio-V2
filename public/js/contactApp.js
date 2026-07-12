/* =========================================================
   CONTACT PAGE JS
   1) Mouse-follow spotlight inside each contact card
   2) Scroll-reveal for cards / sections
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- Mouse-follow spotlight ---------- */

    const cards = document.querySelectorAll(".contact-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--mx", `${x}%`);
            card.style.setProperty("--my", `${y}%`);
        });
    });

    /* ---------- Scroll reveal ---------- */

    const revealEls = document.querySelectorAll(".reveal");

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
                    }, i * 70);

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

const navEl = document.querySelector('.top-nav');
window.addEventListener('scroll', ()=>{
    navEl.classList.toggle('scrolled', window.scrollY > 20);
});