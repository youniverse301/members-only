const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// GET request for displaying the admin creation form.
router.get("/", adminController.admin_create_get);

// POST request for creating an admin.
router.post("/", adminController.admin_create_post);

module.exports = router;

