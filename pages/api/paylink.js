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
            "RequestMode": "no-cors",
            "Content-Type": "application/json"
        },
        body: {
            "vendor_id" : process.env.VENDOR_ID,
            "vendor_auth_code" : process.env.VENDOR_AUTH_CODE,
            "product_id": 49705,
            "quantity": unitQuantity,
            "recurring_prices": [
                `USD: ${discountPrice}`
            ]
        }
      }
    
    const res = await fetch('https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link', myInit);
    return res.json().response.url
  }