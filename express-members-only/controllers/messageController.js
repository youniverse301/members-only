const asyncHandler = require("express-async-handler");
const Message = require('../models/message');
const { body, validationResult } = require("express-validator");

// Display Message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("create_message", { user: req.user, error: undefined, messages: [] });
});

// Display Message create form on POST.
exports.message_create_post = asyncHandler(async (req, res, next) => {
    // Define validation and sanitization checks for each field
    const validationRules = [
      body('title').trim().escape().isLength({ min: 1 }).withMessage('Title is required'),
      body('text').trim().escape().isLength({ min: 1 }).withMessage( 'Text is required'),
    ];
  
    // Apply validation and sanitization middleware
    await Promise.all(validationRules.map(validation => validation.run(req)));
  
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, render the form again with error messages
      return res.render('create_message', { errors: errors.array() });
    }
  
    try {
      console.log(req.user)
      // Create a new Message instance with the sanitized and validated data
      const message = new Message({
        author: req.user,
        title: req.body.title,
        text: req.body.text,
        timestamp: new Date(),
      });
  
      // Save the message to the database
      const result = await message.save();
  
      // Redirect to the home page
      res.redirect('/');
    } catch (err) {
      // Handle any errors that occur during user creation
      return next(err);
    }
});