const {
    addChapterRepository,
    findChapterByIdRepository,
    getChaptersByBookRepository,
    updateChapterRepository
} = require("../repositories/chapter.repository");

const {
    findBookByIdRepository,
} = require("../repositories/book.repository");

const addChapterService = async (data) => {

    const book = await findBookByIdRepository(data.book);

    if (!book) {
        throw new Error("Book not found");
    }

    const chapter = await addChapterRepository(data);

    return chapter;
};

const getChapterByIdService = async (chapterId) => {

    const chapter = await findChapterByIdRepository(
        chapterId
    );

    if (!chapter) {
        throw new Error("Chapter not found");
    }

    return chapter;
};

const getChaptersByBookService = async (bookId) => {

    const chapters = await getChaptersByBookRepository(
        bookId
    );

    if (!chapters || chapters.length === 0) {
        throw new Error(
            "No chapters available in this book yet"
        );
    }

    return chapters;
};

const updateChapterService = async (
    chapterId,
    data
) => {

    const chapter = await findChapterByIdRepository(
        chapterId
    );

    if (!chapter) {
        throw new Error("Chapter not found");
    }

    return await updateChapterRepository(
        chapterId,
        data
    );
};

module.exports = {
    addChapterService,
    getChapterByIdService,
    getChaptersByBookService,
    updateChapterService,
};