import '@/styles/globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';



export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <SessionProvider session={session}> */}
        {/* Global Script for PaddleJS */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="beforeInteractive"

          onLoad={() => {
            if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
              Paddle.Environment.set("sandbox");
            }

            Paddle.Initialize({
              token: process.env.PB_CLIENT_TOKEN, // replace with a client-side token
              eventCallback: function (data) {
                console.log(data)
              }
            });
          }}
        />
        <Component {...pageProps} />
        <Analytics />
      {/* </SessionProvider> */}

    </>
  )
}
