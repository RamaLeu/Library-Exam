const express = require("express");


const {
    addExpense, getAllExpense, deleteExpense, updateExpense
} = require("./../controllers/expenseController");

const router = express.Router();

router.route("/").post(addExpense).get(getAllExpense);
router.route('/:id').put(updateExpense).delete(deleteExpense);

module.exports = router;

