const {
    addChapterService,
    getChapterByIdService,
    getChaptersByBookService,
} = require("../services/chapter.service");

const addChapter = async (req, res) => {

    try {

        const result = await addChapterService(req.body);

        return res.status(201).json({
            success: true,
            message: "Chapter added successfully",
            data: result,
            error: {},
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
            data: {},
            error: error,
        });
    }
};

const getChapterById = async (req, res) => {

    try {

        const result = await getChapterByIdService(
            req.params.chapterId
        );

        return res.status(200).json({
            success: true,
            message: "Chapter fetched successfully",
            data: result,
            error: {},
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
            data: {},
            error: error,
        });
    }
};

const getChaptersByBook = async (req, res) => {

    try {

        const result = await getChaptersByBookService(
            req.params.bookId
        );

        return res.status(200).json({
            success: true,
            message: "Book chapters fetched successfully",
            data: result,
            error: {},
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message,
            data: {},
            error: error,
        });
    }
};

module.exports = {
    addChapter,
    getChapterById,
    getChaptersByBook,
};