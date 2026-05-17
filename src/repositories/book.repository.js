const Book = require("../schemas/Book");

const createBookRepository = async (data) => {
    return await Book.create(data);
};

const getAllBooksRepository = async (page, limit) => {
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
        Book.find()
            .skip(skip)
            .limit(limit),

        Book.countDocuments(),
    ]);

    return { books, total };
};

const getBookByIdRepository = async (bookId) => {
    return await Book.findById(bookId)
        .populate("category_id");
};

const updateBookRepository = async (bookId, data) => {
    return await Book.findByIdAndUpdate(
        bookId,
        data,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

const deleteBookRepository = async (bookId) => {
    return await Book.findByIdAndDelete(bookId)
        .populate("category_id");
};

module.exports = {
    createBookRepository,
    getAllBooksRepository,
    getBookByIdRepository,
    updateBookRepository,
    deleteBookRepository,
};