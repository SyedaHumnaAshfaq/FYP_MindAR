

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log('Add to cart button clicked');
            const button = event.target;
            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const productPrice = button.dataset.productPrice;
            const quantity = 1; // Default quantity, you can add a quantity selector if needed

            try {
                const response = await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId, productName, productPrice, quantity })
                });


                if (response.ok) {
                    // Optionally, update UI or notify user
                    window.location.href = '/addtocart'; // Redirect to cart page
                    console.log('Item added to cart successfully');

                }

                else {
                    console.error('Failed to add item to cart');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', async (event) => {
            console.log('Quantity changed');
            const input = event.target;
            const productId = input.dataset.id;
            const quantity = parseInt(input.value);

            try {
                const response = await fetch('/api/cart/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId, quantity })
                });

                if (response.ok) {
                    // Optionally, update UI or notify user
                    window.location.href = '/addtocart'; // Redirect to cart page
                    console.log('Quantity updated successfully');
                } else {
                    console.error('Failed to update quantity');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            console.log("Remove button clicked");
            const button = event.target;
            const productId = button.dataset.productId;

            try {
                const response = await fetch("/api/cart/delete", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ productId })
                });

                if (response.ok) {
                    const result = await response.json();
                    const { cartItems, grandTotal } = result;


                    // Remove the item from the UI
                    document.querySelector(`#cart-item-${productId}`).remove();
                    window.location.href = '/addtocart';
                    // Update the grand total
                    document.querySelector('.cart-grand-total').innerText = `Grand Total: $${grandTotal.toFixed(2)}`;



                } else {
                    console.error('Failed to remove item from cart');
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });


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
    document.getElementById('next').onclick = function () {
        const widthItem = document.querySelector('.item').offsetWidth;
        document.getElementById('formList').scrollLeft += widthItem;
    };
    document.getElementById('prev').onclick = function () {
        const widthItem = document.querySelector('.item').offsetWidth;
        document.getElementById('formList').scrollLeft -= widthItem;
    };

    // Dropdown functionality
    document.querySelector('.profile-icon').addEventListener('click', function (event) {
        event.preventDefault();
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('show');
    });
    window.addEventListener('click', function (event) {
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
                alert(result.message);
                window.location.href = '/';// Display popup message
            } else if (response.status === 401) {
                alert(result.message);
                // window.location.href = '/'; // Redirect on successful login
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
    document.getElementById('next').onclick = function () {
        const widthItem = document.querySelector('.item').offsetWidth;
        document.getElementById('formList').scrollLeft += widthItem;
    }
    document.getElementById('prev').onclick = function () {
        const widthItem = document.querySelector('.item').offsetWidth;
        document.getElementById('formList').scrollLeft -= widthItem;
    }
    //swiper

    //dropdown
    document.querySelector('.profile-icon').addEventListener('click', function (event) {
        event.preventDefault();
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('show');
    });
    window.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });








});

function toggleSideBar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('hidden');
    // document.getElementsByClassName('cards-sales').classList.toggle('smaller-view');
    if (sidebar.classList.contains('hidden')) {
        // Sidebar is hidden, remove margin from main content
        mainContent.style.marginLeft = '0';
    } else {
        // Sidebar is visible, add margin to main content
        mainContent.style.marginLeft = '250px'; // Adjust this to the width of your sidebar
    }
}


$(document).ready(function () {
    
    function initializeChart() {
        const salesData = $('#weekly-sales-data').data('sales');
        const weeklySalesData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Weekly Sales',
                data: salesData,
                borderColor: 'rgba(255, 165, 0, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: weeklySalesData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        const ctx = document.getElementById('weeklySalesChart').getContext('2d');
        new Chart(ctx, config);

        const productDataElement = $('#best-selling-products-data');
    console.log('Product Data Element:', productDataElement);

    const productNamesRaw = productDataElement.attr('data-products');
    const productSalesRaw = productDataElement.attr('data-sales');
    
    console.log('Product Names Raw:', productNamesRaw);
    console.log('Product Sales Raw:', productSalesRaw);

    // Debugging: Check if the attributes are being read as strings
    console.log('Type of Product Names Raw:', typeof productNamesRaw);
    console.log('Type of Product Sales Raw:', typeof productSalesRaw);

    // Parse the data only if it's not empty
    let productNames = [];
    let productSalesData = [];
    
    try {
        if (productNamesRaw) {
            productNames = JSON.parse(productNamesRaw);
        }
        if (productSalesRaw) {
            productSalesData = JSON.parse(productSalesRaw);
        }
    } catch (e) {
        console.error('Error parsing JSON:', e);
    }

    console.log('Parsed Product Names:', productNames);
    console.log('Parsed Product Sales Data:', productSalesData);

            // Create the pie chart
            if (productNames.length && productSalesData.length) {
                const ctx = document.getElementById('bestSellingProductsChart').getContext('2d');
        
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: productNames,
                        datasets: [{
                            label: 'Best Selling Products',
                            data: productSalesData,
                            backgroundColor: [
                                'rgba(255, 159, 64, 1)', // Dark Orange
                                'rgba(255, 99, 132, 1)', // Red
                                'rgba(54, 162, 235, 1)', // Blue
                                'rgba(75, 192, 192, 1)', // Green
                                'rgba(153, 102, 255, 1)', // Purple
                                'rgba(255, 206, 86, 1)'  // Yellow
                            ],
                            borderColor: [
                                // 'rgba(255, 159, 64, 1)', // Dark Orange
                                // 'rgba(255, 99, 132, 1)', // Red
                                // 'rgba(54, 162, 235, 1)', // Blue
                                // 'rgba(75, 192, 192, 1)', // Green
                                // 'rgba(153, 102, 255, 1)', // Purple
                                // 'rgba(255, 206, 86, 1)'  // Yellow
                                'rgba(255,255,255,1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false, 
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw;
                                    }
                                }
                            }
                        }
                        
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                            left: 20,
                            right: 20
                        }
                    }
                });
                    
                
            } else {
                console.log('No data available for chart');
            }
        }
    
    
    function loadContent(url) {
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                $('.main-content').html(data);
                if (url === '/dashboard') {
                    initializeChart();
                }
            },
            error: function (xhr, status, error) {
                $('.main-content').html("<p>Error loading content: " + error + "</p>");
            }
        });
    }

    $('#Dashboard').click(function () {
        loadContent('/dashboard');
    });
    $('#Orders').click(function () {
        loadContent('/orders');
    });

    $('.status-option').on('click', function (e) {
        e.preventDefault();

        var newStatus = $(this).data('value');
        var orderId = $(this).closest('tr').data('order-id');

        $.ajax({
            url: '/update-order-status',  // Change this to your actual update URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ order_id: orderId, status: newStatus }),
            success: function (response) {
                $('tr[data-order-id="' + orderId + '"] .status').text(newStatus);
                alert('Order status updated to ' + newStatus);
            },
            error: function (xhr, status, error) {
                alert('Failed to update order status. Please try again.');
            }
        });
    });
    let selectedStatus = null;
    let selectedMethod = null;
    let selectedDateRange = null;
    let startDate = null;
    let endDate = null;



    $('.filter-by-status').on('click', function (e) {
        e.preventDefault();

        selectedStatus = $(this).data('value');
        $('.currentStatus').text(selectedStatus || 'Status');
        applyFilters();

    });
    $('.filter-by-method').on('click', function (e) {
        e.preventDefault();

        selectedMethod = $(this).data('value');
        $('.currentMethod').text(selectedMethod || 'Method');
        applyFilters();

    });
    $('.filter-by-date').on('click', function (e) {
        e.preventDefault();
        selectedDateRange = $(this).data('value');
        $('.currentDate').text(selectedDateRange || 'Date');
        applyFilters();
    });
    $('#searchCustomerName').on('keyup', function () {
        applyFilters();
    });
    $('.reset').on('click', function () {
        $('#searchCustomerName').val('');
        $('.currentStatus').text('Status');
        $('.currentMethod').text('Method');
        $('.currentDate').text('Date');
        $('#Startdate').val('');
        $('#Enddate').val('');
        selectedStatus = null;
        selectedMethod = null;
        selectedDateRange = null;
        startDate = null;
        endDate = null;
        applyFilters();
    });
    $('#Startdate').on('change', function () {
        startDate = new Date($(this).val());
        startDate.setHours(0, 0, 0, 0);
        applyFilters();
    });

    $('#Enddate').on('change', function () {
        endDate = new Date($(this).val());
        endDate.setHours(23, 59, 59, 999);
        applyFilters();
    });

    function applyFilters() {
        const searchText = $('#searchCustomerName').val().toLowerCase();
        const now = new Date();

        $('tbody tr').each(function () {
            const rowStatus = $(this).find('.status').text().trim();
            const rowMethod = $(this).find('.method').text().trim();  // Adjust if method is in a different column
            const customerName = $(this).find('.customerName').text().toLowerCase();
            // const now = new Date();
            const orderDateString = $(this).find('.Date').text().trim();
            const orderDate = new Date(orderDateString); // Parse the date string
            let isVisible = true;
            const dateRanges = {
                'Last 5 days Orders': 5,
                'Last 7 days Orders': 7,
                'Last 15 days Orders': 15,
                'Last 30 days Orders': 30
            }

            if (selectedStatus && rowStatus !== selectedStatus) {
                isVisible = false;
            }

            if (selectedMethod && rowMethod !== selectedMethod) {
                isVisible = false;
            }

            if (searchText && !customerName.includes(searchText)) {
                isVisible = false;
            }

            if (selectedDateRange) {
                const days = dateRanges[selectedDateRange];
                const pastDate = new Date(now);
                pastDate.setDate(now.getDate() - days);
                if (orderDate < pastDate) {
                    isVisible = false;
                }
            }
            if (startDate && orderDate < startDate) {
                isVisible = false;
            }

            if (endDate && orderDate > endDate) {
                isVisible = false;
            }

            if (isVisible) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

   
});


