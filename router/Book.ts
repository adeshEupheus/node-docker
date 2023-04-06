import express from "express";
import {
  createBook,
  deleteBook,
  findById,
  getAllBooks,
  updateBook,
} from "../controller/Books";

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").put(updateBook).get(findById).delete(deleteBook);

export default router;
