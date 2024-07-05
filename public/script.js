document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const totalItems = carouselInner.children.length;
    const itemWidth = carouselInner.children[0].clientWidth;
    
    function updateWidth() {
        carouselInner.style.width = `calc(${itemWidth}px * ${carouselInner.children.length})`;
    }
    
    updateWidth();
    window.addEventListener('resize', updateWidth);

    

    


 
    
});



