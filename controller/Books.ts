import { RequestHandler } from "express";
import Books from "../models/Books";

export const getAllBooks: RequestHandler = async (req, res) => {
  try {
    const allBooks = await Books.find();
    res.status(200).json({
      status: "success",
      length: allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const createBook: RequestHandler = async (req, res) => {
  try {
    const newBook = await Books.create(req.body);
    res.status(200).json({
      status: "success",
      data: newBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const updateBook: RequestHandler = async (req, res) => {
  try {
    const newBook = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: newBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const findById: RequestHandler = async (req, res) => {
  try {
    const newBook = await Books.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: newBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const deleteBook: RequestHandler = async (req, res) => {
  try {
    const newBook = await Books.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: "success",
      data: newBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};
