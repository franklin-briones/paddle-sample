

export default async function payLink(req, res) {
  try {

    const { inputData } = req.body; 

    // Make the backend API call here and retrieve the response
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
        "vendor_id": process.env.VENDOR_ID,
        "vendor_auth_code": process.env.VENDOR_AUTH_CODE,
        "product_id": 49705,
        "quantity": unitQuantity,
        "recurring_prices": [
          `USD: ${discountPrice}`
        ]
      }
    }


    const response = await fetch('https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link',);
    const data = await response.json();

    // Send the response back to the client
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}