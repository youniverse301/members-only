var express = require('express');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
var router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
  // Fetch all messages from the database
  const messages = await Message.find().sort({ timestamp: -1 }).populate('author').exec();

  // Render the template with the messages
  res.render('index', { user: req.user, title: 'Index', messages });
}));

// Handle message deletion
router.post('/delete-message', asyncHandler(async (req, res, next) => {
  const messageId = req.body.messageId;
  console.log("test", messageId)

  // Delete the message from the database
  await Message.findByIdAndDelete(messageId);

  // Redirect back to the index page
  res.redirect('/');
}));

module.exports = router;
