$(document).ready(function () {
    // Handle Quick View button click
    $('.quick-view-btn').on('click', function () {
        const productId = $(this).data('product-id'); // Get the product ID from the button
        console.log(productId);
        if (productId) {
            // Redirect to the Quick View page with the product ID as a query parameter
            window.location.href = `/quickview/${productId}`;
        } else {
            alert('Product ID not found!'); // Error handling
        }
    });
    $(document).ready(function () {
        $('.try-now-btn').on('click', function () {
            const productId = $(this).data('product-id');
            const productCategory = $(this).data('product-category');
            if (productId && productCategory) {
                // Store product details in session storage
                sessionStorage.setItem('productId', productId);
                sessionStorage.setItem('productCategory', productCategory);
    
                // Redirect to Virtual Try-On page
                window.location.href = '/VirtualTryOn';
            } else {
                alert('Product details not found!');
            }
        });
    });
    
    
});
