import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import clientPromise from '@/lib/mongodb'; // Adjust this import path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const paddleSignature: string = req.headers["paddle-signature"] as string;
    const requestBody: any = req.body;
    const secretKey: string = process.env.PB_WEBHOOK_KEY as string;

    if (validateWebhook(paddleSignature, secretKey, requestBody)) {
        try {
            const client = await clientPromise;
            const db = client.db();
            const yourCollection = db.collection("pb-webhooks");
            const result = await yourCollection.insertOne(requestBody);
            console.log(result);
            res.status(200).json({ message: "Data inserted successfully!" });
            console.log('WEBHOOK_VERIFIED');
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: "Error inserting data" });
        }
    } else {
        res.status(403).json({ message: "Invalid webhook signature" });
        console.log('WEBHOOK_NOT_VERIFIED');
    }
}

function validateWebhook(paddleSignature: string, secretKey: string, reqBody: any): boolean {
    const parsedData: { [key: string]: string } = parseString(paddleSignature);
    const timestamp: string = parsedData.ts;
    const signature: string = parsedData.h1;

    const signedPayload: string = buildSignedPayload(timestamp, reqBody);
    const hmacValue: string = computeHMAC(secretKey, signedPayload);

    return crypto.timingSafeEqual(Buffer.from(hmacValue, 'hex'), Buffer.from(signature, 'hex'));
}

function parseString(inputString: string): { [key: string]: string } {
    const pairs: string[] = inputString.split(';');
    const result: { [key: string]: string } = {};
    pairs.forEach((pair: string) => {
        const [key, value] = pair.split('=');
        result[key] = value;
    });
    return result;
}

function buildSignedPayload(timestamp: string, body: any): string {
    return `${timestamp}:${JSON.stringify(body)}`;
}

function computeHMAC(secretKey: string, signedPayload: string): string {
    const hmac: crypto.Hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(signedPayload);
    return hmac.digest('hex');
}