const express = require('express');
const router = express.Router();
const auth = require('../../middleware/AuthMiddleware');
const ChatController = require('../../controllers/ChatController');

router.post('/send-message',auth,ChatController.sendMessage);
router.get('/get-logs',ChatController.getChatLogs);

module.exports = router;