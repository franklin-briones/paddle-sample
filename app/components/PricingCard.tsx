"use client"
import pricingData from '../../data/pricingData';
import { useState, useEffect } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import LocalizedPrice from './LocalizedPrice';


const PricingCard = () => {

  const [isAnnual, setIsAnnual] = useState(false);
  const [isInline, setIsInline] = useState(false);
  const [isOnePage, setisOnePage] = useState(false);

  // Create a local state to store Paddle instance
  const [paddle, setPaddle] = useState<Paddle>();

  // Download and initialize Paddle instance from CDN
  useEffect(() => {
    // Initialize Paddle Script
    initializePaddle({
      environment: 'sandbox',
      token: `${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}`, //test_63e9b28fe5fa199ee98d51d3e54
      eventCallback: (data) => { console.log(data) }
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  

  // Callback to open a checkout
  const openCheckout = (priceid: string) => {
    paddle?.Checkout.open({
      items: [{ priceId: priceid, quantity: 1 }],
      // If inline pass inline checkout settings
      ...(isInline && {settings: {
            variant: isOnePage ? "one-page" : "multi-page",
            showAddDiscounts: false,
            theme: 'light',
            displayMode: 'inline',
            frameTarget: 'checkout-container',
            frameStyle: "width: 100%; min-width: 312px; background-color: transparent; border: none;",
            frameInitialHeight: 450,
          }
    })
    })
  };


  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 mb-4"> {/* Annual or Monthly option */}
        <button onClick={() => setIsAnnual(false)} className={`px-4 py-2 ${!isAnnual ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Monthly</button>
        <button onClick={() => setIsAnnual(true)} className={`px-4 py-2 ${isAnnual ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Annual</button>
      </div>
      <div className="flex justify-center space-x-4 mb-4"> {/*Inline or Overlay checkout option */}
        <button onClick={() => setIsInline(true)} className={`px-4 py-2 ${isInline ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Inline</button>
        <button onClick={() => setIsInline(false)} className={`px-4 py-2 ${!isInline ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Overlay</button>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setisOnePage(true)} className={`px-4 py-2 ${isOnePage && isInline ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>One Page Inline</button>
      </div>
      <div className="grid grid-cols-3 gap-4 text-black"> {/* Pricing cards */}
        {pricingData.map(plan => (
          <div key={plan.name} className="bg-gray-300 p-4 shadow rounded">
            <h2 className="text-lg font-bold">{plan.name}</h2>
            <ul className="mt-2 mb-4">
              {plan.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="text-lg font-bold">
              {isAnnual ? plan.priceAnnual : plan.priceMonthly}
            </div>
            <LocalizedPrice 
            key={isAnnual ? 'annual' : 'monthly'} // use key prop to force remounting
            priceID={isAnnual ? plan.annual_paddle_id : plan.monthly_paddle_id} 
            />
            {/* <LocalizedPrice priceID: {isAnnual ? plan.annual_paddle_id : plan.monthly_paddle_id} /> */}
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => openCheckout(isAnnual ? plan.annual_paddle_id : plan.monthly_paddle_id)
              }>Subscribe</button>
          </div>
        ))}
      </div>
      <div className='checkout-container'></div>
    </div>
  );
};

export default PricingCard;
