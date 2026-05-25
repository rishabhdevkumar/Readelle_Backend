const express = require('express');
const { createNotes } = require('../controllers/notes.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, createNotes);

module.exports = router;