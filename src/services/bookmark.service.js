const {
    createBookmarkRepository,
    findBookmarkRepository,
    findBookmarkByIdRepository,
    findBookmarkByBookRepository,
    findAllBookmarksRepository,
    deleteBookmarkRepository,
    findBookByIdRepository,
} = require("../repositories/bookmark.repository");

const {
    findChapterByIdRepository,
} = require("../repositories/chapter.repository");

const createBookmarkService = async (userId, data) => {

    const book = await findBookByIdRepository(data.book);

    if (!book) {
        throw new Error("Book not found");
    }

    const chapter = await findChapterByIdRepository(data.chapter);

    if (!chapter) {
        throw new Error("Chapter not found");
    }

    if (chapter.book !== data.book) {
        throw new Error("Chapter does not belong to this book");
    }

    const existingBookmark = await findBookmarkRepository(
        userId,
        data.book
    );

    if (existingBookmark) {

        existingBookmark.chapter = data.chapter;

        await existingBookmark.save();

        return {
            statusCode: 200,
            message: "Bookmark updated successfully",
            data: existingBookmark,
        };
    }

    const bookmark = await createBookmarkRepository({
        user: userId,
        book: data.book,
        chapter: data.chapter,
    });

    return {
        statusCode: 201,
        message: "Bookmark saved successfully",
        data: bookmark,
    };
};

const getAllBookmarksService = async (userId) => {

    const bookmarks = await findAllBookmarksRepository(userId);

    return {
        statusCode: 200,
        message: "Bookmarks fetched successfully",
        data: bookmarks,
    };
};

const getBookmarkByBookService = async (userId, bookId) => {

    const bookmark = await findBookmarkByBookRepository(
        userId,
        bookId
    );

    if (!bookmark) {
        throw new Error("Bookmark not found");
    }

    return {
        statusCode: 200,
        message: "Bookmark fetched successfully",
        data: {
            _id: bookmark._id,
            book: bookmark.book,
            chapter: bookmark.chapter?.id || null,
            chapter_title: bookmark.chapter?.chapter_title || null,
            chapter_number: bookmark.chapter?.chapter_number || null,
            created_at: bookmark.created_at,
        },
    };
};

const deleteBookmarkService = async (bookmarkId) => {

    const bookmark =
        await findBookmarkByIdRepository(bookmarkId);

    if (!bookmark) {
        throw new Error("Bookmark not found");
    }

    await deleteBookmarkRepository(bookmarkId);

    return {
        statusCode: 200,
        message: "Bookmark removed successfully",
    };
};

module.exports = {
    createBookmarkService,
    getAllBookmarksService,
    getBookmarkByBookService,
    deleteBookmarkService,
};