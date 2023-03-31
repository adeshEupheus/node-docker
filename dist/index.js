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
const Books_1 = __importDefault(require("./models/Books"));
const uri = "mongodb://adesh:mypass@mongodb:27017/db?authSource=admin";
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("hi there!");
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(uri);
    console.log("Connected successfully to db");
    const data = yield Books_1.default.find();
    console.log(data);
    app.listen(PORT, () => {
        console.log(`listing on port ${PORT}`);
    });
});
main();
