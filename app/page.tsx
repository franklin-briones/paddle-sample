"use client"
import React, { useEffect, useState } from "react";
import PricingCard from './components/PricingCard';
import Navbar from "./components/Navbar";
import { Paddle, initializePaddle } from "@paddle/paddle-js";



const HomePage: React.FC = () =>  {

  const [paddle, setPaddle] = useState<Paddle>();

  // Download and initialize Paddle instance from CDN
  useEffect(() => {
    // Initialize Paddle Script
    initializePaddle({
      environment: "sandbox",
      token: `${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}`,
      eventCallback: (data) => {
        console.log(data);
      },
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);




  return (
    <div className=''>
      <Navbar />
      <PricingCard />
      
    </div>
  );
};

export default HomePage;
