


document.addEventListener('DOMContentLoaded', () => {
    const earringTop = document.getElementById('earring1');
    const bottomSection = document.querySelector('.bottom-section');
    const cards = document.querySelectorAll('.card');

    // IntersectionObserver for top section animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                earringTop.classList.add('move-top');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    observer.observe(bottomSection);


   

   
});

document.addEventListener('DOMContentLoaded', () => {
    const glassesSection = document.getElementById('glasses-section');
    const glasses = document.getElementById('glasses');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                glasses.classList.add('move-glasses');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    observer.observe(glassesSection);
});
