const Notes = require('../schemas/Notes');

exports.createNoteRepository = async (noteData) => {
    const note = new Notes(noteData);
    return await note.save();
}

exports.getAllNotesRepository = async (userId) => {
    return await Notes.find({ user: userId }).populate('book').populate('chapter');
}

exports.getNotesByBookAndChapterIdRepository = async (userId, bookId, chapterId) => {
    return await Notes.find({
        user: userId,
        book: bookId,
        chapter: chapterId,
    }).populate('book').populate('chapter');
}

exports.updateNotesRepository = async (noteId, noteData, userId) => {
    const updatedNote = await Notes.findOneAndUpdate(
        { _id: noteId, user: userId },
        noteData,
        { returnDocument: 'after', runValidators: true }
    );
    return updatedNote;
}

exports.deleteNotesRepository = async (noteId, userId) => {
    const deletedNote = await Notes.findOneAndDelete({ _id: noteId, user: userId });
    return deletedNote;
}