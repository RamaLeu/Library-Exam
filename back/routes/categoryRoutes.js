const express = require('express');

const {
	addCategory, getAllCategories, editCategory, deleteCategory
} = require('./../controllers/categoryController');

const router = express.Router();

router.route('/').post(addCategory).get(getAllCategories).patch(editCategory);
router.route('/:id').delete(deleteCategory);

module.exports = router;
