var express = require('express');
var router = express.Router();
const userSignUpController = require('../controllers/userSignUpController');

/* GET create user. */
router.get('/', userSignUpController.user_create_get);

/* POST create user. */
router.post('/', userSignUpController.user_create_post);

module.exports = router;
