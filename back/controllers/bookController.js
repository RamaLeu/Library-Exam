const BookModel = require('./../models/bookModel');


exports.addBook = async (req, res) => {
    const bookExists = await BookModel.exists({ title: req.body.title});
    if (!bookExists){
        try{
            const newBook = await BookModel.create(req.body);
            res.status(201).json({
                status: 'success',
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
                message: "Book already exists"
            });
    }
};
exports.getAllBooks= async (req, res) => {
        try{
            const books = await BookModel.find();
            res.status(201).json({
                status: 'success',
                books: books
            });
        }catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
}

exports.reserveBook= async (req, res) => {
	try {
		const book = await BookModel.findByIdAndUpdate(req.body.id, req.body, {
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

exports.editBook= async (req, res) => {
    const bookExists = await BookModel.exists({ title: req.body.title});
    if (!bookExists){
	try {
		const book = await BookModel.findByIdAndUpdate(req.body.id, req.body, {
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
	}}else{
        res.status(401).json({
            status: "fail",
            message: "Book already exists"
        });
    }
};
exports.deleteBook= async (req, res) => {
	try {
		await BookModel.findByIdAndDelete(req.params.id);

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
