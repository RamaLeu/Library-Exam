const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
    },


});

const CategoryModel = new mongoose.model("categories", categorySchema);

module.exports = CategoryModel;