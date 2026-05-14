const mongoose = require("mongoose");
const generateCustomId = require("../utils/idGenerator"); // Import the custom ID generator utility

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String, 
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength:[3,"Name must be at least 3 characters"],
            maxlength:[50,"Name can  not exceed 50 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
             minlength: [5, "Email must be at least 5 characters"],
             maxlength: [50, "Email cannot exceed 50 characters"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        },
        phone: {
            type: Number,
            required: [true, "Phone number is required"],
            match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"]
    
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
