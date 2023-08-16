import Head from 'next/head'
import Link from 'next/link'
import { PaddleLoader } from '@/components/PaddleLoad'
import { Inter } from 'next/font/google'
import { PaddleLoaderPB } from '@/components/PaddleLoadPB'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const openCheckout = () => {
    Paddle.Checkout.open({ product: 49368 });
  }

  const updateOverlaySubscription = () => {
    Paddle.Checkout.open({
      override: 'https://sandbox-subscription-management.paddle.com/subscription/462194/hash/411ab5a7f91a549b3de2e5922c4d50524ea5d6a061aeedc48debebe700cda421/manage-subscription',
      method: 'overlay',
      // frameTarget: 'checkout-container', // The className of your checkout <div>
      // frameInitialHeight: 416,
      // frameStyle: 'background-color: transparent; border: none;'    // Please ensure the minimum width is kept at or above 312px.
    })
  }

  const updateInlineSubscription = () => {
    Paddle.Checkout.open({
      override: 'https://sandbox-subscription-management.paddle.com/subscription/462194/hash/411ab5a7f91a549b3de2e5922c4d50524ea5d6a061aeedc48debebe700cda421/manage-subscription',
      method: 'inline',
      frameTarget: 'checkout-container', // The className of your checkout <div>
      frameInitialHeight: 416,
      frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;'    // Please ensure the minimum width is kept at or above 312px.

    })
  }

  return (
    <>
      <Head>
        <title>Franklin Briones LLC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <PaddleLoader />
        <PaddleLoaderPB />

        <h1 className="flex justify-center p-5 text-gray-200 text-7xl">Welcome to my web store</h1>
        <div className="grid grid-cols-2 gap-3 place-items-center p-30">
          <Link href="/overlay" className="flex justify-center text-3xl border border-yellow-300 p-10">See Overlay Checkout</Link>
          <Link href="/inline" className="flex justify-center text-3xl border border-yellow-300 p-10">See Inline Checkout</Link>
          <Link href="/overlaypb" className="flex justify-center text-3xl border border-blue-300 p-10">See Overlay Checkout in PB</Link>
          <Link href="/inlinepb" className="flex justify-center text-3xl border border-blue-300 p-10">See Inline Checkout in PB</Link>
          <div onClick={updateInlineSubscription} className="flex justify-center border border-green-300 text-3xl p-10">Update Subscription Inline</div>
          <div onClick={updateOverlaySubscription} className="flex justify-center border border-green-300 text-3xl p-10">Update Subscription Overlay</div>
          <Link className="flex justify-center border border-green-300 text-3xl p-10" href="/pay">Pay Here</Link>
        </div>
        <div className="checkout-container"></div>


      </main>
    </>
  )
}
