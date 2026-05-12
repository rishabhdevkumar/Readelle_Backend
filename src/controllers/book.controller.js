const {
    createBookService,
    getAllBooksService,
} = require("../services/book.service");

const createBook = async (req, res) => {
    try {
        const newBook = await createBookService(req.body);

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
                message: "A book with this title already exists",
                data: null,
                error: error.keyValue,
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

module.exports = {
    createBook,
    getAllBooks,
};