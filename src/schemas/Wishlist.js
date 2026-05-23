const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator");

const wishlistSchema = new mongoose.Schema(
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

        status: {
            type: String,
            enum: {
                values: ["TO_READ", "READING", "COMPLETED"],
                message: "Status must be TO_READ, READING or COMPLETED",
            },
            default: "TO_READ",
            uppercase: true,
            trim: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: false,
        },
    }
);

wishlistSchema.pre("save", async function () {
    if (this.isNew) {
        this._id = await generateCustomId(
            "wishlist_sequence_id",
            "WIS",
            null,
            3
        );
    }
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;