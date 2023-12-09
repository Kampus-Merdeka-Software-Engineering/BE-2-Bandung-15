const prisma = require('../config/prisma.js');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ message: "Success", data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
}

// Create new user
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        res.status(201).send({
            message: "User created successfully",
            data: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Error creating user",
        });
    }
}