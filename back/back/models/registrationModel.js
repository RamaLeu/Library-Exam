const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    type:{
        type: String,
    },
    email:{
        type: String,
    },
    password: {
        type: String,
    },
    salt: {
        type:String
    }


});

const RegModel = new mongoose.model("users", regSchema);

module.exports = RegModel;