const express = require('express');

const {
	addCategory, allCategories, deleteCategory, editCategory
} = require('./../controllers/categoryController');

const router = express.Router();

router.route('/').get(allCategories).post(addCategory).delete(deleteCategory);

router.route('/:id').put(editCategory);

module.exports = router;
