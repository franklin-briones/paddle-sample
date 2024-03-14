import Head from 'next/head'
import Image from 'next/image';
import { PaddleLoaderPB } from '@/components/PaddleLoadPB';

export default function Home() {



  return (
    <>
      <Head>
        <title>Billing Portal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-rows-2 gap-3 place-items-center p-30">
        <Image 
        width={1700}
        height={1700}
        src="/background.png"
        ></Image>
        <PaddleLoaderPB />
        <h1>Pay here</h1>
      </main>
    </>
  )
}
