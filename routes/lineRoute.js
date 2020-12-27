const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/LineController');

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/webhook', urlencodedParser, controller.webhook);
router.post('/log', jsonParser, controller.log);
module.exports = router;
