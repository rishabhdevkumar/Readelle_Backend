const { createNoteRepository } = require("../repositories/notes.repository");
const { findBookByIdRepository } = require("../repositories/book.repository");
const { findChapterByIdRepository } = require("../repositories/chapter.repository");

exports.createNoteService = async (noteData) => {
    // check if book and chapter exist

    const book = await findBookByIdRepository(noteData.book);
    if (!book) {
        const error = new Error('Book not found');
        error.statusCode = 404;
        throw error;
    }

    const chapter = await findChapterByIdRepository(noteData.chapter);
    if (!chapter) {
        const error = new Error('Chapter not found');
        error.statusCode = 404;
        throw error;
    }

    const note = await createNoteRepository(noteData);
    return note;
}