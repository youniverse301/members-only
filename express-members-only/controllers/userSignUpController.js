const User = require("../models/user");
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("create_user");
});

  // Display User create form on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
    // Define validation and sanitization checks for each field
    const validationRules = [
      body('firstname').trim().escape().isLength({ min: 1 }).withMessage('First name is required'),
      body('lastname').trim().escape().isLength({ min: 1 }).withMessage('Last name is required'),
      body('email').trim().escape().isEmail().withMessage('Invalid email address'),
      body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      body('confirmPassword').trim().escape(),
    ];
  
    // Apply validation and sanitization middleware
    await Promise.all(validationRules.map(validation => validation.run(req)));
  
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with error messages
      return res.render('create_user', { errors: errors.array() });
    }
  
    try {
      // Check if the password and confirm password match
      if (req.body.password !== req.body.confirmPassword) {
        return res.render('create_user', { errors: [{ msg: 'Passwords do not match.' }] });
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new User instance with the sanitized and validated data
      const user = new User({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        status: "none",
      });
  
      // Save the user to the database
      const result = await user.save();
  
      // Redirect to the login page
      res.redirect('/log-in');
    } catch (err) {
      // Handle any errors that occur during user creation
      return next(err);
    }
});
  
  