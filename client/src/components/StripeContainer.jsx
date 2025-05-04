import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import QRDisplay from './QRDisplay';

const PUBLIC_KEY = "pk_test_51RKx3p4FdSrBJNVnb6e1CGCEqZn4ubgpG7KVv6jtfYDgk21jCPjKztSAyXPFGVeclI83wp8Hrjtt26nFJSNnN1Ma00l4xPWKkM"; // Replace with your own

const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <div className='mt-6'>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
     
      
    </Elements>
    </div>
  );
};

export default StripeContainer;
