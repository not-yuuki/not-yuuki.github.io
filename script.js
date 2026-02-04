document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // --- Smooth Scroll Parallax Effect ---
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.getElementById('hero-background');
        if (parallax) {
            parallax.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        }
    });
});
