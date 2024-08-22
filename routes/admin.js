// admin.js or your router file
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed

// Middleware to ensure the user is logged in and has proper access
const { isLoggedIn, isAdmin } = require('../middleware/auth');

router.use(isLoggedIn, isAdmin); // Apply to all routes in this file

// Route for the users section
router.get('/dashboard/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.render('admin/users', { users }); // Render the users view
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
