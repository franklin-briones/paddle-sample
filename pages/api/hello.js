// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {v4 as uuidv4} from 'uuid';
import clientPromise from "../../lib/mongodb";


export default async (req, res) => {
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