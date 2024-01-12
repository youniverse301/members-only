const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display Message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create GET");
});

  // Display Message create form on POST.
exports.message_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create POST");
});