"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Book_1 = __importDefault(require("./router/Book"));
const Auth_1 = __importDefault(require("./router/Auth"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const cors_1 = __importDefault(require("cors"));
const Auth_2 = __importDefault(require("./middleware/Auth"));
const uri = "mongodb://adesh:mypass@mongodb:27017/db?authSource=admin";
const redisClient = (0, redis_1.createClient)({
    url: "redis://redis_db:6379",
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.enable("trust proxy");
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use((0, express_session_1.default)({
    name: "sess_id",
    store: new connect_redis_1.default({ client: redisClient }),
    secret: "secret",
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 90000,
    },
    resave: false,
    saveUninitialized: false,
}));
const PORT = process.env.PORT || 3000;
app.get("/api", (req, res) => {
    res.send("hi there!");
    console.log("yeah it ran");
});
app.use("/api_v1/books", Auth_2.default, Book_1.default);
app.use("/api_v1/user", Auth_1.default);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(uri);
    console.log("Connected Successfully to db");
    yield redisClient
        .connect()
        .then(() => console.log("connected to rediss"))
        .catch((err) => console.log(err));
    console.log(PORT);
    app.listen(3000, () => {
        console.log(`listing on port 3000`);
    });
});
main();
