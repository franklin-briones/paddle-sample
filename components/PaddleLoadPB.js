import Script from "next/script";

export function PaddleLoaderPB() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      onLoad={() => {
        if (process.env.NEXT_PB_PUBLIC_PADDLE_SANDBOX) {
          Paddle.Environment.set("sandbox");
        }
        Paddle.Setup({
          seller: 12277,
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
  );
}