// "use client";
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		const Paddle = window.Paddle;
		Paddle.Environment.set("sandbox");
		Paddle.Setup({
			seller: 10574,
		});
		// Paddle.Checkout.open({
		// 	transactionId: "txn_01h0f9t51zvznjr3k84g2zch5z",
		// });
	});

	function openCheckout() {
		Paddle.Checkout.open({
			transactionId: "txn_01h0f9t51zvznjr3k84g2zch5z",
		});
	}

	return (
		<>
			<Script
				strategy="beforeInteractive"
				src="https://cdn.paddle.com/paddle/v2/paddle.js"
			/>
			<div>
				<div>test</div>
				<button onClick={openCheckout}>TEst</button>
			</div>
		</>
	);
}