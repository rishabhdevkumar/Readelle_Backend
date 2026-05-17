const { createCategoryRepository, getAllCategoriesRepository, updateCategoryRepository, deleteCategoryRepository,
    checkBooksExistRepository } = require("../repositories/category.repository");

const createCategoryService = async (data) => {
    return await createCategoryRepository(data);
};

const getAllCategoriesService = async () => {
    return await getAllCategoriesRepository();
};

const updateCategoryService = async (id, data) => {
    return await updateCategoryRepository(id, data);
};

const deleteCategoryService = async (categoryId) => {

    const existingBook = await checkBooksExistRepository(categoryId);
    if (existingBook) {
        throw new Error(
            "Category cannot be deleted because books exist in this category"
        );
    }

    return await deleteCategoryRepository(categoryId);
};

module.exports = {
    createCategoryService,
    getAllCategoriesService,
    updateCategoryService,
    deleteCategoryService,
};