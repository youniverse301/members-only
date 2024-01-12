const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display Member create form on GET.
exports.member_create_get = asyncHandler(async (req, res, next) => {
    res.render("create_member");
});

// Display Member create form on POST.
exports.member_create_post = asyncHandler(async (req, res, next) => {
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
          console.log(currentUser)

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
});

