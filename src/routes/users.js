const express = require('express');
const UserController = require('../controller/users.js');
const router = express.Router();

// Create new user
router.post('/', UserController.createNewUser);

// Get all users
router.get('/', UserController.getAllUsers);

// Update user
router.patch('/:idUser', UserController.updateUser);

// Delete user
router.delete('/:idUser', UserController.deleteUser);

module.exports = router;