import React, { useEffect, useState } from 'react'
import './Todo.css';
import TodoInput from './TodoInput/TodoInput';
import TodoList from './TodoList/TodoList';
import axios from "axios";

const Todo = () => {
  const [task, setTask] =useState([]);
  const [newTask, setNewtask]=useState("");
  const [editingTask, setEditingTask]=useState(null);
  const API_URL="http://localhost:3055/api/todo";
  const [editingId, setEditingId]=useState("");
  
  const fetchTodo=async()=>
  {
    try 
    {
      const response=await axios(API_URL);
      setTask(response.data);
    } 
    catch (error)
    {
      console.log(error)
    }
  }

  useEffect(()=>{

    fetchTodo();

  },[]);

//POST
  const handleAddClick =async()=> {
  try
  {
    if(newTask)
    {
    const response=await axios(API_URL, {
      method:"POST",
      data:{
        newtodo:newTask,
      }})
      setTask(response.data);
    } 
  }
   catch (error) {
    console.error(error);
    
  }

  };
  const handleChange=(event)=>{
    setNewtask(event.target.value);
  };


  //Delete
  const handleDeleteTask = async(id)=>{
    try {
      const response=await axios(API_URL, {
        method:"DELETE",
       data:{
        id:id,
       }
      });
      setTask(response.data);
      
    } catch (error) {
      console.error(error.response.data);
      
    }
    
  }

  
// edit mode 

  const handleEditTask= async(editTodo) => {
    // console.log(editTodo.id);
    setEditingId(editTodo.id);
    setEditingTask(editTodo);
    // const editTodo=task.find((todo)=>todo.id ===editingTask.id )
  }
//PUT
  const handleSaveEdit = async(updatedTask)=> {
    console.log("updated Task", updatedTask)
    try {
      const response=await axios(API_URL, {
        method:"PUT",
        data:{
          id:editingId,
          name:updatedTask,
          isCompleted:false,
        }
      })
      setTask(response.data);
      setEditingTask(null);   
    } 
    catch (error) 
    {
      console.log(error.response.data); 
    }

  }

  const handleCancelEdit =()=>{
    setEditingTask(null);
  }

  const handleComplete =(id)=>
    {
     const newList= task.map((todo)=> {
      if(todo.id===id){ 
        return {...todo, isCompleted: !todo.isCompleted}
    }
  else
  {
    return {...todo};
  }})
    setTask(newList);
    }

  return (
    <div className='todo-container'>
     <h1>Todo List</h1>
     <TodoInput task={task} newTask={newTask} handleAddClick={handleAddClick} handleChange={handleChange}/>
     <TodoList task={task} 
     handleDeleteTask={handleDeleteTask} 
     editingTask={editingTask}
     handleEditTask={handleEditTask} 
     handleComplete={handleComplete}
     handleSaveEdit={handleSaveEdit} 
     handleCancelEdit ={handleCancelEdit}/>
    </div>
  )
}
export default Todo
 