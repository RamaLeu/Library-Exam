const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
    userEmail:{
        type: String,
    },
    userID:{
        type: String,
    },
    book:{
        type: Object,
    },
    date: {
       type: Date,
    }


});

const ReserveModel = new mongoose.model("reservation", reserveSchema);

module.exports = ReserveModel;