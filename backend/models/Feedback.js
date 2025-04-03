import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        required:false,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
