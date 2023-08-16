import Head from 'next/head'
import { PaddleLoaderPB } from '@/components/PaddleLoadPB';

export default function Home() {


  const openCheckout = () => {
    Paddle.Checkout.open({ product: 49368 });
  }

  return (
    <>
      <Head>
        <title>Overlay</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-rows-2 gap-3 place-items-center p-30">
        <PaddleLoaderPB />
        <h1 className="text-4xl pt-10">Welcome to my overlay checkout web store</h1>
        <a
          href='#'
          class='paddle_button'
          data-theme='none'
          data-items='[
            {
              "priceId": "pri_01h5r49agwnek287f18v33p8q0",
              "quantity": 1
            }
          ]'
        >Buy now using HTML Attributes!</a>
        <button className="flex justify-center text-3xl border border-yellow-300 p-10" onClick={() => {
          Paddle.Checkout.open({
            settings: {
              theme: "none",
            },
            items: [
              {
                priceId: 'pri_01h5r49agwnek287f18v33p8q0',
                quantity: 1
              }
            ]
          })
        }}>Buy now using Checkout.Open() method</button>
      </main>
    </>
  )
}