const {
    createBookRepository,
    getAllBooksRepository,
} = require("../repositories/book.repository");

const createBookService = async (data) => {
    try {
        const book = await createBookRepository(data);

        return {
            success: true,
            message: "Book created successfully",
            data: book,
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to create book",
            error: error.message,
        };
    }
};

const getAllBooksService = async () => {
    try {
        const books = await getAllBooksRepository();

        return {
            success: true,
            message: "Books fetched successfully",
            data: books,
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch books",
            error: error.message,
        };
    }
};

module.exports = {
    createBookService,
    getAllBooksService,
};