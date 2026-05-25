const express = require('express');
const { createNotes, getAllNotes, getNotesByBookAndChapterId, deleteNotes, updateNotes } = require('../controllers/notes.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, createNotes);
router.get('/', auth, getAllNotes);
router.get('/book/:bookId/chapter/:chapterId', auth, getNotesByBookAndChapterId);
router.put('/:noteId', auth, updateNotes);
router.delete('/:noteId', auth, deleteNotes);

module.exports = router;