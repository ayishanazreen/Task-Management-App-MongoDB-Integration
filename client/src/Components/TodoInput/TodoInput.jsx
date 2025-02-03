import React, {useEffect} from 'react';
import './TodoInput.css';

const TodoInput = ({ newTask, handleAddClick, handleChange}) => {

  return (
    <div className='todo-input-container'>
      <input type="text" placeholder='Add your task...' onChange={handleChange} value={newTask}/> 
      <button onClick={handleAddClick}>ADD TODO</button>
    </div>
  )
}

export default TodoInput
