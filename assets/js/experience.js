document.addEventListener('DOMContentLoaded', () => {
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right');
    animatedElements.forEach(el => observer.observe(el));


    // Timeline  
    const timelineWrap = document.querySelector('.timeline-wrap');
    const progressBar = document.querySelector('.timeline-progress-fill');
    const nodes = document.querySelectorAll('.timeline-node');

    function updateTimelineOnScroll() {
        if (!timelineWrap || !progressBar) return;

        // Get window and timeline boundaries
        const rect = timelineWrap.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // We start the fill when the top of the timeline hits the middle of the viewport
        const triggerPoint = viewportHeight / 3; 
        
        // Calculate the fill percentage
        let progress = (triggerPoint - rect.top) / rect.height;
        
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.height = `${progress * 100}%`;

        nodes.forEach(node => {
            const nodeRect = node.getBoundingClientRect();
            if (nodeRect.top < triggerPoint) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', updateTimelineOnScroll, { passive: true });
    window.addEventListener('resize', updateTimelineOnScroll, { passive: true });

    updateTimelineOnScroll();
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