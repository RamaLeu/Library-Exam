const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    image:{
        type: String,
    },
    title:{
        type: String,
    },
    category:{
        type: String,
    },
    author:{
        type: String,
    },
    status: {
       type: Boolean,
    }


});

const BookModel = new mongoose.model("books", bookSchema);

module.exports = BookModel;