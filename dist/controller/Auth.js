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
exports.login = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const hashPassword = bcryptjs_1.default.hashSync(password, 12);
        const newUser = yield User_1.default.create({
            email,
            password: hashPassword,
        });
        req.session.user = newUser;
        res.status(201).json({
            status: "success",
            data: newUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "user does not exist",
            });
        }
        const isCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isCorrect) {
            return res.status(201).json({
                status: "failed",
                message: "wrong email or password",
            });
        }
        req.session.user = user;
        return res.status(201).json({
            status: "success",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
});
exports.login = login;
