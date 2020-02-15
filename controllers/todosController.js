const Todo = require('../models/todos').todo;
const mongoose = require('mongoose');

const getList = (req, res) => {
  Todo.find({isDelete: false}).then((data) => {
    let result = data.map((doc)=> {
      return {
        id : doc._id,
        title : doc.title,
        completed : doc.completed,
        url : doc.url,
        order : doc.order
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

const getTodo = (req,res,next) => {
  todoId = req.params.todo;
  Todo.findById(todoId).then((result)=>{
    res.send(result)
  }).catch((error)=>{
    res.send({
      status : false,
      error : error
    })
  })
}

const create = (req, res) => {
  console.log("req :",req.body);
  let id = new mongoose.Types.ObjectId;
  let order = req.body.order;
  Todo.find({},{order:1, _id:0}).sort({order:-1}).limit(1).then((result)=>{
    order =  order ? order : Object.keys(result).length ? result[0].order + 1 : 1;
    let baseUrl = process.env.baseUrl || "http://localhost:5000/";
    const todo = new Todo({
      _id : id,
      title: req.body.title,
      url : baseUrl+"todo/"+id,
      order : order
    });
    let todoData = todo.save().then((data) => {
      res.send({
        id: data._id,
        title : data.title,
        completed : data.completed,
        url : data.url,
        order : data.order
      });
    }).catch((error) => {
      res.send({
        status : false,
        error : error
      });
    });
  })


};

const updateTodo = (req,res,next) => {
  todoId = req.params.todo;
  newTitle = req.body.title;
  completed = req.body.completed;
  order = req.body.order;
  status = req.body.status;
  let todo;

  if(newTitle && completed){
    todo = {title : newTitle, completed: true}
  }
  else if(newTitle){
    todo = {title : newTitle}
  }
  else if(completed)
  {
    todo = {completed: true}
  }
  else if(order){
    todo = {order : order}
  }
  //const todo = {title : newTitle}

  Todo.findById(todoId).then((result)=>{
    let newTodo = Object.assign(result,todo);
    newTodo.save().then((data)=>{
      res.send(data)
    })
  }).catch((error)=>{console.log("something went wrong : ",error)
    res.send({
      status : false,
      error : error
    });})
}

const singleDelete = (req,res,next) => {
  console.log("params : ",req.params);
  todoId = req.params.todo;
  Todo.findOneAndDelete(todoId).then((result)=>{
    res.send()
  }).catch((error)=>{
    res.send({
      error : error
    })
  })
}

const deleteAll = (req,res,next) => {
  Todo.deleteMany({}).then(()=> {
    res.send();
  }).catch((error)=>{
    res.send({
      status : false,
      error : error
    })
  })
}
const deleteCompleted = (req,res,next) => {
  Todo.deleteMany({'completed' : true}).then((result) => {
    console.log("deleted records : ",result);
    getList(req,res,next);
  }).catch((error)=>{
    console.log("error : ",error);
    res.send({
      status : false,
      error : error
    })
  })
}

module.exports = { getList, getTodo, create, updateTodo, singleDelete , deleteAll, deleteCompleted };
