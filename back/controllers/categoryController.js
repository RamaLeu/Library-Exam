const CategoryModel = require('./../models/categoryModel');


exports.addCategory = async (req, res) => {
    const categoryExists = await CategoryModel.exists({ name: req.body.name});
    if (!categoryExists){
        try{
            const newCategory = await CategoryModel.create(req.body);
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
                message: "Category already exists"
            });
    }
};
exports.getAllCategories= async (req, res) => {
        try{
            const categories = await CategoryModel.find();
            res.status(201).json({
                status: 'success',
                categories: categories
            });
        }catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
}
exports.editCategory= async (req, res) => {
	try {
		const category = await CategoryModel.findByIdAndUpdate(req.body.id, req.body, {
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

exports.deleteCategory= async (req, res) => {
	try {
		await CategoryModel.findByIdAndDelete(req.params.id);

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
