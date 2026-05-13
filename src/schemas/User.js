const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator"); // Import the custom ID generator utility

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String, // Explicit human-readable ID
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        phone: {
            type: Number,
            required: [true, "Phone number is required"],
        },
        role: {
            type: String,
            enum: {
                values: ["user", "seller", "admin"],
                message: "Role is not valid",
            },
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (this.isNew) {
        let roleCode = "US";
        if (this.role === "seller") roleCode = "SL";
        if (this.role === "admin") roleCode = "AD";

        // Replaces your old findOneAndUpdate block entirely
        this._id = await generateCustomId("user_sequence_id", "USR", roleCode, 3);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
