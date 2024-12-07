const express = require('express');
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
// Create a new instance of express router
// This router will hold the routes for your app, and you can use it to manage your requests more easily.
const router = express.Router();

// Check User Api
router.post('/register', registerUser);
// Check User Email
router.post('/email', checkEmail);
// Check User Password
router.post('/password', checkPassword);

module.exports = router;