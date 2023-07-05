"use client";
import Script from "next/script";

export function PaddleLoaderPB() {
  return (
    <Script
      strategy="beforeInteractive"
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      onLoad={() => {
        Paddle.Environment.set("sandbox");
        Paddle.Setup({
          seller: 12277,
        });
        
      }}
    />
  );
}