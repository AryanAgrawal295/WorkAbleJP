import React, { useState } from 'react';
import { Button } from './ui/button';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (!feedback.trim()) {
            setError("Please enter feedback");
            return;
        }
        
        setError(""); // Clear any previous error
    
        try {
            const response = await fetch("'http://localhost:3000/api/v1/feedback/submit'", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ feedback }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage("Feedback submitted successfully!");
                setFeedback(""); // Clear input field
            } else {
                setError(data.message || "Something went wrong!");
            }
        } catch (error) {
            setError("Network error, please try again later.");
        }
    };
    
    

    return (
        <div>
            <p>Share your experience with job applications.</p>
            <form onSubmit={handleSubmit}>
                <textarea 
                    className='w-full border border-gray-300 rounded-lg p-2' 
                    rows='4' 
                    placeholder='Share your experience...'
                    value={feedback} 
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <br />
                <Button type='submit' className='mt-2 bg-[#7209b7] hover:bg-[#5f32ad]'>Submit Feedback</Button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Feedback;
