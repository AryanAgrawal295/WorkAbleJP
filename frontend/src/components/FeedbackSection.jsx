import React from 'react';
import { Star } from 'lucide-react';

const feedbacks = [
    { name: "Amit Sharma", rating: 5, comment: "Amazing platform! Helped me find a job quickly." },
    { name: "Priya Verma", rating: 4, comment: "Great experience, but more job listings would be helpful." },
    { name: "Rahul Gupta", rating: 5, comment: "Inclusive and easy to use. Highly recommended!" }
];

const FeedbackSection = () => {
    return (
        <div className='text-center my-10'>
            <div className='flex flex-col gap-5'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    User Feedback & Ratings
                </span>
                <h2 className='text-4xl font-bold'>What Our Users Say</h2>
                <p>
                    Hear from our users about their experiences with our platform.
                </p>
                <div className='flex flex-col gap-6 w-[50%] mx-auto'>
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className='shadow-lg border border-gray-200 p-5 rounded-lg bg-white'>
                            <h3 className='font-semibold'>{feedback.name}</h3>
                            <div className='flex gap-1 justify-center my-2'>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <p className='text-gray-600'>{feedback.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSection;
