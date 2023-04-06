"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Books_1 = require("../controller/Books");
const router = express_1.default.Router();
router.route("/").get(Books_1.getAllBooks).post(Books_1.createBook);
router.route("/:id").put(Books_1.updateBook).get(Books_1.findById).delete(Books_1.deleteBook);
exports.default = router;
