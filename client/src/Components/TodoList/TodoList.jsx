import React from 'react';
import './TodoList.css';
import TodoEdit from '../TodoInput/TodoEdit';

const TodoList = ({task, handleDeleteTask, handleEditTask, handleComplete, editingTask, handleSaveEdit,handleCancelEdit}) => {

  return (
    <>
    <div className='todolist-container'>
      {task.map((item)=>(
        <div className={`todo-item ${editingTask && editingTask.todo === item.todo ? 'editing' : ''}`} key={item.todo}> 
           <p onClick={() => handleComplete(item._id)} className={ item.isCompleted ? 'todo-strike' : 'todo'}>{item.todo}</p>
          <div className='edit-delete-section'>
           <img onClick={()=>handleEditTask(item)} className="edit-img" src="/images/edit.png" width="20px" height="20px" style={{objectFit:"contain"}}></img>
           <img onClick={()=> {handleDeleteTask(item._id)}} className="delete-img" src="/images/delete.png" width="20px" height="20px" style={{objectFit:"contain"}}></img>
          </div>
          
           {editingTask && editingTask.todo===item.todo && 
           (<div className='editing-popup'> <TodoEdit task={editingTask} handleSaveEdit={handleSaveEdit} handleCancelEdit ={handleCancelEdit} /> </div>)}
          </div> 
          
      ))}
    </div>
  </>
  )
}

export default TodoList;
