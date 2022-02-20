const express = require('express');
const getAllItems = require('../controllers/query');
const router = express.Router();

router.route('/items').get(getAllItems);

module.exports = router;
