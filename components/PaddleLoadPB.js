"use client";
import Script from "next/script";


export function PaddleLoaderPB() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      onLoad={() => {
        if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
          Paddle.Environment.set("sandbox");
        }
        
        Paddle.Setup({
          token: 'test_63e9b28fe5fa199ee98d51d3e54',
          eventCallback: function(data) {
            console.log(data)
          }
        })
        
      }}
    />
  );
}


/*export function PaddleLoaderUpdate() {
    return (
        <Script 
        src="https://cdn.paddle.com/paddle/paddle.js"
        onLoad={() => {
            if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
              Paddle.Environment.set("sandbox");
            }
            Paddle.Setup({
              vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
              completeDetails: true,
              eventCallback: function(data) {
                if (data.event === 'Checkout.PaymentComplete') {
                  // Check to ensure the payment has not been flagged for manual fraud review
                  if (!data.eventData.flagged) {
                    var checkoutId = data.eventData.checkout.id;
                    Paddle.Order.details(checkoutId, function(data) {
                      if (!!data) {
                        // Order data, downloads, receipts etc... available within 'data' variable
                        console.log(data);
                        return data;
                        updatePrices
                      } else {
                        // Order processing delay - order details cannot be retrieved at the moment
                        console.log('Order is being processed')
                      }
                    });
                  } else {
                    // Payment has not been fully processed at the moment, so order details cannot be retrieved
                    console.log('Transaction pending review');
                  }
                }
              }
            });
          }}
        />
    )
    Paddle.Environment.set('sandbox');
    Paddle.Setup({
        vendor: 11734, // replace with your vendor ID
        eventCallback: function (eventData) {
            updatePrices(eventData);
        },
        eventCallback: function (data) {
            if (data.event === 'Checkout.PaymentComplete') {
                // Check to ensure the payment has not been flagged for manual fraud review
                if (!data.eventData.flagged) {
                    var checkoutId = data.eventData.checkout.id;
                    Paddle.Order.details(checkoutId, function (data) {
                        if (!!data) {
                            // Order data, downloads, receipts etc... available within 'data' variable
                            console.log(data);
                            var receiptLink = data.order.receipt_url
                            var orderEmail = data.order.customer.email
                            var orderId = data.order.order_id
                            document.getElementById("thankyou-container").innerHTML = `
                        <h3>Thank you for the purchase</h3>
                        <p>Your receipt URL is: <a href=${receiptLink}>${receiptLink}</a></p>
                        <p>Your email used is: ${orderEmail}</p>
                        <p>Your order ID is: ${orderId}</p>`
                        } else {
                            // Order processing delay - order details cannot be retrieved at the moment
                            console.log('Order is being processed')
                        }
                    });
                } else {
                    // Payment has not been fully processed at the moment, so order details cannot be retrieved
                    console.log('Transaction pending review');
                }
            }
        }
    });
}
*/