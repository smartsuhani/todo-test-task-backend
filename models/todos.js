const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false
  },
  order : {
    type : Number
  },
  url: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});
const todo = mongoose.model('todo', TodoSchema);
module.exports = { todo };
