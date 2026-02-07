document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
        disable: false
    });

    // --- Confetti on Page Load ---
    setTimeout(() => {
        createBigConfetti();
    }, 500);

    // --- Background Music Player - Force Autoplay ---
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    if (musicToggle && backgroundMusic) {
        // Set initial volume
        backgroundMusic.volume = 0.3;

        // Force play music on page load
        function forcePlayMusic() {
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        musicIcon.textContent = '🎵';
                        isPlaying = true;
                    })
                    .catch(error => {
                        // If autoplay is blocked, try again on any user interaction
                        console.log('Autoplay blocked, waiting for user interaction...');
                        
                        const playOnInteraction = () => {
                            backgroundMusic.play()
                                .then(() => {
                                    musicIcon.textContent = '🎵';
                                    isPlaying = true;
                                })
                                .catch(err => console.log('Still blocked:', err));
                            
                            // Remove listeners after first successful play
                            document.removeEventListener('click', playOnInteraction);
                            document.removeEventListener('keydown', playOnInteraction);
                            document.removeEventListener('scroll', playOnInteraction);
                            document.removeEventListener('touchstart', playOnInteraction);
                        };
                        
                        // Try on any interaction
                        document.addEventListener('click', playOnInteraction, { once: true });
                        document.addEventListener('keydown', playOnInteraction, { once: true });
                        document.addEventListener('scroll', playOnInteraction, { once: true });
                        document.addEventListener('touchstart', playOnInteraction, { once: true });
                    });
            }
        }

        // Attempt to play immediately
        forcePlayMusic();

        // Toggle on button click
        musicToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (isPlaying) {
                backgroundMusic.pause();
                musicIcon.textContent = '🔇';
                isPlaying = false;
            } else {
                backgroundMusic.play()
                    .then(() => {
                        musicIcon.textContent = '🎵';
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.log('Playback prevented:', error);
                    });
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

    // --- BIG Confetti on Page Load ---
    function createBigConfetti() {
        const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#f97316', '#84cc16'];
        const confettiCount = 200; // More confetti!
        const shapes = ['circle', 'square', 'triangle'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const size = 8 + Math.random() * 12; // Bigger pieces
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.style.position = 'fixed';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';
            
            // Different shapes
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = `${size/2}px solid transparent`;
                confetti.style.borderRight = `${size/2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
            } else {
                confetti.style.borderRadius = '2px';
            }
            
            document.body.appendChild(confetti);

            const fallDuration = 3 + Math.random() * 4; // Slower fall
            const swayAmount = (Math.random() - 0.5) * 300; // More sway
            const rotations = 360 + Math.random() * 720; // More rotations

            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 50}px) translateX(${swayAmount}px) rotate(${rotations}deg) scale(0.5)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }

        // Add some sparkles too!
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'fixed';
                sparkle.textContent = '✨';
                sparkle.style.fontSize = (15 + Math.random() * 15) + 'px';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = '-30px';
                sparkle.style.zIndex = '10000';
                sparkle.style.pointerEvents = 'none';
                
                document.body.appendChild(sparkle);

                sparkle.animate([
                    { 
                        transform: 'translateY(0) rotate(0deg)',
                        opacity: 1
                    },
                    { 
                        transform: `translateY(${window.innerHeight}px) rotate(${360 + Math.random() * 360}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'ease-in'
                }).onfinish = () => sparkle.remove();
            }, i * 30);
        }
    }

    // --- Log successful initialization ---
    console.log('🎉 Birthday website loaded successfully!');
});
