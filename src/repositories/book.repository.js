const Book = require("../schemas/Book");

const createBookRepository = async (data) => {
    try {
        return await Book.create(data);
    } catch (error) {
        throw error;
    }
};

const getAllBooksRepository = async () => {
    try {
        return await Book.find();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createBookRepository,
    getAllBooksRepository,
};