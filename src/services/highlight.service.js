const { findBookByIdRepository } = require('../repositories/book.repository');
const { findChapterByIdRepository } = require('../repositories/chapter.repository');
const { getHighlightByChapterIdRepository, deleteHighlightRepository } = require('../repositories/highlight.repository');
const createHighlightRepository = require('../repositories/highlight.repository').createHighlightRepository;

exports.createHighlightService = async (highlightData) => {

    const book = await findBookByIdRepository(highlightData.book);
    if (!book) {
        const error = new Error('Book not found');
        error.statusCode = 404;
        throw error;
    }

    const chapter = await findChapterByIdRepository(highlightData.chapter);
    if (!chapter) {
        const error = new Error('Chapter not found');
        error.statusCode = 404;
        throw error;
    }

    return await createHighlightRepository(highlightData);
}

exports.getHighlightsByChapterIdService = async (highlightData) => {
    const book = await findBookByIdRepository(highlightData.book);
    if (!book) {
        const error = new Error('Book not found');
        error.statusCode = 404;
        throw error;
    }

    const chapter = await findChapterByIdRepository(highlightData.chapter);
    if (!chapter) {
        const error = new Error('Chapter not found');
        error.statusCode = 404;
        throw error;
    }

    return await getHighlightByChapterIdRepository(highlightData);
}

exports.deleteHighlightService = async (userId, highlightId) => {

    const deletedHighlight = await deleteHighlightRepository(highlightId, userId);

    if(!deletedHighlight) {
        const error = new Error("Highlight not found or user not authorized");
        error.statusCode = 404;
        throw error;
    }

    return deletedHighlight;
}