
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

       //addto cart
    //    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    // const cartItemsContainer = document.getElementById('cart-items');
    // const cartSubtotal = document.getElementById('cart-subtotal');
    // const cartTotal = document.getElementById('cart-total');

    // addToCartButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         const product = button.closest('.product');
    //         const productId = product.dataset.id;
    //         const productName = product.dataset.name;
    //         const productPrice = product.dataset.price;
    //         const productImage = product.dataset.image;
    //         addToCart(productId, productName, productPrice, productImage);
    //     });
    // });

    // function addToCart(id, name, price, image) {
    //     let cart = localStorage.getItem('cart');
    //     cart = cart ? JSON.parse(cart) : [];

    //     const existingProduct = cart.find(item => item.id === id);
    //     if (existingProduct) {
    //         existingProduct.quantity += 1;
    //     } else {
    //         cart.push({ id, name, price, image, quantity: 1 });
    //     }

    //     localStorage.setItem('cart', JSON.stringify(cart));
    //     alert('Item added to cart');
    // }

    // function displayCartItems() {
    //     let cart = localStorage.getItem('cart');
    //     cart = cart ? JSON.parse(cart) : [];
    //     cartItemsContainer.innerHTML = '';

    //     cart.forEach(item => {
    //         const total = item.price * item.quantity;
    //         const row = document.createElement('tr');
    //         row.innerHTML = `
    //             <td>
    //                 <img src="${item.image}" alt="${item.name}">
    //                 <span>${item.name}</span>
    //             </td>
    //             <td>$${item.price}</td>
    //             <td>
    //                 <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
    //             </td>
    //             <td>$${total.toFixed(2)}</td>
    //             <td>
    //                 <button class="remove-btn" data-id="${item.id}">Remove</button>
    //             </td>
    //         `;
    //         cartItemsContainer.appendChild(row);
    //     });

    //     updateTotal();
    // }

    // function updateTotal() {
    //     let cart = localStorage.getItem('cart');
    //     cart = cart ? JSON.parse(cart) : [];

    //     let subtotal = 0;
    //     cart.forEach(item => {
    //         subtotal += item.price * item.quantity;
    //     });

    //     cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    //     cartTotal.textContent = `$${subtotal.toFixed(2)}`;
    // }

    // cartItemsContainer.addEventListener('input', (e) => {
    //     if (e.target.type === 'number') {
    //         const id = e.target.dataset.id;
    //         const quantity = parseInt(e.target.value);
    //         updateCartQuantity(id, quantity);
    //     }
    // });

    // cartItemsContainer.addEventListener('click', (e) => {
    //     if (e.target.classList.contains('remove-btn')) {
    //         const id = e.target.dataset.id;
    //         removeFromCart(id);
    //     }
    // });

    // function updateCartQuantity(id, quantity) {
    //     let cart = localStorage.getItem('cart');
    //     cart = cart ? JSON.parse(cart) : [];

    //     const product = cart.find(item => item.id === id);
    //     if (product) {
    //         product.quantity = quantity;
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         displayCartItems();
    //     }
    // }

    // function removeFromCart(id) {
    //     let cart = localStorage.getItem('cart');
    //     cart = cart ? JSON.parse(cart) : [];

    //     cart = cart.filter(item => item.id !== id);
    //     localStorage.setItem('cart', JSON.stringify(cart));
    //     displayCartItems();
    // }

    // // Display cart items on cart page load
    // if (cartItemsContainer) {
    //     displayCartItems();
    // }

  
});



