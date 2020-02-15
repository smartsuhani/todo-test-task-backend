/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
let mongoUrl = process.env.mongoUrl || 'mongodb+srv://root:root@cluster0-ovnuh.mongodb.net/tododb';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  (success) => {
    console.log('Connection Sucessfully Done');
  },
  (error) => {
    console.log('Connection Failed :',error);
  },
);
