document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const totalItems = carouselInner.children.length;
    const itemWidth = carouselInner.children[0].clientWidth;
    
    function updateWidth() {
        carouselInner.style.width = `calc(${itemWidth}px * ${carouselInner.children.length})`;
    }
    
    updateWidth();
    window.addEventListener('resize', updateWidth);

    // // Automatic sliding
    // function autoSlide() {
    //     if (isAnimating) return;
    //     moveCarousel(1); // Move to the next item
    // }

    // setInterval(autoSlide, 1000); // Change image every 3 seconds



 
    
});



