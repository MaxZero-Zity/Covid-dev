const express = require('express');

const router = express.Router();
const covidLineMessageController = require('../controllers/covidLineMessageController');

router.post('/pushMessageLine',
  covidLineMessageController.replyMessage);

module.exports = router;
