const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminControllers');

// // Route to create a new user
// router.post('/register', adminController.registerUser);

// // Login route
// router.post('/login', adminController.loginUser);

// // Route to get user by ID
// router.get('/get/:user_id', adminController.getUserById);

// // Route to update user by ID
// router.put('/update/:user_id', adminController.updateUserById);

// // // Route to delete user by ID
// router.delete('/delete/:user_id', adminController.deleteUserById);

module.exports = router;
