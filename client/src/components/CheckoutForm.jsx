import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import QRDisplay from './QRDisplay';
const CheckoutForm = () => {
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount) * 100; // Convert dollars to cents

    if (isNaN(parsedAmount) || parsedAmount < 50) {
      alert('Please enter a valid amount (minimum $0.50)');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const response = await fetch('http://localhost:4000/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: parsedAmount, id: paymentMethod.id }),
        });

        if (response.ok) {
          setSuccess(true);
        } else {
          console.error('Payment failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-6 bg-white shadow rounded space-y-4">
      <label className="block">
        <span className="text-amber-600 font-medium">Donation Amount ($)</span>
        <input
          type="number"
          step="0.01"
          min="0.5"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mt-1 w-full px-3 py-2 border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
      </label>

      <label className="block">
        <span className="text-amber-600 font-medium">Card Details</span>
        <div className="p-2 border border-amber-600 rounded">
          <CardElement />
        </div>
      </label>

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors duration-200"
      >
        Donate
      </button>

      {success && <p className="text-amber-600 text-center font-semibold">Thank you for your donation!</p>}

      <p>OR</p>
      <QRDisplay/>
    </form>
  );
};

export default CheckoutForm;
