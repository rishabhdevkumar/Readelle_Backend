const express = require("express");

const router = express.Router();

const {
    createBookmark,
    getAllBookmarks,
    getBookmarkByBook,
    deleteBookmark,
} = require("../controllers/bookmark.controller");

const {
    auth,
    authorizeRole,
} = require("../middlewares/auth.middleware");

router.post(
    "/",
    auth,
    authorizeRole(["user"]),
    createBookmark
);

router.get(
    "/",
    auth,
    authorizeRole(["user"]),
    getAllBookmarks
);

router.get(
    "/:bookId",
    auth,
    authorizeRole(["user"]),
    getBookmarkByBook
);

router.delete(
    "/:bookmarkId",
    auth,
    authorizeRole(["user"]),
    deleteBookmark
);

module.exports = router;