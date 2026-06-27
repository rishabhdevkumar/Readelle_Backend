const express = require("express");
const router = express.Router();

const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require("../controllers/book.controller");
const { auth } = require("../middlewares/auth.middleware");
const { authorizeRole } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const bookUploadFields = upload.fields([
	{ name: "cover_image", maxCount: 1 },
	{ name: "file_url", maxCount: 1 },
	{ name: "coverUrl", maxCount: 1 },
	{ name: "bookUrl", maxCount: 1 },
	{ name: "cover_url", maxCount: 1 },
	{ name: "fileUrl", maxCount: 1 },
	{ name: "book_url", maxCount: 1 },
]);

router.post(
	"/",
	auth,
	authorizeRole(["seller", "admin"]),
	bookUploadFields,
	createBook
);

router.get("/", getAllBooks);

router.get("/:bookId", getBookById);

router.put(
	"/:bookId",
	auth,
	authorizeRole(["seller", "admin"]),
	bookUploadFields,
	updateBook
);

router.delete("/:bookId", auth, authorizeRole(["seller", "admin"]), deleteBook);

module.exports = router;