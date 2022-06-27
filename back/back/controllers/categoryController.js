const CategoryModel = require('./../models/categoryModel');

exports.addCategory = async (req, res) => {
		const categoryExists = await CategoryModel.exists({ categoryName: req.body.categoryName });
		if (!categoryExists){
			try{
				const newCategory = await CategoryModel.create(req.body);
				res.status(201).json({
					status: 'success',
					data: {
						category: newCategory,
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
					message: "category already exists"
				});
		}
};

exports.allCategories = async (req, res) => {
	try {
		const categories = await CategoryModel.find();
		res.status(200).json({
			status: 'success',
			results: categories.length,
			data: {
				categories: categories
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		await CategoryModel.findByIdAndDelete(req.body.id);

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

exports.editCategory = async (req, res) => {
	const categoryExists = await CategoryModel.exists({ categoryName: req.body.categoryName });
	if (!categoryExists){
	try {
		const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		res.status(200).json({
			status: 'success',
			data: {
				category: category
			}
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}}else{
		res.status(401).json({
			status: "fail",
			message: "category already exists"
		});
}
};