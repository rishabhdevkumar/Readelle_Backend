const {
    createBookmarkService,
    getAllBookmarksService,
    getBookmarkByBookService,
    deleteBookmarkService,
} = require("../services/bookmark.service");

const createBookmark = async (req, res) => {

    try {

        const result =
            await createBookmarkService(
                req.user.id,
                req.body
            );

        return res.status(result.statusCode).json({
            success: true,
            message: result.message,
            data: result.data,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllBookmarks = async (req, res) => {

    try {

        const result =
            await getAllBookmarksService(
                req.user.id
            );

        return res.status(result.statusCode).json({
            success: true,
            message: result.message,
            data: result.data,
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getBookmarkByBook = async (req, res) => {

    try {

        const result =
            await getBookmarkByBookService(
                req.user.id,
                req.params.bookId
            );

        return res.status(result.statusCode).json({
            success: true,
            message: result.message,
            data: result.data,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteBookmark = async (req, res) => {

    try {

        const result =
            await deleteBookmarkService(
                req.params.bookmarkId
            );

        return res.status(result.statusCode).json({
            success: true,
            message: result.message,
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBookmark,
    getAllBookmarks,
    getBookmarkByBook,
    deleteBookmark,
};