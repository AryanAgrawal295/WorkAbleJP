import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student", "recruiter"],
            required: true,
        },
        phoneNumber: {  // Added phone number field
            type: String,
            required: true,  // Make it mandatory if needed
            unique: true,  // Ensure uniqueness if required
            trim: true
        },
        savedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job"
            }
        ],
        notifications: [
            {
                type: String
            }
        ]
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
