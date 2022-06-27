const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username:{
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

const authModel = new mongoose.model("users", authSchema);

module.exports = authModel;