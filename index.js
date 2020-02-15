const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const conn = require('./config/conn');
const todoRouter = require('./routes/TodoRoute');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/todo', todoRouter);
app.listen(process.env.PORT || 5000, () => {
    console.log('Server is Running on 5000');
});