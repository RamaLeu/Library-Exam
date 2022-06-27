const mongoose = require('mongoose');


const logsSchema = new mongoose.Schema({
	UserId: {
		type: String
	},
	ActionType: {
		type: String
	},
	Timestamp:{
		type: Date
	},
    Data: {
        type: Object
    }
});

const Logs = new mongoose.model('Logs', logsSchema);

module.exports = Logs;
