import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    const paddleSignature = request.headers.get("paddle-signature");
    if (!paddleSignature) {
        return NextResponse.json({ error: 'Missing paddle-signature header' }, { status: 400 });
    }

    const secretKey = process.env.PB_WEBHOOK_KEY;
    if (!secretKey) {
        console.error('PB_WEBHOOK_KEY is not set');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const requestBody = await request.json();

    if (validateWebhook(paddleSignature, secretKey, requestBody)) {
        try {
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection("pb-webhooks");
            await collection.insertOne(requestBody);

            console.log('WEBHOOK_VERIFIED');
            return NextResponse.json({ message: "Data inserted successfully!" }, { status: 200 });
        } catch (error) {
            console.error('Error inserting data:', error);
            return NextResponse.json({ error: "Error inserting data" }, { status: 500 });
        }
    } else {
        console.log('WEBHOOK_NOT_VERIFIED');
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 403 });
    }
}

function validateWebhook(paddleSignature: string, secretKey: string, reqBody: any): boolean {
    const parsedData = parseString(paddleSignature);
    const timestamp = parsedData.ts;
    const signature = parsedData.h1;

    const signedPayload = buildSignedPayload(timestamp, reqBody);
    const hmacValue = computeHMAC(secretKey, signedPayload);

    return crypto.timingSafeEqual(Buffer.from(hmacValue, 'hex'), Buffer.from(signature, 'hex'));
}

function parseString(inputString: string): { [key: string]: string } {
    const pairs = inputString.split(';');
    const result: { [key: string]: string } = {};
    pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        result[key] = value;
    });
    return result;
}

function buildSignedPayload(timestamp: string, body: any): string {
    return `${timestamp}:${JSON.stringify(body)}`;
}

function computeHMAC(secretKey: string, signedPayload: string): string {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(signedPayload);
    return hmac.digest('hex');
}