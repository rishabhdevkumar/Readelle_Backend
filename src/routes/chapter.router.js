const express = require("express");
const router = express.Router();

const { addChapter, getChapterById, getChaptersByBook, updateChapter
} = require("../controllers/chapter.controller");

const { auth, authorizeRole } = require("../middlewares/auth.middleware");

router.post("/", auth, authorizeRole(["admin"]), addChapter);

router.get("/:chapterId", getChapterById);

router.get("/book/:bookId", getChaptersByBook);

router.put("/:chapterId", auth, authorizeRole(["admin"]), updateChapter);

module.exports = router;