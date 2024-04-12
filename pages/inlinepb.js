import Head from 'next/head'
import { PaddleLoaderPB } from '@/components/PaddleLoadPB';

export default function Home() {


  return (
    <>
      <Head>
        <title>Inline</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-rows-2 gap-3 place-items-center p-30 color bg-slate-300	">
        <PaddleLoaderPB />
        <h1 className="text-4xl pt-10">Welcome to my inline checkout web store</h1>
        <div className='grid grid-cols-2 gap-2'>
          <div className='buttons'>
            <button className="flex justify-center text-3xl border border-red-300 p-10" onClick={() => {
              let request = {
                items: [{
                  quantity: 1,
                  priceId: 'pri_01hf7es7z2jez9834v9ehjhaqv',
                }
                ],
                address: {
                  countryCode: 'KR'
                }
              }
              Paddle.PricePreview(request)
                .then((result) => {
                  console.log(result);
                })
                .catch((error) => {
                  console.error(error);
                });

            }}>console log price</button>
            <button className="flex justify-center text-3xl border border-yellow-300 p-10" onClick={() => {
              Paddle.Checkout.open({
                settings: {
                  displayMode: "inline",
                  theme: "dark",
                  locale: "en",
                  frameTarget: "checkout-container",
                  frameInitialHeight: "450",
                  frameStyle: "width: 100%; min-width: 312px; background-color: transparent; border: none;"

                },
                items: [
                  {
                    priceId: 'pri_01hf7es7z2jez9834v9ehjhaqv',
                    quantity: 1
                  }
                ]
              })
            }}>Buy now using Checkout.Open() method</button>
          </div>
          <div id='checkout-container' className='checkout-container'></div>

        </div>

      </main>
    </>
  )
}
