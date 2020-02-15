const Todo = require('../models/todos').todo;
const mongoose = require('mongoose');

const getList = (req, res) => {
  Todo.find({isDelete: false}).then((data) => {
    let result = data.map((doc)=> {
      return {
        id : doc._id,
        title : doc.title,
        completed : doc.completed,
      }
    })
    res.send(result);
  }).catch((err) => {
    res.send({
      status : false,
      error : error
    });
  });
};

const create = (req, res) => {
  console.log("req :",req.body);
  let id = new mongoose.Types.ObjectId;
  const todo = new Todo({
    _id : id,
    title: req.body.title,
  });
  let todoData = todo.save().then((data) => {
    res.send({
      title : data.title,
      completed : data.completed,
    });
  }).catch((error) => {
    res.send({
      status : false,
      error : error
    });
  });

};

module.exports = { getList, create};
