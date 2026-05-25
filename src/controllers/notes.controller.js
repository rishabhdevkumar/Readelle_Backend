const { createNoteService, getAllNotesService, getNotesByBookAndChapterIdService, deleteNotesService, updateNotesService } = require('../services/notes.service');

exports.createNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteData = req.body;
        noteData.user = userId;
        const note = await createNoteService(noteData, userId);
        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: note,
            error: null
        })
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: 'Failed to create note',
            data: null,
            error: error.message
        })
    }
}

exports.getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await getAllNotesService(userId);
        res.status(200).json({
            success: true,
            message: 'Notes retrieved successfully',
            data: notes,
            error: null
        })
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: 'Failed to retrieve notes',
            data: null,
            error: error.message
        })
    }
}

exports.getNotesByBookAndChapterId = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const chapterId = req.params.chapterId;
        const notes = await getNotesByBookAndChapterIdService(userId, bookId, chapterId);
        res.status(200).json({
            success: true,
            message: 'Notes retrieved successfully',
            data: notes,
            error: null
        })
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: 'Failed to retrieve notes',
            data: null,
            error: error.message
        })
    }
}


exports.updateNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.noteId;
        const noteData = req.body;
        const updatedNote = await updateNotesService(noteId, noteData, userId);
        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            data: updatedNote,
            error: null
        })
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: 'Failed to update note',
            data: null,
            error: error.message
        })
    }
}

exports.deleteNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.noteId;
        const deletedNote = await deleteNotesService(noteId, userId);
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
            data: deletedNote,
            error: null
        })
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: 'Failed to delete note',
            data: null,
            error: error.message
        })
    }
}
