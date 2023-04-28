// Node.js & Express implementation
const crypto = require('crypto');
const Serialize = require('php-serialize');
const bodyParser = require("body-parser");
import {v4 as uuidv4} from 'uuid';
import { MongoClient } from 'mongodb';

// Parses urlencoded webhooks from paddle to JSON with keys sorted alphabetically ascending and values as strings
app.use(bodyParser.urlencoded({ extended: true }));

// Webhook request handling
app.post("/", (req, res) => {
  if (validateWebhook(req.body)) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).end();
  } else {
    res.sendStatus(403);
    console.log('WEBHOOK_NOT_VERIFIED')
  }
})

export default async (req, res) => {

    if (validateWebhook(req.body)) {
        console.log('WEBHOOK_VERIFIED');

        const data = req.body;
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const yourCollection = db.collection("paddle-webhook");
        const result = await yourCollection.insertOne(data);
        console.log(result);
        client.close();  
        res.status(200).json({ message: "Data inserted successfully!" });
        }

        else {
        res.sendStatus(403);
        console.log('WEBHOOK_NOT_VERIFIED')
        }


    try {
        const client = await clientPromise;
        const db = client.db("paddle-webhook");
  
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
  
        // res.json(movies);
        res.status(200).end(`${uuidv4()}`)
    } catch (e) {
        console.error(e);
    }
}


app.listen( 8080, () => console.log( 'Node.js server started on port 8080.' ) );

// Public key from your paddle dashboard
const pubKey = `-----BEGIN PUBLIC KEY-----

-----END PUBLIC KEY-----`

function ksort(obj){
    const keys = Object.keys(obj).sort();
    let sortedObj = {};
    for (let i in keys) {
      sortedObj[keys[i]] = obj[keys[i]];
    }
    return sortedObj;
}

function validateWebhook(jsonObj) {
    // Grab p_signature
    const mySig = Buffer.from(jsonObj.p_signature, 'base64');
    // Remove p_signature from object - not included in array of fields used in verification.
    delete jsonObj.p_signature;
    // Need to sort array by key in ascending order
    jsonObj = ksort(jsonObj);
    for (let property in jsonObj) {
        if (jsonObj.hasOwnProperty(property) && (typeof jsonObj[property]) !== "string") {
            if (Array.isArray(jsonObj[property])) { // is it an array
                jsonObj[property] = jsonObj[property].toString();
            } else { //if its not an array and not a string, then it is a JSON obj
                jsonObj[property] = JSON.stringify(jsonObj[property]);
            }
        }
    }
    // Serialise remaining fields of jsonObj
    const serialized = Serialize.serialize(jsonObj);
    // verify the serialized array against the signature using SHA1 with your public key.
    const verifier = crypto.createVerify('sha1');
    verifier.update(serialized);
    verifier.end();

    const verification = verifier.verify(pubKey, mySig);
    // Used in response if statement
    return verification;
}

///////////////////////////

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



// export default function handler(req, res) {


//   // res.
//   res.status(200).end(`${uuidv4()}`)
// }

// export default async (req, res) => {
//   try {
//       const client = await clientPromise;
//       const db = client.db("paddle-webhook");

//       const movies = await db
//           .collection("movies")
//           .find({})
//           .sort({ metacritic: -1 })
//           .limit(10)
//           .toArray();

//       // res.json(movies);
//       res.status(200).end(`${uuidv4()}`)
//   } catch (e) {
//       console.error(e);
//   }
// }