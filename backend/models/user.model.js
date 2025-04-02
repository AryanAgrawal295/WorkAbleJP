import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
        // You can add additional fields like name, profile, etc.
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
