import express from "express";
import mongoose from "mongoose";
import BookRouter from "./router/Book";
import AuthRouter from "./router/Auth";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import cors from "cors";
import authMiddleware from "./middleware/Auth";
const uri = "mongodb://adesh:mypass@mongodb:27017/db?authSource=admin";

const redisClient = createClient({
  url: "redis://redis_db:6379",
});

const app = express();
app.use(express.json());
app.enable("trust proxy");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  session({
    name: "sess_id",
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 90000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("hi there!");
  console.log("yeah it ran");
});

app.use("/api_v1/books", authMiddleware, BookRouter);
app.use("/api_v1/user", AuthRouter);

const main = async () => {
  await mongoose.connect(uri);
  console.log("Connected Successfully to db");

  await redisClient
    .connect()
    .then(() => console.log("connected to rediss"))
    .catch((err) => console.log(err));
  console.log(PORT);

  app.listen(3000, () => {
    console.log(`listing on port 3000`);
  });
};

main();
