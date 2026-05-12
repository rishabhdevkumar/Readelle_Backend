const {
    createBookRepository,
    getAllBooksRepository,
} = require("../repositories/book.repository");

const createBookService = async (data) => {
    return await createBookRepository(data);
};

const getAllBooksService = async (page, limit) => {
    return await getAllBooksRepository(page, limit);
};

module.exports = {
    createBookService,
    getAllBooksService,
};