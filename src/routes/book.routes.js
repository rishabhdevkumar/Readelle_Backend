const express = require("express");
const router = express.Router();

const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require("../controllers/book.controller");
const { auth } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/auth.middleware");

router.post("/", auth, authorizeRole("seller", "admin"), createBook);

router.get("/", getAllBooks);

router.get("/:bookId", getBookById);

router.put("/:bookId", auth, authorizeRole("seller", "admin"), updateBook);

router.delete("/:bookId", auth, authorizeRole("seller", "admin"), deleteBook);

module.exports = router;