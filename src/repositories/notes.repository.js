const Notes = require('../schemas/Notes');

exports.createNoteRepository = async (noteData) => {
    const note = new Notes(noteData);
    return await note.save();
}