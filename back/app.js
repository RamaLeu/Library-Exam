const express = require('express');
const { get } = require('http');

const authRoutes = require("./routes/authRoutes");

const bookRoutes = require("./routes/bookRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


const app = express();

var cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/reserve", reservationRoutes);
app.use("/api/v1/categories", categoryRoutes);

module.exports = app;
