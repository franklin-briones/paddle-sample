// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {v4 as uuidv4} from 'uuid';
import clientPromise from "../../lib/mongodb";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
  try {
      res.status(200).end(`${uuidv4()}`)
  } catch (e) {
      console.error(e);
  }
}