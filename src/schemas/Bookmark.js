const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const bookmarkSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },

        user: {
            type: String,
            ref: "User",
            required: [true, "User id is required"],
            trim: true,
        },

        book: {
            type: String,
            ref: "Book",
            required: [true, "Book id is required"],
            trim: true,
        },

        chapter: {
            type: String,
            ref: "Chapter",
            required: [true, "Chapter id is required"],
            trim: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

bookmarkSchema.pre("save", async function () {

    if (this.isNew) {

        this._id = await generateCustomId(
            "bookmark_sequence_id",
            "BMK",
            null,
            3
        );
    }
});

const Bookmark = mongoose.model(
    "Bookmark",
    bookmarkSchema
);

module.exports = Bookmark;