var express = require('express');
var router = express.Router();
const passport = require('passport');
const memberController = require('../controllers/memberController');

  // GET route for displaying the form
  router.get('/', memberController.member_create_get);

  // POST route with authentication middleware
  router.post('/', memberController.member_create_post);

  module.exports = router;

