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
          seller: 11227,
          eventCallback: function(data) {
            console.log(data)
          }
        })
        
      }}
    />
  );
}