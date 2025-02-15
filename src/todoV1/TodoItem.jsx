import React from 'react'

const TodoItem = ({
        id,
        item,
        completed,
        todoArrLength,
        todoArrIndex,
        handleEdit,
        handleDelete,
        handleCheckBox,
        varEditid,
        varEditTodoTask,
        varSetEditTodoTask,
        varAddNewTodoTaskOrUpdateExistingOne,
        varCancelEditTodoItem,
        varMoveTodoUp,
        varMoveTodoDown
    }) => {
    return (
        <>
            <span>
                <button onClick={varMoveTodoUp} disabled={ todoArrIndex === 0 }>⬆️</button>
                <button onClick={varMoveTodoDown} disabled={ todoArrIndex === todoArrLength-1 }>⬇️</button>
            </span>
            <input type="checkbox" checked={completed} onChange={handleCheckBox}/>
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {id} 
                -
                { (!varEditid && item) || (
                    varEditid === id && <form>
                        <input 
                            type="text"
                            value={varEditTodoTask}
                            onChange={(e) => varSetEditTodoTask(e.target.value)}
                        />
                        <button onClick={varAddNewTodoTaskOrUpdateExistingOne}>Update</button>
                        <button onClick={varCancelEditTodoItem}>Cancel</button>
                    </form>
                ) }
                -
                {completed.toString()}
            </span>
            {!varEditid && <button onClick={handleEdit}>Edit</button>}
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default TodoItem