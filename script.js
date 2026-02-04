document.addEventListener('DOMContentLoaded', function() {

    // --- Gift Box Opening Animation ---
    const giftScreen = document.getElementById('gift-screen');
    const giftBox = document.getElementById('gift-box');
    const mainContent = document.getElementById('main-content');
    const boxLid = document.getElementById('box-lid');
    const bow = document.getElementById('bow');

    // Make entire screen clickable as backup
    giftScreen.addEventListener('click', function() {
        openGift();
    });

    function openGift() {
        // Prevent multiple clicks
        giftScreen.style.pointerEvents = 'none';
        // Animate the bow flying off
        bow.style.transition = 'all 0.8s ease-out';
        bow.style.transform = 'translate(50px, -100px) rotate(180deg)';
        bow.style.opacity = '0';

        // Animate the lid opening
        setTimeout(() => {
            boxLid.style.transition = 'all 1s ease-out';
            boxLid.style.transform = 'translateY(-80px) rotateX(45deg)';
            boxLid.style.opacity = '0.3';
        }, 400);

        // Create confetti explosion
        setTimeout(() => {
            createConfetti();
        }, 800);

        // Fade out gift screen and show main content
        setTimeout(() => {
            giftScreen.style.transition = 'opacity 1s ease-out';
            giftScreen.style.opacity = '0';
            
            setTimeout(() => {
                giftScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                mainContent.style.opacity = '0';
                mainContent.style.transition = 'opacity 1.5s ease-in';
                
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                }, 50);
            }, 1000);
        }, 1800);
    }

    // --- Confetti Animation ---
    function createConfetti() {
        const colors = ['#FFB7C5', '#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);

            const angle = (Math.PI * 2 * i) / confettiCount;
            const velocity = 200 + Math.random() * 200;
            const xVelocity = Math.cos(angle) * velocity;
            const yVelocity = Math.sin(angle) * velocity;

            let posX = 0;
            let posY = 0;
            let rotation = 0;
            let opacity = 1;

            const animate = () => {
                posX += xVelocity * 0.016;
                posY += yVelocity * 0.016 + (9.8 * 0.016 * 10);
                rotation += 5;
                opacity -= 0.01;

                confetti.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;
                confetti.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };

            requestAnimationFrame(animate);
        }
    }

    // --- Live Age Counter ---
    const birthDate = new Date('2006-08-14T00:00:00'); // TODO: Update this with your friend's birthday
    const countdownElement = document.getElementById('countdown');

    function updateAge() {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        countdownElement.innerHTML = `${years}y ${months}m ${days}d <br> ${hours}h ${minutes}m ${seconds}s`;
    }
    setInterval(updateAge, 1000);
    updateAge();

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => {
                petal.update();
            });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }

    // --- Smooth Scroll Reveal Effect ---
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.getElementById('hero-background');
        if (parallax) {
            parallax.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        }
    });
});
