document.addEventListener('DOMContentLoaded', function() {

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

    // --- Smooth Scroll Parallax Effect ---
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.getElementById('hero-background');
        if (parallax) {
            parallax.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        }
    });
});
