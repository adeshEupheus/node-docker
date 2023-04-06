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
exports.deleteBook = exports.findById = exports.updateBook = exports.createBook = exports.getAllBooks = void 0;
const Books_1 = __importDefault(require("../models/Books"));
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBooks = yield Books_1.default.find();
        res.status(200).json({
            status: "success",
            length: allBooks.length,
            data: allBooks,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
});
exports.getAllBooks = getAllBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield Books_1.default.create(req.body);
        res.status(200).json({
            status: "success",
            data: newBook,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield Books_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            status: "success",
            data: newBook,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
});
exports.updateBook = updateBook;
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield Books_1.default.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: newBook,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
});
exports.findById = findById;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield Books_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({
            status: "success",
            data: newBook,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
        });
    }
});
exports.deleteBook = deleteBook;
