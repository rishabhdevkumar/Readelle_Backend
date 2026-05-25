const { createNoteService } = require('../services/notes.service');

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