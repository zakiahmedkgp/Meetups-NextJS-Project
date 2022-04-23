// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://zakiahmed8871:zaki@cluster0.12sc0.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data); // result is the returned ID
    console.log(result);

    client.close();

    res.status(201).json({ meesage: "meetup inserted" });
  }
}

export default handler;
