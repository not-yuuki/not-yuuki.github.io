document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
        disable: false
    });

    // --- Background Music Player ---
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = true; // Start as playing since we have autoplay

    if (musicToggle && backgroundMusic) {
        // Set initial volume
        backgroundMusic.volume = 0.3;

        // Try to autoplay on page load
        const tryAutoplay = () => {
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        musicIcon.textContent = '🎵';
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.log('Autoplay prevented. User interaction needed.');
                        musicIcon.textContent = '🔇';
                        isPlaying = false;
                    });
            }
        };

        // Try autoplay
        tryAutoplay();

        // Also try on first user interaction
        document.addEventListener('click', function firstClick() {
            if (!isPlaying) {
                tryAutoplay();
            }
            document.removeEventListener('click', firstClick);
        }, { once: true });

        // Toggle on button click
        musicToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the first click listener
            
            if (isPlaying) {
                backgroundMusic.pause();
                musicIcon.textContent = '🔇';
                isPlaying = false;
            } else {
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            musicIcon.textContent = '🎵';
                            isPlaying = true;
                        })
                        .catch(error => {
                            console.log('Playback prevented:', error);
                        });
                }
            }
        });
    }

    // --- Smooth Scroll Fix ---
    // Ensure smooth scrolling works properly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Prevent Horizontal Scroll ---
    // This fixes the horizontal scrollbar issue on mobile
    function preventHorizontalScroll() {
        const body = document.body;
        const html = document.documentElement;
        
        body.style.overflowX = 'hidden';
        html.style.overflowX = 'hidden';
        body.style.width = '100%';
        html.style.width = '100%';
    }

    preventHorizontalScroll();

    // Re-check on resize
    window.addEventListener('resize', preventHorizontalScroll);

    // --- Add Parallax Effect to Hero Background (Optional) ---
    const heroBackground = document.querySelector('#hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // --- Easter Egg: Konami Code (Optional Fun) ---
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            // Trigger confetti or special effect
            createConfetti();
        }
    });

    // --- Confetti Function ---
    function createConfetti() {
        const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);

            const fallDuration = 2 + Math.random() * 3;
            const swayAmount = (Math.random() - 0.5) * 200;

            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 20}px) translateX(${swayAmount}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }
    }

    // --- Log successful initialization ---
    console.log('🎉 Birthday website loaded successfully!');
});
