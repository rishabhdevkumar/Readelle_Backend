const Book = require("../schemas/Book");

const createBookRepository = async (data) => {
    return await Book.create(data);
};

const getAllBooksRepository = async (page, limit) => {
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
        Book.find().skip(skip).limit(limit),
        Book.countDocuments(),
    ]);

    return { books, total };
};

module.exports = {
    createBookRepository,
    getAllBooksRepository,
};