const express = require('express');

const {
	addLog,
    getAllLogs,
    deleteLog
} = require('./../controllers/logsController');

const router = express.Router();

router.route('/').get(getAllLogs).post(addLog).delete(deleteLog);

module.exports = router;
