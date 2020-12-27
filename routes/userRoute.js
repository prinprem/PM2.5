const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', urlencodedParser, controller.getAllUser);
router.post('/', jsonParser, controller.createUser);
router.put('/:id', jsonParser, controller.updateUser);
router.delete('/:id', jsonParser, controller.deleteUser);
module.exports = router;
