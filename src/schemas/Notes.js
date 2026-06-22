const mongoose = require('mongoose');
const generateCustomId = require('../utils/idGenerator');

const notesSchema = new mongoose.Schema({
    _id: {
        type: String,
    },

    user: {
        type: String,
        ref: 'User',
        required: [true, 'User is required']
    },

    book: {
        type: String,
        ref: 'Book',
        required: [true, 'Book is required']
    },

    chapter: {
        type: String,
        ref: 'Chapter',
        required: [true, 'Chapter is required']
    },

    noteText: {
        type: String,
        required: [true, 'Note text is required'],
        trim: true,
        minlength: [1, 'Note text must be at least 1 character'],
        maxlength: [1000, 'Note text cannot exceed 1000 characters']
    },

    selectedText: {
        type: String,
        trim: true,
        default: ""
    },

    color: {
        type: String,
        trim: true,
        default: ""
    }
}, {
    timestamps: true
});

notesSchema.pre('save', async function () {
    if (this.isNew) {
        this._id = await generateCustomId(
            'notes_sequence_id',
            'NT',
            '',
            3
        );
    }
});

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;