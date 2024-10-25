const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QDn2jLIHxgGTNSVNEx5m9t9JEHW42zYz5oiV0ofv20DJHuUmLZjV8ORJYwpSW5DLiDRx9z9rCgOfwVvMLW51lFl00cJrVPs7b'); // Replace with your Test Mode Secret Key

// Create Payment Intent
const createPaymentIntent =  async (req, res) => {
    try {
        const intent = await stripe.paymentIntents.create({
          confirm: true,
          amount: 1099,
          currency: 'usd',
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {enabled: true},
          confirmation_token: req.body.confirmationTokenId, // the ConfirmationToken ID sent by your client
        });
        res.json({
          client_secret: intent.client_secret,
          status: intent.status
        });
      } catch (err) {
        res.json({
          error: err
        })
      }
};

module.exports = { createPaymentIntent }; // Export the function
