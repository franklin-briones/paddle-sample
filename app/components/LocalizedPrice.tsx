import { Paddle, initializePaddle } from "@paddle/paddle-js";
import { PricePreviewResponse } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

// Corrected definition of the LocalizedPrice component
interface LocalizedPriceProps {
    priceID: string; // Define the priceID prop as a string
  }
  
  function LocalizedPrice({ priceID }: LocalizedPriceProps){

  const [userIP, setUserIP] = useState("");
  const [localizedPrice, setLocalizedPrice] = useState<PricePreviewResponse | null>(null);
  // Create a local state to store Paddle instance
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    async function fetchUserIP() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    fetchUserIP();
  }, []);

  // Download and initialize Paddle instance from CDN
  useEffect(() => {
    // Initialize Paddle Script
    initializePaddle({
      environment: 'sandbox',
      token: `${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}`,
      eventCallback: (data) => { console.log(data) }
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  useEffect(() => {
    async function fetchLocalizedPrice() {
      try {
        if (!userIP) {
          return;
        }

        // Encode the IP address to avoid issues with passing dots in the URL
        const encodedIP = encodeURIComponent(userIP);
        
        var requestData = {
            items: [{
                quantity: 1,
                priceId: priceID,
              }
            ],
            customerIpAddress: encodedIP
            }   

          paddle?.PricePreview(requestData)
            .then((result) => {
              console.log(result);
              setLocalizedPrice(result)
            })
            .catch((error) => {
              console.error(error);
            });

      } catch (error) {
        console.log("error received from getLocalizedPrice API", error)
        console.error("Error fetching localized price:", error);
      }
    }

    fetchLocalizedPrice();
  }, [userIP]);
  

  return <>
    <div>Your IP Address: {userIP}</div>
    <div>Your price including approximate tax: {localizedPrice?.data.details.lineItems[0].formattedTotals.total}</div>
  </>;
}

export default LocalizedPrice;
