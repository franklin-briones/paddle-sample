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

