import express from "express";
import mongoose from "mongoose";
import Books from "./models/Books";

const uri = "mongodb://adesh:mypass@mongodb:27017/db?authSource=admin";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hi there!");
});

const main = async () => {
  await mongoose.connect(uri);
  console.log("Connected successfully to db");
  const data = await Books.find();

  console.log(data);

  app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
  });
};

main();
