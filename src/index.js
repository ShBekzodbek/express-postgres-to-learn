const express = require('express');

const authRoute = require('./routes/auth');

const loger = require('morgan');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(loger('dev'));


app.use("/user", authRoute);


module.exports = app;