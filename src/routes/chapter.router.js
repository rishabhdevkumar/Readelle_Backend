const express = require("express");
const router = express.Router();

const { addChapter, getChapterById, getChaptersByBook
} = require("../controllers/chapter.controller");

const { auth, authorizeRole } = require("../middlewares/auth.middleware");

router.post("/", auth, authorizeRole(["admin"]), addChapter);

router.get("/:chapterId", getChapterById);

router.get("/book/:bookId", getChaptersByBook);

module.exports = router;