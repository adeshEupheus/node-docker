"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controller/Auth");
const router = express_1.default.Router();
router.route("/signup").post(Auth_1.signUp);
router.route("/login").post(Auth_1.login);
exports.default = router;
