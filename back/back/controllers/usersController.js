const RegModel = require("./../models/registrationModel");

exports.allUsers = async (req, res) => {
	try {
		const users = await RegModel.find();
		res.status(200).json({
			status: 'success',
			results: users.length,
			data: {
				users: users
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await RegModel.findByIdAndDelete(req.body.id);

		res.status(204).json({
			status: 'success',
			data: null
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};
