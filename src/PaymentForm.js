// src/PaymentForm.js
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css';

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We don't need a return_url as we are handling the result directly
      },
      // This is the crucial part: it prevents an immediate redirect
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment was successful!
      console.log('Payment succeeded:', paymentIntent);
      // Now, call the function passed from CheckoutPage to finalize the order
      onPaymentSuccess(paymentIntent.id);
    } else {
      setErrorMessage("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      <button disabled={isProcessing || !stripe || !elements} className="pay-now-btn">
        <span>{isProcessing ? "Processing..." : "Pay Now"}</span>
      </button>
      {errorMessage && <div className="payment-error">{errorMessage}</div>}
    </form>
  );
};

export default PaymentForm;