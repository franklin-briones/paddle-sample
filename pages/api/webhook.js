// Node.js & Express implementation
const crypto = require('crypto');
const Serialize = require('php-serialize');
const bodyParser = require("body-parser");
import {v4 as uuidv4} from 'uuid';
import { MongoClient } from 'mongodb';


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

}

// Public key from your paddle dashboard
const pubKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmskuFtOptebXb/Dn0MAF
WTvgbg4pA1P8QTF2aOAFIVfNcyi9itBp0Dtq6KT/6ft8Blub17u9YgkmWQRuanDu
3OqzLfi1sLVZnhGXZ22Mbfava3eCsBnknEKKz5Qq7f45BFiP5NTwj4BuLGmITTFf
t1qTBGOZssOdlVc3S13juwHTV7DjYETcZGhpLLQ0rPeDOYk3Iw4efq87RXAssd5R
8/sPmGxxynZUu31zCdysXiF3Zj5+hJM9g/ghnyoSJrBwWzIzXz3wVErLTtmIXkk7
XPQL1GydvcUisGYi6c3qu6/SYp57C91jXroS2FjBEP4Z+xu+RwcntQQEcSzXK2km
fNzNpmCPNZUtIVZ4X8krtCe8xCaQ6J7xvw8zizd5A4/Lu8asP5C83E7ykwLnFq1G
Ewu0Ldy0pHkSrKdwuIdAxo5j77pMxExzemGUARtSx+xldHuB8Z4bJRntxBA8Mqgy
Nz7ilIgMuUgJGq/2llBiakTNqKx7b3K5QsI/rbZQvWOhCZjd+6GrIzPHzm9Mne78
xrvoEB9Ng3bZcghCZ8l5OSMHkXQGLX+7Jp01Vnp+S9cJ8ovlRdp12PdCF9N68SZT
7XYo16EwOHiDafjn6qyvrt3eSBvRiADMd8U4AEnV4QK5kxuT4/FoK6nf6FpNbQLK
AcmLH1pb3WiMgzGRrjFfLbMCAwEAAQ==
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