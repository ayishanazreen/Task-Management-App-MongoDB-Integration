const express=require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');
const PORT=3055;
// const todoList=require("./todoList.json");
const cors=require("cors");
const {errorHandler}=require('./middlewares/errorHandler')

let todoList=[
    { id:1, name:"Learn Express" , isCompleted:false },
];


const validateAttributes=(attributes, body, next)=>{
 for(const attribute of attributes){
    if (!(attribute in body)){
        const error={
            status:400,
            fields:{
                body,
                required:attribute
            },
        };
        return next(error)
    }
}  
};

app.use(cors());
app.use(express.json());
//creating a server
app.listen(PORT, ()=>{
    console.log(`Server is started ${PORT}`);
})


//creating routes

app.get('/api/todo',(req,res) =>{
    res.json(todoList);
})

app.post('/api/todo',(req,res) =>{
    const {newtodo}=req.body;
    if(!("newtodo" in req.body)){
        res.status(400).json({
            message:`${JSON.stringify(req.body)}: this attribute is not accepted: use newtodo}`
        })
        return;
    }
    const todoItem= {
        id: uuidv4(),
        name:newtodo,
        isCompleted:false,
    }
    todoList.push(todoItem);
    // console.log(todoList);
    res.json(todoList);
})


app.put('/api/todo', (req,res,next)=>{
    const {id, name, isCompleted}=req.body;
    validateAttributes(['id', 'name','isCompleted'] , req.body, next)   //validating attributes using middle ware and function


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


       if (todoList.find((item)=> item.id ===id)){
        todoList.forEach((todo) => {
            if(todo.id===id)
            {
                todo.name=name,
                todo.isCompleted-isCompleted || false
            }
             });
             return res.json(todoList);
    }
    else
    {
        return res.status(400).json({
            message:"item with id is not existed" });
    }
});

app.use(errorHandler);


app.delete('/api/todo', (req,res) =>{
    // const {todoName}=req.body;
    // const filteredTodo=todoList.filter((todo)=> todo.name!==todoName);
    // todoList=filteredTodo;
    // res.json(todoList);
    // console.log("filteed todo", todoList);
    const {id}= req.body;
    const todoIndex=todoList.findIndex((item)=>item.id===id)
    if(todoIndex!==-1){
        todoList.splice(todoIndex,1);
        return res.json(todoList);
    }
    res.status(404).json({
        message:"item does not exist",
    });
});

app.all("*", (req,res)=>{
    res.status(404).json({
        message: "The page does nto exist"
    })
});

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

