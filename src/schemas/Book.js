const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const bookSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        category_id: {
            type: String,
            ref: "Category",
            required: [true, "Category is required"],
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true,
            minlength: [3, "Author name must be at least 3 characters"],
            maxlength: [50, "Author name cannot exceed 50 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [1, "Price must be greater than 0"],
            max: [10000, "Price cannot exceed 10000"],
        },
        language: {
            type: String,
            trim: true,
            required: [true, "Language is required"],
            enum: {
                values: ["English", "Hindi"],
                message: "Language is not valid",
            },
        },
        description: {
            type: String,
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        cover_image: { type: String, trim: true },
        file_url: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);
bookSchema.pre("save", async function () {
    if (this.isNew) {
        const langCode = this.language ? this.language.substring(0, 2) : "XX";

        this._id = await generateCustomId("book_sequence_id", "BK", langCode, 3);
    }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
