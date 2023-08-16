// Node.js & Express implementation
const crypto = require('crypto');
import { MongoClient } from 'mongodb';

// export default async (req, res) => {
//     console.log("req object", req.headers["paddle-signature"]

//     )
// }

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
    const paddleSignature = req.headers["paddle-signature"]
    const requestBody = req.body
    const secretKey = process.env.PB_WEBHOOK_KEY

    if (validateWebhook(paddleSignature, secretKey, requestBody)) {
        console.log('WEBHOOK_VERIFIED');

        const data = req.body;
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const yourCollection = db.collection("pb-webhooks");
        const result = await yourCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(200).json({ message: "Data inserted successfully!" });
    }

    else {
        res.sendStatus(403);
        console.log('WEBHOOK_NOT_VERIFIED')
    }
}

function validateWebhook(paddleSignature, secretKey, reqBody) {
    let verification;

    console.log('Paddle signature in validateWebhook', paddleSignature)
    const parsedData = parseString(paddleSignature);
    const timestamp = parsedData.ts;
    const signature = parsedData.h1;

    const signedP = buildSignedPayload(timestamp, reqBody)

    const hmacValue = computeHMAC(secretKey, signedP);
    if (hmacValue === signature) {
        console.log('signature verified')
        verification = true
    }
    else {
        console.log('signature not verified')
        verification = false
    }

    return verification

}


/**
 * Extract timestamp and signature from paddle signature header 
 * @param {string} inputString 
 * @returns {string[]}
 */
function parseString(inputString) {
    const pairs = inputString.split(';');
    const result = {};
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        result[key] = value;
    });
    return result;
}
/**
 * Returns a signed payload
 * @param {string} timestamp from parsed paddle signature
 * @param {object} body represents the entire webhook body
 * @returns {string} the concatenated timestamp, a colon, and the webhook request body
 */
function buildSignedPayload(timestamp, body) {
    const signedPayload = timestamp + ':' + JSON.stringify(body)
    return signedPayload
}

/**
 * Computers the digest, or HMAC value in hexadecimal format from the secret key and signed payload to compare to the returned signature. 
 * @param {string} secretKey The secret key retrieved from the paddle dashboard
 * @param {string} signedPayload The concatenated signedPayload
 * @returns 
 */
function computeHMAC(secretKey, signedPayload) {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(signedPayload);
    const hmacDigest = hmac.digest('hex');
    return hmacDigest;
}