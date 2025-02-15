import React from 'react'

const TodoItem = ({id, item, completed, handleEdit, handleDelete, handleCheckBox}) => {
    return (
        <>
            <input type="checkbox" checked={completed} onChange={handleCheckBox}/>

            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {id} - {item} - {completed.toString()}
            </span>
            
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default TodoItem