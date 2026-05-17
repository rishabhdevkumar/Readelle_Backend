const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const categorySchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },

        category_name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            minlength: [3, "Category name must be at least 3 characters"],
            maxlength: [30, "Category name cannot exceed 30 characters"],
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

categorySchema.pre("save", async function () {
    if (this.isNew) {

        const categoryCode = this.category_name
            ? this.category_name.substring(0, 3).toUpperCase()
            : "CAT";

        this._id = await generateCustomId(
            "category_sequence_id",
            "CAT",
            categoryCode,
            3
        );
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;