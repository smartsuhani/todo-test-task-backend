/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0-ovnuh.mongodb.net/tododb', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  (success) => {
    console.log('Connection Sucessfully Done');
  },
  (error) => {
    console.log('Connection Failed :',error);
  },
);
