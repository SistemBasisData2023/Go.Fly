const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountControllers');

// Route to create a new user
router.post('/register', accountController.registerUser);

// Login route
router.post('/login', accountController.loginUser);

// Route to get user by ID
router.get('/get/:user_id', accountController.getUserById);

// Route to update user by ID
router.put('/update/:user_id', accountController.updateUserById);

// // Route to delete user by ID
router.delete('/delete/:user_id', accountController.deleteUserById);

module.exports = router;
