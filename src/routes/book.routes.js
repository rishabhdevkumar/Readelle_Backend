const express = require("express");
const router = express.Router();

const { createBook, getAllBooks } = require("../controllers/book.controller");

router.post("/", createBook);

router.get("/", getAllBooks);

module.exports = router;