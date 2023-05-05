import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}

export default handler




export async function payLink(unitQuantity) {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    let discountPrice
    if (unitQuantity < 5) {
        return null;
      } else if (unitQuantity < 11) {
        discountPrice = "27.00"
      } else if (unitQuantity < 26) {
        discountPrice = "24.00"
      } else {
        discountPrice = "21.00"
      }

    let myInit = {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "RequestMode": "no-cors"
        },
        body: {
            "vendor_id" : process.env.VENDOR_ID,
            "vendor_auth_code" : process.env.VENDOR_AUTH_CODE,
            quantity: unitQuantity,
            "recurring_prices": [
                `USD: ${discountPrice}`
            ]
        }
      }
    
    const res = await fetch('https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link', myInit);
    return res.json().response.url
  }

  // const res = await fetch('https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link', {
  //   method: "POST",
  //   headers: {
  //       "Access-Control-Allow-Origin": "*"
  //   },
  //   body: {
  //       "vendor_id" : '11734',
  //       "vendor_auth_code" : "ca4ab23e9b04856ca1181e5eb2236d6bf71c93eb25829428af",
  //       quantity: 15,
  //       "recurring_prices": [
  //           `USD: 20.00`
  //       ]
  //   }
  // });
  // console.log(res.json())
  
  