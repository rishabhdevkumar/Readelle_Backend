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

    const coverFile = files?.cover_image?.[0] || files?.coverUrl?.[0] || files?.cover_url?.[0];
    if (coverFile) {
        const uploadedCover = await uploadToCloudinary(coverFile, "books/covers", "image");
        resolvedData.cover_image = uploadedCover.secure_url;
        resolvedData.cover_image_public_id = uploadedCover.public_id;
    } else if (data.coverUrl || data.cover_url) {
        resolvedData.cover_image = data.coverUrl || data.cover_url;
    }

    const bookFile = files?.file_url?.[0] || files?.bookUrl?.[0] || files?.fileUrl?.[0] || files?.book_url?.[0];
    if (bookFile) {
        const uploadedFile = await uploadToCloudinary(bookFile, "books/files", "raw");
        resolvedData.file_url = uploadedFile.secure_url;
        resolvedData.file_public_id = uploadedFile.public_id;
    } else if (data.bookUrl || data.book_url || data.fileUrl) {
        resolvedData.file_url = data.bookUrl || data.book_url || data.fileUrl;
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

    const hasNewCover = files?.cover_image?.[0] || files?.coverUrl?.[0] || files?.cover_url?.[0];
    if (hasNewCover && existingBook.cover_image_public_id) {
        oldAssetsToDelete.push(deleteFromCloudinary(existingBook.cover_image_public_id, "image"));
    }

    const hasNewFile = files?.file_url?.[0] || files?.bookUrl?.[0] || files?.fileUrl?.[0] || files?.book_url?.[0];
    if (hasNewFile && existingBook.file_public_id) {
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