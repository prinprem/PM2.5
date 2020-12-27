const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/AuthController');

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/logout', urlencodedParser, controller.logout);
router.post('/signup', jsonParser, controller.signup);
router.post('/login', jsonParser, controller.login);
module.exports = router;
