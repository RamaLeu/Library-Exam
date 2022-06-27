const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
	Name: {
		type: String
	},
	Amount: {
		type: Number
	},
	Date: {
		type: String
	},
	Type: {
		type: String
	},
	Category: {
		type: String
	},
	UserId: {
		type: String
	}
});

const ExpenseModel = new mongoose.model('expenses', expenseSchema);

module.exports = ExpenseModel;
