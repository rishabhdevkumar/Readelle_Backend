
const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const chapterSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },

        book: {
            type: String,
            ref: "Book",
            required: [true, "Book id is required"],
        },

        chapter_title: {
            type: String,
            required: [true, "Chapter title is required"],
            trim: true,
            minlength: [2, "Chapter title must be at least 2 characters"],
            maxlength: [100, "Chapter title cannot exceed 100 characters"],
        },

        chapter_number: {
            type: Number,
            required: [true, "Chapter number is required"],
            min: [1, "Chapter number must be greater than 0"],
        },

        context: {
            type: String,
            trim: true,
            minlength: [5, "Context must be at least 5 characters"],
            maxlength: [1000, "Context cannot exceed 1000 characters"],
        },
    },
    {
        timestamps: true,
    }
);

chapterSchema.pre("save", async function () {

    if (this.isNew) {

        this._id = await generateCustomId(
            "chapter_sequence_id",
            "CH",
            "",
            3
        );
    }
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;