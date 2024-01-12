const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display Log In form on GET.
exports.user_login_get = asyncHandler(async (req, res, next) => {
    res.render("log_in");
});

  // Display Log In form on POST.
