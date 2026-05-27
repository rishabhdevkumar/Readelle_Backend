const express = require('express');
const { createHighlight, deleteHighlight } = require('../controllers/highlight.controller');
const { auth } = require('../middlewares/auth.middleware');
const { getHighlightsByChapterId } = require('../controllers/highlight.controller');

const router = express.Router();


router.post('/', auth, createHighlight);
router.get('/book/:bookId/chapter/:chapterId', auth, getHighlightsByChapterId);
router.delete('/:highlightId', auth, deleteHighlight)

module.exports = router;