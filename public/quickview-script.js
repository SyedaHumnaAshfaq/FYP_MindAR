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
});
