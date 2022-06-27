const AuthModel = require('./../models/authModel');
var bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const userExists = await AuthModel.exists({ email: req.body.email});
    if (!userExists){
        try{
            const newUser = await AuthModel.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        type: newUser.type
                    },
                },
            });
        }catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    }else{
            res.status(401).json({
                status: "fail",
                message: "user already exists"
            });
    }
};

exports.loginUser = async(req, res) =>{
    console.log(req.body);
    const userExists = await AuthModel.exists({ email: req.body.email });
    if (userExists){
    AuthModel.findOne({ email: req.body.email },function (err, person) {
        let hashedPass = bcrypt.hashSync(req.body.password, person.salt);
        if (hashedPass === person.password){
            res.status(201).json({
            status: "Success",
            user: {
                id: person._id,
                username: person.username,
                email: person.email,
                type: person.type
            }
        });
        }else{
            res.status(401).json({
                status: "Fail",
                message: "Įvesti duomenys yra neteisingi!"
            });
        }
      });
    }else{
        res.status(404).json({
            status: "Fail"
        });
    }
};

exports.getAllUsers= async (req, res) => {
    try{
        const users = await AuthModel.find();
        res.status(201).json({
            status: 'success',
            users: users
        });
    }catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}
exports.deleteUser= async (req, res) => {
	try {
		await AuthModel.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};

exports.editUser= async (req, res) => {
    console.log("dot");
	try {
		const user = await AuthModel.findByIdAndUpdate(req.body.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};