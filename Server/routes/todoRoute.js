const express=require("express");
const router=express.Router();
const Todo=require('../models/todoModel')

router.get('/',async(req,res) =>{
    const todoList=await Todo.find();
    res.status(200).json(todoList);
})

router.post('/',async(req,res) =>{
    try {
        const {todo, isCompleted}=req.body;

           const todoItem= {
             todo:todo,
            isCompleted:isCompleted,
    }
    
        await Todo.create(todoItem);
        const allTodo = await Todo.find(); // Query 10000 // Server;
        return res.json(allTodo);
        
    } catch (error) {
        console.log(error)
    }

 

   

    // const {newtodo}=req.body;
    // if(!("newtodo" in req.body)){
    //     res.status(400).json({
    //         message:`${JSON.stringify(req.body)}: this attribute is not accepted: use newtodo}`
    //     })
    //     return;
    // }
  
})



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



router.put('/', async(req,res,next)=>{
    try {
        const { _id, todo, isCompleted } = req.body;

        const fieldsToUpdate = {
          todo,
          isCompleted,
        };
        const updatedTodo= await Todo.findByIdAndUpdate(_id, {...req.body}, {new:true});
        if (updatedTodo){
            const allTodo = await Todo.find(); // Query 10000 // Server;
             return res.json(allTodo);
        }
        
    } catch (error) {
        console.log(error)
        
    }
    validateAttributes(['id', 'name','isCompleted'] , req.body, next) 
});

router.delete('/', async(req,res) =>{
    // const {todoName}=req.body;
    // const filteredTodo=todoList.filter((todo)=> todo.name!==todoName);
    // todoList=filteredTodo;
    // res.json(todoList);
    // console.log("filteed todo", todoList);


    try {
        const {_id}= req.body;
       const deletedTodo= await Todo.findByIdAndDelete(_id);
       if(deletedTodo){
        const allTodo = await Todo.find(); // Query 10000 // Server;
        return res.json(allTodo);
       }
    } catch (error) {
        console.log(error)
    }
});

router.all("*", (req,res)=>{
    res.status(404).json({
        message: "The page does nto exist"
    })
});

module.exports=router;