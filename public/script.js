
document.addEventListener('DOMContentLoaded', () => {
  // Function to show card section after delay
  const cardSection = document.querySelector(".card1-section");

  function showCardSection() {
      cardSection.classList.add("show");
  }

  function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
  }

  function handleCardScroll() {
      if (isElementInViewport(cardSection)) {
          showCardSection();
          window.removeEventListener("scroll", handleCardScroll);
      }
  }

  window.addEventListener("scroll", handleCardScroll);

  // Function to show About Us section after delay
  const aboutSection = document.querySelector('#about');

  function showAboutSection() {
      aboutSection.classList.add('show');
  }

  function handleAboutScroll() {
      if (isElementInViewport(aboutSection)) {
          setTimeout(showAboutSection, 100); // Delayed appearance after 1 second
          window.removeEventListener('scroll', handleAboutScroll);
      }
  }

  window.addEventListener('scroll', handleAboutScroll);

  // Video enlargement on scroll
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('landing-video');

  function isElementInView(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  function handleVideoScroll() {
      if (isElementInView(videoContainer)) {
          videoContainer.style.display = 'block';
          setTimeout(() => {
              videoContainer.classList.add('video-enlarged');
          }, 2000);
          window.removeEventListener('scroll', handleVideoScroll);
      }
  }

  handleVideoScroll();
  window.addEventListener('scroll', handleVideoScroll);

  // Scroll event for best selling section
  const bestSellingSection = document.querySelector('.best-selling');

  function handleImageScroll() {
      if (isElementInViewport(bestSellingSection)) {
          bestSellingSection.classList.add('visible');
          window.removeEventListener('scroll', handleImageScroll);
      }
  }

  window.addEventListener('scroll', handleImageScroll);

  // Swiper functionality
  document.getElementById('next').onclick = function() {
      const widthItem = document.querySelector('.item').offsetWidth;
      document.getElementById('formList').scrollLeft += widthItem;
  };
  document.getElementById('prev').onclick = function() {
      const widthItem = document.querySelector('.item').offsetWidth;
      document.getElementById('formList').scrollLeft -= widthItem;
  };

  // Dropdown functionality
  document.querySelector('.profile-icon').addEventListener('click', function(event) {
      event.preventDefault();
      const dropdown = document.querySelector('.dropdown');
      dropdown.classList.toggle('show');
  });
  window.addEventListener('click', function(event) {
      if (!event.target.closest('.dropdown')) {
          const dropdowns = document.querySelectorAll('.dropdown');
          dropdowns.forEach(dropdown => {
              dropdown.classList.remove('show');
          });
      }
  });

       // Heart icon click event
       const heartIcons = document.querySelectorAll('.heart-icon');

       heartIcons.forEach(icon => {
           icon.addEventListener('click', () => {
               icon.classList.toggle('clicked');
           });
       });

       
  
});




document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById("signupform").addEventListener("submit", async function handleSignUp(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.status === 400) {
                alert(result.message); // Display popup message
            } else if (response.status === 201) {
                alert(result.message);
                window.location.href = '/'; // Redirect on successful registration
            } else {
                alert('An unexpected error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during sign up');
        }
    });
  

    document.getElementById("loginform").addEventListener("submit", async function handleLogin(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.status === 200) {
                alert(result.message); // Display popup message
            } else if (response.status == 401) {
                alert(result.message);
                window.location.href = '/'; // Redirect on successful login
            }
            else {
                alert('An unexpected error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    });
    //moving carousel
    // const carouselInner = document.querySelector('.carousel-inner');
    // const totalItems = carouselInner.children.length;
    // const itemWidth = carouselInner.children[0].clientWidth;
    
    // function updateWidth() {
    //     carouselInner.style.width = `calc(${itemWidth}px * ${carouselInner.children.length})`;
    // }
    
    // updateWidth();
    // window.addEventListener('resize', updateWidth);
    

//end of moving carousel


 // Function to show image slider after delay
//  const imageSliderSection = document.querySelector("#image-slider");

//  function showImageSlider() {
//      imageSliderSection.classList.add("show");
//  }

//  function isElementInViewport(el) {
//      const rect = el.getBoundingClientRect();
//      return (
//          rect.top >= 0 &&
//          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//      );
//  }

//  function handleScroll() {
//      if (isElementInViewport(imageSliderSection)) {
//          showImageSlider();
//          window.removeEventListener("scroll", handleScroll);
//      }
//  }

//  // Delay the function to show after a certain scroll point or time
//  setTimeout(function () {
//      window.addEventListener("scroll", handleScroll);
//  }, 2000);
 // End of image slider section

 // Function to show card section after delay
 const cardSection = document.querySelector(".card1-section");

 function showCardSection() {
     cardSection.classList.add("show");
 }
  function isElementInViewport(el) {
     const rect = el.getBoundingClientRect();
     return (
         rect.top >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
     );
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
 
    

//video

const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('landing-video');

  // Function to check if element is in viewport
  function isElementInViewports(el) {
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
    if (isElementInViewports(videoContainer)) {
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



  //for scrolling images
  const bestSellingSection = document.querySelector('.best-selling');

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleimageScroll() {
    if (isElementInViewport(bestSellingSection)) {
      bestSellingSection.classList.add('visible');
      window.removeEventListener('scroll', handleimageScroll);
    }
  }

  window.addEventListener('scroll', handleimageScroll);




  //swiper
  document.getElementById('next').onclick = function(){
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function(){
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;
}
  //swiper

  //dropdown
  document.querySelector('.profile-icon').addEventListener('click', function(event) {
    event.preventDefault();
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show');
});
window.addEventListener('click', function(event) {
  if (!event.target.closest('.dropdown')) {
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
          dropdown.classList.remove('show');
      });
  }
});



       

  
 
  
});



