import { ChevronUp, ChevronDown, Pencil, Trash, Check, X } from 'lucide-react'
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
            <span className='flex flex-col items-center'>
                <button className='hover:bg-gray-500 hover:rounded-lg hover:cursor-pointer hover:text-black' onClick={varMoveTodoUp} disabled={ todoArrIndex === 0 }><ChevronUp /></button>
                <button className='hover:bg-gray-500 hover:rounded-lg hover:cursor-pointer hover:text-black' onClick={varMoveTodoDown} disabled={ todoArrIndex === todoArrLength-1 }><ChevronDown /></button>
            </span>
            { varEditid !== id && <div className='bg-yellow-500 p-2 rounded-lg flex justify-center items-center'><input className='size-5' type="checkbox" checked={completed} onChange={handleCheckBox}/></div>}
            <div className='text-2xl items-center flex-1' style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {/* {id} */}
                {/* - */}
                { ((!varEditid || varEditid !== id) && <div className='pb-1'>{item}</div> ) || (
                    varEditid === id &&
                        <form className='flex justify-between items-center gap-2'>
                            <input 
                                type="text"
                                value={varEditTodoTask}
                                onChange={(e) => varSetEditTodoTask(e.target.value)}
                                className='pl-1 pb-1 bg-gray-800 flex-1 focus:outline-none ring-1 rounded-lg ring-gray-500'
                            />
                            <button className='p-1 ring-1 ring-green-500 rounded-lg hover:bg-green-500 hover:text-black hover:cursor-pointer' onClick={varAddNewTodoTaskOrUpdateExistingOne}><Check /></button>
                            <button className='p-1 ring-1 ring-red-500 rounded-lg hover:bg-red-500 hover:text-black hover:cursor-pointer' onClick={varCancelEditTodoItem}><X /></button>
                        </form>
                ) }
                {/* - */}
                {/* {completed.toString()} */}
            </div>
            <div className='flex justify-center gap-2 items-center'>
                {(varEditid !== id) && <button className='p-1 ring-1 ring-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black hover:cursor-pointer' onClick={handleEdit}><Pencil/></button>}
                <button className='p-1 ring-1 ring-red-500 rounded-lg hover:bg-red-500 hover:text-black hover:cursor-pointer' onClick={handleDelete}><Trash /></button>
            </div>
        </>
    )
}

export default TodoItem
