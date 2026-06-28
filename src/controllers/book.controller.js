const {
    createBookService,
    getAllBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService,
} = require("../services/book.service");

const createBook = async (req, res) => {
    try {
        const newBook = await createBookService(req.body, req.files);

        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
            error: null,
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: null,
                error: error.errors,
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Duplicate key entry error. This book or unique sequence already exists.",
                data: null,
                error: error.keyValue,
            });
        }

        console.error("❌ createBook 500 Error:", error.name, "|", error.message, "\nStack:", error.stack);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const { books, total } = await getAllBooksService(page, limit);

        return res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: books,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            error: null,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};

const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await getBookByIdService(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: book,
            error: null,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updatedBook = await updateBookService(bookId, req.body, req.files);

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
            error: null,
        });

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
                data: null,
                error: error.errors,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;

        const deletedBook = await deleteBookService(bookId);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedBook,
            error: null,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};