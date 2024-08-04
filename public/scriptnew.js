


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
  