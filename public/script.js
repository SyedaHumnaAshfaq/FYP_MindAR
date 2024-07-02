// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const slides = document.querySelector('.slides');
    let index = 0;
    
    function slideShow() {
        index++;
        if (index > 5) {
            index = 0;
        }
        slides.style.transform = `translateX(${-index * 100}%)`;
    }
    
    setInterval(slideShow, 3000); // Change image every 3 seconds
}





);
// script.js

const modalBtn = document.querySelector('.modal-btn');
const modalContainer = document.querySelector('.modal-container');
const closeBtn = document.querySelector('.close-btn');

modalBtn.addEventListener('click', () => {
    modalContainer.style.display = 'block';
    setTimeout(() => {
        modalContainer.querySelector('.modal-content').style.transform = 'rotateX(0deg) rotateY(0deg)';
    }, 50);
});

closeBtn.addEventListener('click', () => {
    modalContainer.querySelector('.modal-content').style.transform = 'rotateX(10deg) rotateY(10deg)';
    setTimeout(() => {
        modalContainer.style.display = 'none';
    }, 500);
});

