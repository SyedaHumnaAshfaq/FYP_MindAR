$(document).ready(function () {

    const stripe = Stripe('pk_test_51QDn2jLIHxgGTNSVNsGocnaQmL68isjNfuxiFNoBo6WbvyVuKUAzb998Er2f7nH2CXrBel4ZllVjrhruo8miDl7k00qjqkXB9v');
    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        paymentMethodCreation: 'manual',
        // Fully customizable with appearance API.
        appearance: {/*...*/ },
    };

    // Set up Stripe.js and Elements to use in checkout form
    const elements = stripe.elements(options);

    // Create and mount the Payment Element
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

    const form = document.getElementById('payment-form');
const submitBtn = document.getElementById('submit');

const handleError = (error) => {
  const messageContainer = document.querySelector('#error-message');
  messageContainer.textContent = error.message;
  submitBtn.disabled = false;
}

form.addEventListener('submit', async (event) => {
  // We don't want to let default form submission happen here,
  // which would refresh the page.
  event.preventDefault();

  // Prevent multiple form submissions
  if (submitBtn.disabled) {
    return;
  }

  // Disable form submission while loading
  submitBtn.disabled = true;

  // Trigger form validation and wallet collection
  const {error: submitError} = await elements.submit();
  if (submitError) {
    handleError(submitError);
    return;
  }

  // Create the ConfirmationToken using the details collected by the Payment Element
  // and additional shipping information
  const {error, confirmationToken} = await stripe.createConfirmationToken({
    elements,
    params: {
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '1234 Main Street',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
          postal_code: '94111',
        },
      },
      return_url: 'https://example.com/order/123/complete'
    }
  });

  if (error) {
    // This point is only reached if there's an immediate error when
    // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
    //   alert(error.message);
    return;
  }

  // Create the PaymentIntent
  const res = await fetch("/create-confirm-intent", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      confirmationTokenId: confirmationToken.id,
    }),
  });

  const data = await res.json();

  // Handle any next actions or errors. See the Handle any next actions step for implementation.
  handleServerResponse(data);
});
    
const handleServerResponse = async (response) => {
    if (response.error) {
        alert("payment failed!");
      // Show error from server on payment form
    } else if (response.status === "requires_action") {
      // Use Stripe.js to handle the required next action
      const {
        error,
        paymentIntent
      } = await stripe.handleNextAction({
        clientSecret: response.clientSecret
      });
  
        if (error) {
          alert(error.message);
        // Show error from Stripe.js in payment form
        } else {
            alert('Payment successful');
        // Actions handled, show success message
      }
    } else {
        alert('Payment successful');
      // No actions needed, show success message
    }
  }



});


$(document).ready(function () {
    // Handle Payment Method Selection
    $('input[name="payment"]').on('change', function () {
        if ($('#cod').is(':checked')) {
            $('#cod-options').show();
            $('#submit-btn').text('Confirm Order');
        } else {
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
    $('#submit-btn').on('click', function () {
        if ($('#card').is(':checked')) {
            window.location.href = '/checkout'; // Redirect to "checkput" page for card payment
        } else {
            alert('Order confirmed!');
        }
    });
});
