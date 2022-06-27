const ReserveModel = require('./../models/reserveModel');

exports.reserveOrder = async (req, res) => {
        try{
            const newOrder = await ReserveModel.create(req.body);
            res.status(201).json({
                status: 'success',
            });
        }catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
};