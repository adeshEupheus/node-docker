import express from "express";
import { MongoClient } from "mongodb";

const uri = "mongodb://adesh:mypass@mongodb:27017/?authSource=admin";
const client = new MongoClient(uri);

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hi there!");
});

const main = async () => {
  await client.connect();
  console.log("Connected successfully to db");
  const db = client.db("db");
  const books = db.collection("books");

  const data = await books.find({}).toArray();
  console.log(data);

  app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
  });
};

main();
