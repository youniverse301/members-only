const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

//GET request for creating a user.
router.get("/user-create", user_controller.user_create_get);

//POST request for creating a user.
router.get("/user-create", user_controller.user_create_post);

module.exports = router;
