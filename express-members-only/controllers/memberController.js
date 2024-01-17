// Import required modules
const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const { body, validationResult } = require("express-validator");

// Middleware function to log currently logged-in user
const logCurrentUser = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            // Access the currently logged-in user
            const currentUser = req.user;
            console.log(`Currently logged-in user: ${currentUser}`);
        } else {
            console.log('No user logged in.');
        }
        next();
    } catch (err) {
        console.error('Error logging current user:', err);
        next(err);
    }
};

// Display Member create form on GET.
exports.member_create_get = [logCurrentUser, asyncHandler(async (req, res, next) => {
    res.render("create_member");
})];

// Display Member create form on POST.
exports.member_create_post = [logCurrentUser, asyncHandler(async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, render the form again with error messages
        return res.render('create_member', { errors: errors.array() });
    }

    try {
        // Ensure the user is authenticated
        if (req.isAuthenticated()) {
            // Access the currently logged-in user
            const currentUser = req.user;
            console.log(currentUser);

            // Update the status of the current user
            currentUser.status = "member";

            // Save the updated user to the database
            const result = await currentUser.save();

            // Redirect to the home page or another appropriate page
            res.redirect('/');
        } else {
            // Handle the case where the user is not authenticated
            return res.render('create_member', { errors: [{ msg: 'User not authenticated.' }] });
        }
    } catch (err) {
        // Handle any errors that occur during the update
        return next(err);
    }
})];
