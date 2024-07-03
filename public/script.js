// // scripts.js
// document.addEventListener('DOMContentLoaded', (event) => {
//     const slides = document.querySelector('.slides');
//     let index = 0;
    
//     function slideShow() {
//         index++;
//         if (index > 5) {
//             index = 0;
//         }
//         slides.style.transform = `translateX(${-index * 100}%)`;
//     }
    
//     setInterval(slideShow, 3000); 
//     // Change image every 3 seconds


//     // Additional carousel functionality
//     const carousel = document.querySelector('.carousel');
//     const carouselInner = document.querySelector('.carousel-inner');
//     const carouselItems = document.querySelectorAll('.carousel-item');
//     const prevBtn = document.querySelector('.carousel-control-prev');
//     const nextBtn = document.querySelector('.carousel-control-next');
//     let currentIndex = 0;

//     function moveCarousel(direction) {
//         currentIndex += direction;
//         if (currentIndex < 0) {
//             currentIndex = carouselItems.length - 1;
//         } else if (currentIndex >= carouselItems.length) {
//             currentIndex = 0;
//         }
//         carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
//     }

//     // Event listeners for navigation buttons
//     prevBtn.addEventListener('click', () => moveCarousel(-1));
//     nextBtn.addEventListener('click', () => moveCarousel(1));
// }






// );
// const carousel = document.querySelector('.carousel');
// const carouselInner = document.querySelector('.carousel-inner');
// const carouselItems = document.querySelectorAll('.carousel-item');
// const prevBtn = document.querySelector('.carousel-control-prev');
// const nextBtn = document.querySelector('.carousel-control-next');
// let currentIndex = 0;

// function moveCarousel(direction) {
//     currentIndex += direction;
//     if (currentIndex < 0) {
//         currentIndex = carouselItems.length - 1;
//     } else if (currentIndex >= carouselItems.length) {
//         currentIndex = 0;
//     }
//     carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
// }

// // Event listeners for navigation buttons
// prevBtn.addEventListener('click', () => moveCarousel(-1));
// nextBtn.addEventListener('click', () => moveCarousel(1));

document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control-prev');
    const nextBtn = document.querySelector('.carousel-control-next');
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    const itemWidth = carouselItems[0].clientWidth; // Assuming all items have the same width
    let isAnimating = false;

    function moveCarousel(direction) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (currentIndex + direction + totalItems) % totalItems;
        const offset = -currentIndex * itemWidth;

        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(${offset}px)`;

        setTimeout(() => {
            isAnimating = false;
        }, 500); // Adjust according to your transition duration
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => moveCarousel(-1));
    nextBtn.addEventListener('click', () => moveCarousel(1));

    // Automatic sliding
    function autoSlide() {
        if (isAnimating) return;
        moveCarousel(1); // Move to the next item
    }

    setInterval(autoSlide, 3000); // Change image every 3 seconds
});



