var express = require('express');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
var router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
  // Fetch all messages from the database
  const messages = await Message.find().populate('author').exec();

  // Render the template with the messages
  res.render('index', { user: req.user, title: 'Index', messages });
}));

module.exports = router;
