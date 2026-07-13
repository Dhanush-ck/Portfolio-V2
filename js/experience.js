document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Intersection Observer for Entry Animations
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animating once for better performance
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements that need to be animated on scroll
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right');
    animatedElements.forEach(el => observer.observe(el));


    /* ==========================================================================
       Dynamic Timeline Line & Glowing Nodes
       ========================================================================== */
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
        
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));
        
        // Apply height to progress bar
        progressBar.style.height = `${progress * 100}%`;

        // Check each node to see if it should glow
        nodes.forEach(node => {
            const nodeRect = node.getBoundingClientRect();
            // If the node reaches above the middle of the screen (the fill line)
            if (nodeRect.top < triggerPoint) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });
    }

    // Attach scroll and resize listeners for recalculations
    window.addEventListener('scroll', updateTimelineOnScroll, { passive: true });
    window.addEventListener('resize', updateTimelineOnScroll, { passive: true });
    
    // Initial call to set state on load
    updateTimelineOnScroll();
});

const navEl = document.querySelector('.top-nav');
window.addEventListener('scroll', ()=>{
    navEl.classList.toggle('scrolled', window.scrollY > 20);
});