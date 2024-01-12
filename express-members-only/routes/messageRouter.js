var express = require('express');
var router = express.Router();
const messageController = require('../controllers/messageController');

/* GET create message. */
router.get('/', messageController.message_create_get);

/* POST create message. */
router.post('/', messageController.message_create_post);

module.exports = router;
