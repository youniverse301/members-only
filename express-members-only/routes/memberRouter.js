var express = require('express');
var router = express.Router();
const passport = require('passport');
const memberController = require('../controllers/memberController');

// Accept the authentication middleware as a parameter
module.exports = ({ localBecomeMemberAuth }) => {
    // GET route for displaying the form
    router.get('/', memberController.member_create_get);

    // POST route with authentication middleware
    router.post('/', localBecomeMemberAuth, memberController.member_create_post);

    // Return the router
    return router;
};
