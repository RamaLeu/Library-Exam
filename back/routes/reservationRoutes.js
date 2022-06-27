const express = require('express');

const {
	reserveOrder
} = require('./../controllers/reserveController');

const router = express.Router();

router.route('/').post(reserveOrder);

module.exports = router;
