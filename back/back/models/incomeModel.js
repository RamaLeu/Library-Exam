const mongoose = require('mongoose');
/* const Date = {
	timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}; */

// DB schema
const incomesSchema = new mongoose.Schema({
	Name: {
		type: String
	},
	Amount: {
		type: Number
	},
	Category:{
		type: String
	},
	Type: {
		type: String
	},
	Date: {
		type: Date
	},
	UserId:{
		type: String
	}
});

// Modelis DB lentelės pavadinimas
const Incomes = new mongoose.model('Incomes', incomesSchema);

//Duomenų siuntimas į DB

module.exports = Incomes;
