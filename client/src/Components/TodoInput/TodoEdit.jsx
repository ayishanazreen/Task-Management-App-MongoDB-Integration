import React, { useState } from 'react';
import './TodoEdit.css';


const TodoEdit = ({task, handleSaveEdit, handleCancelEdit}) => {
    const [editedTask, setEditedTask]= useState(task.todo);
  return (
    <div className='edit-container'>
      <div className='task-edit-container'>
            <input type='text' value={editedTask} onChange={(e)=>setEditedTask(e.target.value)}/>
            <div className='task-edit-btn-section'>
            <button onClick={()=>handleSaveEdit(editedTask)}>Save</button>
            <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
            </div>
    </div>
  )
}

export default TodoEdit
