


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


   
    
}
);


document.addEventListener('DOMContentLoaded', () => {
    const glassesSection = document.getElementById('glasses-section');
    const cards = document.querySelectorAll('.card');
    const glasses = document.getElementById('glasses');

    let currentIndex = 0;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGlasses();
                observer.unobserve(glassesSection);
            }
        });
    }, observerOptions);

    observer.observe(glassesSection);

    const animateGlasses = () => {
        if (currentIndex < cards.length) {
            const currentCard = cards[currentIndex];
            const glassesImage = currentCard.querySelector('img');

            // Remove the image from the card
            const clonedImage = glassesImage.cloneNode();
            currentCard.removeChild(glassesImage);

            // Add the image to the glasses container
            glasses.innerHTML = '';
            glasses.appendChild(clonedImage);

            glasses.classList.add('move-glasses');
              // Adjust the duration to make glasses stay longer on the face
              const animationDuration = 2500; // Duration of the animation
              const stayDuration = 1000; // Duration to stay on the face (adjust this value)
  

            setTimeout(() => {
                glasses.classList.remove('move-glasses');
                // Add the image back to the card after animation
                currentCard.appendChild(glassesImage);
                currentIndex++;
                setTimeout(animateGlasses, 500); // Small delay before next animation
            }, animationDuration + stayDuration); // Duration of the animation + small delay
        }
    };
});


// document.addEventListener("scroll", () => {
//     const scrollPosition = window.scrollY;
//     const maxScroll = document.body.scrollHeight - window.innerHeight;
//     const scrollPercentage = scrollPosition / maxScroll;

//     const startColor = { r: 0, g: 60, b: 67 }; // #ff7e5f (228,213,183 140,171,168   (107,169,152)rgb(255, 242, 225)
//     const endColor = { r: 19, g: 93, b: 102}; // #feb47b 217,185,155 235,218,218         (84,146,125)
   
//     const newColor = {
//         r: Math.round(startColor.r + (endColor.r - startColor.r) * scrollPercentage),
//         g: Math.round(startColor.g + (endColor.g - startColor.g) * scrollPercentage),
//         b: Math.round(startColor.b + (endColor.b - startColor.b) * scrollPercentage),
//     };

//     const newBackgroundSize = 50 + (scrollPercentage * 100);

//     document.body.style.background = `radial-gradient(circle at center, rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, 0) ${newBackgroundSize}%, rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, 1) ${newBackgroundSize}%)`;
// });




document.addEventListener('DOMContentLoaded', () => {
    const nosepin = document.getElementById('nosepin');
    const nosepinSection = document.getElementById('nosepin-section');

    // IntersectionObserver for nosepin animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                nosepin.classList.add('move-nosepin');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    observer.observe(nosepinSection);
});



document.addEventListener("DOMContentLoaded", function () {
    const sliderBox = document.querySelector(".slider-box");
    
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom >= 0
      );
    }
  
    function handleScroll() {
      if (isElementInViewport(sliderBox)) {
        sliderBox.classList.add("show");
      } else {
        sliderBox.classList.remove("show");
      }
    }
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
  });
  
//   function toggleSidebar() {
//     const sidebar = document.getElementById('sidebar');
//     if (sidebar.style.width === '250px') {
//         sidebar.style.width = '0';
//     } else {
//         sidebar.style.width = '250px';
//     }
// }
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}


// window.addEventListener('scroll', () => {
//     const scrollPosition = window.scrollY;
//     const windowHeight = window.innerHeight;
//     const body = document.body;
  
//     if (scrollPosition < windowHeight) {
//       body.style.background = '#e0f7fa'; // Light teal
//     } else if (scrollPosition < windowHeight * 2) {
//       body.style.background = '#b2dfdb'; // Medium light teal
//     } else if (scrollPosition < windowHeight * 3) {
//       body.style.background = '#80cbc4'; // Medium teal
//     } else {
//       body.style.background = '#4db6ac'; // Dark teal
//     }
//   });
  

// for favourites section
document.addEventListener('DOMContentLoaded', () => {
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.wishlist-item');
            item.remove();
            alert('Item removed from wishlist.');
        });
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Item added to cart!');


        });
    });
});


// new productspage
document.addEventListener('DOMContentLoaded', () => {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    // const addToCartButtons = document.querySelectorAll('.add-to-cart');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Quick view of the product.');
        });
    });

    // addToCartButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         alert('Product added to cart.');
    //     });
    // });
    var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation()
});

//for tracking order page
// JavaScript to handle pop-up functionality
document.querySelectorAll('.status-box').forEach(box => {
    box.addEventListener('click', function() {
        const popup = document.getElementById('popup');
        const popupText = document.getElementById('popup-text');
        popupText.textContent = `Details for: ${this.dataset.status}`;
        popup.style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', function(e) {
    const popup = document.getElementById('popup');
    if (e.target == popup) {
        popup.style.display = 'none';
    }
});


// Animation for "OUR VISION" section on load
document.addEventListener("DOMContentLoaded", () => {
    const visionTitle = document.querySelector(".vision-title");
    visionTitle.style.opacity = 0;
    visionTitle.style.transition = "opacity 1s ease, transform 1s ease";
    
    setTimeout(() => {
        visionTitle.style.opacity = 1;
        visionTitle.style.transform = "translateY(0)";
    }, 500);
});




// navbar responsive
// scripts.js
// scripts.js
// Function to toggle the main dropdown menu
function toggleMenu() { 
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Function to toggle the profile dropdown menu
function toggleProfileDropdown() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    const profileDropdown = document.getElementById("profileDropdown");

    if (!event.target.closest('.dropbtn') && profileDropdown.classList.contains('show')) {
        profileDropdown.classList.remove('show');
    }
};



//faqs
document.addEventListener('DOMContentLoaded', function () {
    // Select all the FAQ question elements
    const faqQuestions = document.querySelectorAll('.faq-question');
  
    // Add event listener to each question
    faqQuestions.forEach((question) => {
      question.addEventListener('click', function () {
        const answer = question.nextElementSibling; // The answer is the next sibling element
  
        // Toggle the display of the answer
        if (answer.style.display === 'none' || answer.style.display === '') {
          answer.style.display = 'block'; // Show the answer
        } else {
          answer.style.display = 'none'; // Hide the answer
        }
  
        // Toggle the plus/minus icon
        const icon = question.querySelector('.faq-icon');
        icon.textContent = icon.textContent === '+' ? '−' : '+';
      });
    });
  });
  
  