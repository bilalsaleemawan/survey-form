const express = require('express');
const { registerUser, loginUser } = require('../Controller/auth.Controller');

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

module.exports = router;
