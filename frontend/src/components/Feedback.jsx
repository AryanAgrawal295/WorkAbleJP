import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "../redux/feedbackSlice"; // Import action
import { Button } from "./ui/button";

const Feedback = () => {
    const [feedback, setFeedback] = useState("");
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.feedback); // Access feedback state

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!feedback.trim()) {
            return;
        }

        dispatch(submitFeedback( feedback )); // Dispatch action
        setFeedback(""); // Clear input field after submission
    };

    return (
        <div>
            <p>Share your experience with job applications.</p>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows="4"
                    placeholder="Share your experience..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <br />
                <Button type="submit" className="mt-2 bg-[#7209b7] hover:bg-[#5f32ad]">
                    Submit Feedback
                </Button>
            </form>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default Feedback;
