const express = require("express");
const router = express.Router();

const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require("../controllers/book.controller");
const { auth } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.post(
	"/",
	auth,
	authorizeRole(["seller", "admin"]),
	upload.fields([
		{ name: "cover_image", maxCount: 1 },
		{ name: "file_url", maxCount: 1 },
	]),
	createBook
);

router.get("/", getAllBooks);

router.get("/:bookId", getBookById);

router.put(
	"/:bookId",
	auth,
	authorizeRole(["seller", "admin"]),
	upload.fields([
		{ name: "cover_image", maxCount: 1 },
		{ name: "file_url", maxCount: 1 },
	]),
	updateBook
);

router.delete("/:bookId", auth, authorizeRole(["seller", "admin"]), deleteBook);

module.exports = router;