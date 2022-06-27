const express = require('express');

const {
	registerUser, loginUser, getAllUsers, deleteUser, editUser
} = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(getAllUsers).patch(editUser);
router.route('/:id').delete(deleteUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
