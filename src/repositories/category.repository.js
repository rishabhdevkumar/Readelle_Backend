const Category = require("../schemas/Category");
const Book = require("../schemas/Book");

const createCategoryRepository = async (data) => {
    return await Category.create(data);
};

const getAllCategoriesRepository = async () => {
    return await Category.find();
};

const updateCategoryRepository = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });
};

const deleteCategoryRepository = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};

const checkBooksExistRepository = async (categoryId) => {
    return await Book.findOne({
        category_id: categoryId,
    });
};


module.exports = {
    createCategoryRepository,
    getAllCategoriesRepository,
    updateCategoryRepository,
    deleteCategoryRepository,
    checkBooksExistRepository,
};