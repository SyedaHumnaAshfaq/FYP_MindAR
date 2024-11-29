$(document).ready(function () {
    // Handle Payment Method Selection
    $('input[name="payment"]').on('change', function () {
        if ($('#cod').is(':checked')) {
            $('#cod-options').show();
            $('#billing-address').show();
            $('#submit-btn').text('Confirm Order');
        } else if ($('#card').is(':checked')) {
            $('#cod-options').hide();
            $('#billing-address').hide();
            $('#submit-btn').text('Pay Now');
        }
    });

    // Handle Billing Address Toggle for COD
    $('#same-as-shipping').on('change', function () {
        if ($(this).is(':checked')) {
            $('#billing-address').hide();
        } else {
            $('#billing-address').show();
        }
    });

    // Handle Form Submission
    $('#submit-btn').on('click', function (event) {
        event.preventDefault();
        let isValid = true;
        const name = $('input[name="name"]').val();
        const email = $('input[name="email"]').val();
        const address = $('input[name="address"]').val();
        const city = $('input[name="city"]').val();
        const zip = $('input[name="zip"]').val();
        const paymentMethod = $('input[name="payment"]:checked').val();
        const sameAsShipping = $('#same-as-shipping').is(':checked'); // Check if billing address is same as shipping
        const shippingAddress = {
            name: name,
            addressLine1: address,
            city: city,
            postalCode: zip,
        };


        // Clear previous error messages
        $('.error-message').remove();

        // Check if required fields are filled
        if (!name) {
            isValid = false;
            $('input[name="name"]').after('<div class="error-message">Name is required.</div>');
        }

        if (!email) {
            isValid = false;
            $('input[name="email"]').after('<div class="error-message">Email is required.</div>');
        }

        if (!address) {
            isValid = false;
            $('input[name="address"]').after('<div class="error-message">Address is required.</div>');
        }

        if (!city) {
            isValid = false;
            $('input[name="city"]').after('<div class="error-message">City is required.</div>');
        }
        let billingAddress = {};
        if (sameAsShipping) {
            billingAddress = {
                addressLine1: address,
                city: city,
                postalCode: zip,
            };
        }

        if (!sameAsShipping) {
            const billAddress = $('input[name="billing-address"]').val();
            const billingCity = $('input[name="billing-city"]').val();
            const billingZip = $('input[name="billing-zip"]').val();
            console.log(billingZip);

            if (!billAddress) {
                isValid = false;
                console.log("Billing address is missing");
                $('input[name="billing-address"]').after('<div class="error-message">Billing address is required.</div>');
            }

            if (!billingCity) {
                isValid = false;
                console.log("Billing city is missing");
                $('input[name="billing-city"]').after('<div class="error-message">Billing city is required.</div>');
            }
            billingAddress = {
                addressLine1: billAddress,
                city: billingCity,
                postalCode: billingZip,
            };



        }


        // Check if a payment method is selected
        if (!paymentMethod) {
            isValid = false;
            $('#cod').before('<div class="error-message">Please select a payment method.</div>');
        }


        // If the form is valid, proceed with the payment
        if (isValid) {
            if ($('#card').is(':checked')) {
                console.log('Card payment selected');
                window.location.href = '/checkout'; // Redirect to "checkout" page for card payment
            } else {
                // alert('Order confirmed!'); // For COD
                const cartItems = [];
                $('.cart-table tbody tr').each(function () {
                    const productId = $(this).data("productid");
                    const productName = $(this).find('td:nth-child(1)').text().trim();
                    const productPrice = parseFloat($(this).find('td:nth-child(2)').text().replace('Rs.', ''));
                    const quantity = parseInt($(this).find('td:nth-child(3)').text());

                    cartItems.push({
                        productId: productId,
                        productName: productName,
                        productPrice: productPrice,
                        quantity: quantity
                    });
                    console.log(cartItems);
                });
                const orderData = {
                    customerName: name,
                    products: cartItems.map(item => ({
                        productId: item.productId,  // Replace with real product ID from your product data
                        quantity: item.quantity,
                        price: item.productPrice
                    })),
                    totalAmount: cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0),
                    shippingAddress: shippingAddress,
                    billingAddress: billingAddress,
                    method: paymentMethod
                };
                console.log("order data:",orderData);
                $.ajax({
                    url: '/createOrder',  // Endpoint for creating an order
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(orderData),
                    success: function (response) {
                        // Handle success (e.g., show success message, redirect, etc.)
                        alert('Order placed successfully!');
                        window.location.href = '/order-confirmation';  // Redirect to confirmation page
                    },
                    error: function (error) {
                        // Handle error
                        alert('Error placing order. Please try again.');
                    }
                });
            }
        } else {
            // Optionally, focus on the first invalid input
            $('input:invalid').first().focus();
        }

    });
});

