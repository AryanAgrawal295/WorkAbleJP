import User from "../models/user.model.js";
import Message from "../models/Message.js"; // fixed import capitalization

// Send message
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const { receiverId, content } = req.body;

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found", success: false });
        }

        const message = await Message.create({
            sender: senderId,
            receiver: receiverId,
            content
        });

        return res.status(201).json({ message: "Message sent successfully", success: true, data: message });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get all messages between two users
export const getMessages = async (req, res) => {
    try {
        const userId = req.id;
        const { receiverId } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: receiverId },
                { sender: receiverId, receiver: userId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({ messages, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
