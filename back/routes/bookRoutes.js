const express = require('express');

const {
	addBook, getAllBooks, reserveBook, editBook, deleteBook
} = require('./../controllers/bookController');

const router = express.Router();

router.route('/').post(addBook).get(getAllBooks).patch(reserveBook)
router.route('/change').patch(editBook);
router.route('/:id').delete(deleteBook);

module.exports = router;
