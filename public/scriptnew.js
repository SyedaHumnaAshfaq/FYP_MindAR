


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

// document.addEventListener('DOMContentLoaded', () => {
//     const glassesSection = document.getElementById('glasses-section');
//     const glasses = document.getElementById('glasses');

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 glasses.classList.add('move-glasses');
//             }
//         });
//     }, {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.5
//     });

//     observer.observe(glassesSection);
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const glassesSection = document.getElementById('glasses-section');
//     const glasses = document.getElementById('glasses');
//     const glassesImages = [
//         'images/glasses1.png',
//         'images/glasses2.png',
//         'images/glasses3.png'
//     ];
//     let currentGlasses = 0;

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 animateGlasses();
//                 observer.unobserve(glassesSection);
//             }
//         });
//     }, {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.5
//     });

//     observer.observe(glassesSection);

//     function animateGlasses() {
//         setInterval(() => {
//             glasses.src = glassesImages[currentGlasses];
//             glasses.classList.add('move-glasses');

//             setTimeout(() => {
//                 glasses.classList.remove('move-glasses');
//                 currentGlasses = (currentGlasses + 1) % glassesImages.length;
//             }, 2000);
//         }, 4000);
//     }
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const cards = document.querySelectorAll('.card');
//     const glasses = document.getElementById('glasses');

//     const animateGlasses = (card, glassesImage) => {
//         glasses.innerHTML = '';
//         glasses.appendChild(glassesImage.cloneNode());
//         glasses.classList.add('move-glasses');
//         card.innerHTML = '';
//         setTimeout(() => {
//             glasses.classList.remove('move-glasses');
//             card.appendChild(glassesImage);
//         }, 3000); // Adjust the duration as needed
//     };

//     cards.forEach(card => {
//         card.addEventListener('click', () => {
//             const glassesImage = card.querySelector('img');
//             animateGlasses(card, glassesImage);
//         });
//     });
// });




// document.addEventListener('DOMContentLoaded', () => {
//     const cards = document.querySelectorAll('.card');
//     const glasses = document.getElementById('glasses');
//     const glassesSection = document.getElementById('glasses-section');
    
//     const observerOptions = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.1
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 let delay = 0;
//                 cards.forEach((card, index) => {
//                     setTimeout(() => {
//                         animateGlasses(card, card.querySelector('img'));
//                     }, delay);
//                     delay += 3000; // Adjust the delay between animations as needed
//                 });
//                 observer.unobserve(glassesSection);
//             }
//         });
//     }, observerOptions);

//     observer.observe(glassesSection);

//     const animateGlasses = (card, glassesImage) => {
//         glasses.innerHTML = '';
//         glasses.appendChild(glassesImage.cloneNode());
//         glasses.classList.add('move-glasses');
//         card.innerHTML = '';
//         setTimeout(() => {
//             glasses.classList.remove('move-glasses');
//             card.appendChild(glassesImage);
//         }, 3000); // Adjust the duration as needed
//     };
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const glassesSection = document.getElementById('glasses-section');
//     const cards = document.querySelectorAll('.card');
//     const glasses = document.getElementById('glasses');

//     let currentIndex = 0;

//     const observerOptions = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.1
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 animateGlasses();
//                 observer.unobserve(glassesSection);
//             }
//         });
//     }, observerOptions);

//     observer.observe(glassesSection);

//     const animateGlasses = () => {
//         if (currentIndex < cards.length) {
//             const currentCard = cards[currentIndex];
//             const glassesImage = currentCard.querySelector('img');

//             // Remove the image from the card
//             const clonedImage = glassesImage.cloneNode();
//             currentCard.removeChild(glassesImage);

//             // Add the image to the glasses container
//             glasses.innerHTML = '';
//             glasses.appendChild(clonedImage);

//             glasses.classList.add('move-glasses');

//             setTimeout(() => {
//                 glasses.classList.remove('move-glasses');
//                 // Add the image back to the card after animation
//                 currentCard.appendChild(clonedImage);
//                 currentIndex++;
//                 animateGlasses(); // Animate the next glasses
//             }, 3000); // Adjust the duration as needed
//         }
//     };
// });




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


document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;

    const startColor = { r: 0, g: 102, b: 102 }; // #ff7e5f (228,213,183 140,171,168   (107,169,152)
    const endColor = { r: 0, g: 76, b: 76 }; // #feb47b 217,185,155 235,218,218         (84,146,125)

    const newColor = {
        r: Math.round(startColor.r + (endColor.r - startColor.r) * scrollPercentage),
        g: Math.round(startColor.g + (endColor.g - startColor.g) * scrollPercentage),
        b: Math.round(startColor.b + (endColor.b - startColor.b) * scrollPercentage),
    };

    const newBackgroundSize = 50 + (scrollPercentage * 100);

    document.body.style.background = `radial-gradient(circle at center, rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, 0) ${newBackgroundSize}%, rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, 1) ${newBackgroundSize}%)`;
});
