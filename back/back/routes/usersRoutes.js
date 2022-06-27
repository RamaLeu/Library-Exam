const express = require('express');

const {
	allUsers, deleteUser
} = require('./../controllers/usersController');

const router = express.Router();

router.route('/').get(allUsers).delete(deleteUser);

module.exports = router;
