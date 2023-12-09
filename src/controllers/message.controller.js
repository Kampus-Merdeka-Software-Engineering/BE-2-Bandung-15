const prisma = require('../config/prisma.js');

// Get all messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await prisma.message.findMany();
        res.status(200).json({ message: "Success", data: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
}

// Create new message
exports.createMessage = async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        const newMessage = await prisma.message.create({
            data: {
                name,
                email,
                message
            },
        });
        res.status(201).json({
            message: 'Message created successfully',
            data: newMessage
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
}