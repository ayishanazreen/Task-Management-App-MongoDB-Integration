const express=require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
// const todoList=require("./todoList.json");
const cors=require("cors");
const {errorHandler}=require('./middlewares/errorHandler');
const todoRoute=require('./routes/todoRoute');
const connectDB = require("./config/db");
connectDB();



app.use(cors());
app.use(express.json());
//creating a server
app.listen(process.env.PORT, ()=>{
    console.log(`Server is started ${process.env.PORT}`);
})



app.use("/api/todo", todoRoute);
//creating routes




  //validating attributes using middle ware and function


  //validating attributeds in Normal way using if condition 


    //  if(!("id" in req.body) || !("name" in req.body) || !("isCompleted" in req.body))
    //     {
    //        res.status(404).json({
    //         message:"Missing Attribute : id, name, isCompleted"
    //      });
    //      return;
    //     }

 //validating attributes using middleawre


    // if (!("id" in req.body)){
    //     const error={
    //         status:400,
    //         fields:{
    //             body:req.body,
    //             required:"id",
    //         },
    //     };
    //     return next(error);
    // }

    // if (!("name" in req.body)){
    //     const error={
    //         status:400,
    //         fields:{
    //             body:req.body,
    //             required:"name",
    //         },
    //     };
    //     return next(error);
    // }

    // if (!("isCompleted" in req.body)){
    //     const error={
    //         status:400,
    //         fields:{
    //             body:req.body,
    //             required:"isCompleted",
    //         },
    //     };
    //     return next(error);
    // }


    

app.use(errorHandler);






// app.get("/api/todo/edit", (req,res)=>{
//     const {editTodo}=req.query;
//     console.log("todo list", todoList)
//     const toEditTodo= todoList.find((item) => item.name ===editTodo);

//       if(toEditTodo)
//         {
//           console.log("todo found",toEditTodo )
//           return res.json(toEditTodo);
         
//         }
//       else
//       {
//         console.log("todo is not found")
//     }});



// app.post('/api/todo/edit', (req,res)=>{
//     const {editId, updateTodo}=req.body.data;

//     console.log("Received editId:", editId); // Log the received editId
//     console.log("Received updateTodo:", updateTodo);

//     const TodoIndex=todoList.findIndex((item)=> item.id===editId)
//      todoList[TodoIndex].name=updateTodo;
//     return res.json(todoList);

// })    

