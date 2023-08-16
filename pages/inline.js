import Head from 'next/head'
import Link from 'next/link'
import { payLink } from './api/paylink'
import { PaddleLoader } from '@/components/PaddleLoad'
import { Inter } from 'next/font/google'

export default function Home() {


  function updatePrices(data) {
    var currencyLabels = document.querySelectorAll(".currency");
    var subtotal = data.eventData.checkout.prices.customer.total - data.eventData.checkout.prices.customer.total_tax;

    for(var i = 0; i < currencyLabels.length; i++) {
      currencyLabels[i].innerHTML = data.eventData.checkout.prices.customer.currency + " ";
    }

    document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
    document.getElementById("tax").innerHTML = data.eventData.checkout.prices.customer.total_tax;
    document.getElementById("total").innerHTML = data.eventData.checkout.prices.customer.total;

    if (data.eventData.checkout.recurring_prices) {
      var recurringCurrency = data.eventData.checkout.recurring_prices.customer.currency;
      var recurringTotal = data.eventData.checkout.recurring_prices.customer.total;
      var intervalType = data.eventData.checkout.recurring_prices.interval.type;
      var intervalCount = data.eventData.checkout.recurring_prices.interval.length;

      if(intervalCount > 1) {
        var recurringString = '<div class="is-line-label">Then</div><div class="is-line-value">'+recurringCurrency+" "+recurringTotal+" / "+intervalCount+" "+intervalType+"s</div>";
      }
      else {
        var recurringString = '<div class="is-line-label">Then</div><div class="is-line-value">'+recurringCurrency+" "+recurringTotal+" / "+intervalType+"</div>";
      }

      document.getElementById("recurringPrice").innerHTML = recurringString;
    }
  }


  /**
   * Opens Paddle checkout inline in the page, passes pre-filled info to checkout if available. 
   */
  function openCheckout() {
    var formVals = document.getElementById('pre-checkout');
    const productId = 
    formVals.products.value === "1" ? 50246
        : formVals.products.value === "2" ? 49374
        : formVals.products.value === "3" ? 49376
        : 49705

    // Volume based pricing
    const unitquantity = Number(formVals.units.value)
    const load_checkout = async (unitquantity) => {
      if (productId === 49705) {

        try {
          // Make the request to your API route
          const response = await fetch('/api/paylink', myInit);
          const data = await response.json();
          console.log('API response:', data);
          // Handle the response and update the UI
          // ...
        } catch (error) {
          console.error('Error:', error);
          // Handle error and display an error message to the user
          // ...
        }
    


        return payLink(unitquantity)
      }
    }

    Paddle.Checkout.open({
      method: 'inline',
      override: load_checkout(unitquantity),
      product: productId,
      email: formVals.useremail.value,
      country: formVals.country.value,
      postcode: formVals.postalcode.value,
      successCallback: function checkoutComplete(data) {
        document.getElementById('event-data').innerHTML = JSON.stringify(data, null, 2)
        // Order data, downloads, receipts etc... available within 'data' variable
        console.log(data);
        console.log('calling successCallback')
        // document.getElementById("thankyou-container").innerHTML = `
        //     <h3>Thank you for the purchase</h3>
        //     <p>Your receipt URL is: <a href=${receiptLink}>${receiptLink}</a></p>
        //     <p>Your email used is: ${orderEmail}</p>
        //     <p>Your order ID is: ${orderId}</p>`
      },
      closeCallback: function checkoutClosed(data) {
        console.log(data);
        window.open("https://www.theonion.com", "_blank");
      },
      quantity: load_checkout(unitquantity) ? unitquantity : 1,
      disableLogout: true,
      frameTarget: 'checkout-container', // className of your checkout <div>
      frameInitialHeight: 450, // `450` or above
      frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;' // `min-width` must be set to `286px` or above with checkout padding off; `312px` with checkout padding on.
    });
  }

  return (
    <>
      <Head>
        <title>Inline</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex-col text-center">
        <PaddleLoader updateFn={ updatePrices }/>
        <Link href="/" className=' text-2xl'>Go back Home</Link>
        <h1 className=' text-xl'>Welcome to my inline checkout web store</h1>
        <h2 >Please reload to see prices update below</h2>
        <br />


        <p>Grab your copy of FDB Software download 1 for just <span className="paddle-gross" data-product="50246">$0</span>!</p>
        <p>Grab your copy of FDB Software download 2 for just <span className="paddle-gross" data-product="49374">$0</span>!</p>
        <p>Grab your copy of FDB Software download 3 for just <span className="paddle-gross" data-product="49376">$0</span>!</p>
        <p>Grab some FDB Software download 4 for just <span className="paddle-gross" data-product="49705">$0</span> each!</p>
        <br />

        <div>Subtotal: <span class="currency">US$</span><span id="subtotal">0.00</span></div>
        <div>Tax: <span class="currency">US$</span><span id="tax">0.00</span></div>
        <div>Total: <span class="currency">US$</span><span id="total">0.00</span></div>
        <div id="recurringPrice"></div>

        <div className='thankyou-container'></div>
        <form id="pre-checkout" className=' m-8'>
          <select id="products" name="products">
            <option value="1">Download 1</option>
            <option value="2">Download 2</option>
            <option value="3">Download 3</option>
            <option value="4">Download 4</option>
          </select>
          <input className=' m-8' id="useremail" type="text" placeholder="Email address" />
          <input className=' m-8' id="country" type="text" placeholder="US or GB" />
          <input className=' m-8' id="postalcode" type="text" placeholder="78702" />
          <input className=' m-8' type="number" id="units" placeholder="Quantity" />
        </form>
        <div id='checkout-container' className='checkout-container'></div>


        <button className=" border-red-600 border-4 m-4 p-4" onClick={openCheckout}>Buy My Product</button>
        <pre className=" text-left" height="100px" id='event-data'>This is where event-data will populate when a successful checkout occurs.</pre>
      </main>
    </>
  )
}
