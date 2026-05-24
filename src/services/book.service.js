const {
    createBookRepository,
    getAllBooksRepository,
    getBookByIdRepository,
    updateBookRepository,
    deleteBookRepository,
    findBookByIdRepository
} = require("../repositories/book.repository");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const deleteFromCloudinary = require("../utils/deleteFromCloudinary");

const resolveBookMedia = async (data = {}, files = {}) => {
    const resolvedData = { ...data };

    if (files.cover_image?.[0]) {
        const uploadedCover = await uploadToCloudinary(files.cover_image[0], "books/covers", "image");
        resolvedData.cover_image = uploadedCover.secure_url;
        resolvedData.cover_image_public_id = uploadedCover.public_id;
    }

    if (files.file_url?.[0]) {
        const uploadedFile = await uploadToCloudinary(files.file_url[0], "books/files", "raw");
        resolvedData.file_url = uploadedFile.secure_url;
        resolvedData.file_public_id = uploadedFile.public_id;
    }

    return resolvedData;
};

const removeBookAssets = async (book) => {
    const deletions = [];

    if (book?.cover_image_public_id) {
        deletions.push(deleteFromCloudinary(book.cover_image_public_id, "image"));
    }

    if (book?.file_public_id) {
        deletions.push(deleteFromCloudinary(book.file_public_id, "raw"));
    }

    if (deletions.length > 0) {
        await Promise.allSettled(deletions);
    }
};

const createBookService = async (data, files) => {
    const resolvedData = await resolveBookMedia(data, files);
    return await createBookRepository(resolvedData);
};

const getAllBooksService = async (page, limit) => {
    return await getAllBooksRepository(page, limit);
};

const getBookByIdService = async (bookId) => {
    return await getBookByIdRepository(bookId);
};

const updateBookService = async (bookId, data, files) => {
    const existingBook = await getBookByIdRepository(bookId);

    if (!existingBook) {
        return null;
    }

    const resolvedData = await resolveBookMedia(data, files);
    const updatedBook = await updateBookRepository(bookId, resolvedData);

    const oldAssetsToDelete = [];

    if (files?.cover_image?.[0] && existingBook.cover_image_public_id) {
        oldAssetsToDelete.push(deleteFromCloudinary(existingBook.cover_image_public_id, "image"));
    }

    if (files?.file_url?.[0] && existingBook.file_public_id) {
        oldAssetsToDelete.push(deleteFromCloudinary(existingBook.file_public_id, "raw"));
    }

    if (oldAssetsToDelete.length > 0) {
        await Promise.allSettled(oldAssetsToDelete);
    }

    return updatedBook;
};

const deleteBookService = async (bookId) => {
    const book = await getBookByIdRepository(bookId);

    if (!book) {
        return null;
    }

    await removeBookAssets(book);

    return await deleteBookRepository(bookId);
};

module.exports = {
    createBookService,
    getAllBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService,
};