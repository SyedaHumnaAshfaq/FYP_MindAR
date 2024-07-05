document.addEventListener('DOMContentLoaded', () => {

    //moving carousel
    const carouselInner = document.querySelector('.carousel-inner');
    const totalItems = carouselInner.children.length;
    const itemWidth = carouselInner.children[0].clientWidth;
    
    function updateWidth() {
        carouselInner.style.width = `calc(${itemWidth}px * ${carouselInner.children.length})`;
    }
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
//end of moving carousel


 // Function to show image slider after delay
 const imageSliderSection = document.querySelector("#image-slider");

 function showImageSlider() {
     imageSliderSection.classList.add("show");
 }

 function isElementInViewport(el) {
     const rect = el.getBoundingClientRect();
     return (
         rect.top >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
     );
 }

 function handleScroll() {
     if (isElementInViewport(imageSliderSection)) {
         showImageSlider();
         window.removeEventListener("scroll", handleScroll);
     }
 }

 // Delay the function to show after a certain scroll point or time
 setTimeout(function () {
     window.addEventListener("scroll", handleScroll);
 }, 2000);
 // End of image slider section

 // Function to show card section after delay
 const cardSection = document.querySelector(".card1-section");

 function showCardSection() {
     cardSection.classList.add("show");
 }

 function handleCardScroll() {
     if (isElementInViewport(cardSection)) {
         showCardSection();
         window.removeEventListener("scroll", handleCardScroll);
     }
 }

 // Listen for scroll events for card section
 window.addEventListener("scroll", handleCardScroll);
 // End of card section function

// Function to show About Us section after delay
const aboutSection = document.querySelector('#about');

function showAboutSection() {
    aboutSection.classList.add('show');
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function handleAboutScroll() {
    if (isElementInViewport(aboutSection)) {
        setTimeout(showAboutSection, 100); // Delayed appearance after 1 second
        window.removeEventListener('scroll', handleAboutScroll);
    }
}

window.addEventListener('scroll', handleAboutScroll);
 
    
// //video
// const videoContainer = document.getElementById('video-container');

// // Delayed enlargement after 3 seconds
// setTimeout(() => {
//   videoContainer.classList.add('video-enlarged');
// }, 3000);


const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('landing-video');

  // Function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to show and enlarge video
  function handleVideoScroll() {
    if (isElementInViewport(videoContainer)) {
      // Show the video container
      videoContainer.style.display = 'block';

      // Delayed enlargement after 3 seconds
      setTimeout(() => {
        videoContainer.classList.add('video-enlarged');
        
      }, 2000);

      // Remove the scroll event listener once video is shown/enlarged
      window.removeEventListener('scroll', handleVideoScroll);
    }
  }

  // Initial check on page load
  handleVideoScroll();

  // Listen for scroll events to trigger handleVideoScroll function
  window.addEventListener('scroll', handleVideoScroll);
    
});



