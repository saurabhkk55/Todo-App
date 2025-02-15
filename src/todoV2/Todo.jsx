import { useState } from 'react'
import TodoItem from './TodoItem';
import { Plus, Trash, Fish } from 'lucide-react';

const Todo = () => {
    const [todoTask, setTodoTask] = useState('');
    const [editTodoTask, setEditTodoTask] = useState('');
    const [todoArr, setTodoArr] = useState([]);
    const [editId, setEditId] = useState(null);
    const [completedTodoCount, setCompletedTodoCount] = useState(0);
    
    function addNewTodoTaskOrUpdateExistingOne(e) {
        e.preventDefault();
        console.log('editId: ', editId)
        console.log('todoTask: ', todoTask)
        
        if(editId) {
            if(editTodoTask) {
                const newTodoArr = todoArr.map((todo) => {
                    if(todo.id === editId) {
                        todo.item = editTodoTask;
                    }
                    return todo;
                })
                setTodoArr(newTodoArr);
                setEditId(null);
            } else {
                console.log('Please fill out the field.')
            }
        } else {
                const newTodoItem = {id: todoArr.length+1, item: todoTask, completed: false}
                setTodoArr([...todoArr, newTodoItem]);
        }
        setTodoTask('');
    }

    function deleteTodoItem(taskId) {
        const newTodoArr = todoArr.filter((item) => {
            if(item.id !== taskId) {
                return item;
            }
            return;
        });
        setTodoArr(newTodoArr);
    }

    function editTodoItem(id, item) {
        setEditId(id);
        setEditTodoTask(item);
        
        const newTodoArr = todoArr.map((todo) => {
            if(todo.id === id ) {
                todo.completed = false;
            }
            return todo;
        })
        setTodoArr(newTodoArr);
    }

    function cancelEditTodoItem(e) {
        e.preventDefault();
        setEditId(null);
        setEditTodoTask('');
    }

    function toggleComplete(id) {
        const newTodoArr = todoArr.map((todo) => {
            if(todo.id == id) {
                console.log('todo.id: ', todo.id);
                console.log('todo.item: ', todo.item);
                console.log('todo.completed: ', todo.completed);

                if(todo.completed === false) {
                    setCompletedTodoCount((prevCompletedTodoCount) => prevCompletedTodoCount + 1);
                } else {
                    setCompletedTodoCount((prevCompletedTodoCount) => prevCompletedTodoCount - 1);
                }

                todo.completed = todo.completed ? false : true;
            }
            return todo;
        });
        setTodoArr(newTodoArr);
    }

    function moveTodoUp(id) {
        const index = todoArr.findIndex(todo => todo.id === id);
        console.log('index: ', index);
        
        if(index > 0) {
            const newTodoArr = [...todoArr];
            [newTodoArr[index], newTodoArr[index-1]] = [newTodoArr[index-1], newTodoArr[index]];
            setTodoArr(newTodoArr);
        } else {
            console.log('Already at the top!');
        }
    }

    function moveTodoDown(id) {
        const index = todoArr.findIndex(todo => todo.id === id);
        console.log('index: ', index);
        
        if(index !== todoArr.length-1) {
            const newTodoArr = [...todoArr];
            [newTodoArr[index], newTodoArr[index+1]] = [newTodoArr[index+1], newTodoArr[index]];
            setTodoArr(newTodoArr);
        } else {
            console.log('Already at the bottom!');
        }
    }

    function sortTodos() {
        const newTodoArr = [...todoArr];
        newTodoArr.sort((a, b) => a.item.localeCompare(b.item));
        setTodoArr(newTodoArr);
    }

    function isSorted() {
        for (let i = 0; i < todoArr.length - 1; i++) {
            if (todoArr[i].item.localeCompare(todoArr[i + 1].item) > 0) {
                return false; // Found an unsorted pair
            }
        }
        return true; // Already sorted
    }

    return (
        <div className='m-10 p-2 space-y-6'>            
            <h1 className='text-yellow-500 text-4xl text-center font-bold'>Todo Application V2</h1>
            
            <form className='p-2 text-center bg-gray-700 flex justify-between gap-2 rounded-lg'
                onSubmit={addNewTodoTaskOrUpdateExistingOne}>
                <input 
                    type="text"
                    placeholder='Add Todo here...'
                    value={todoTask}
                    onChange={(e) => setTodoTask(e.target.value)}
                    required
                    className='flex-1 focus:outline-none'
                />
                <button className='p-2 bg-yellow-500 text-black rounded-lg hover:cursor-pointer hover:bg-yellow-300'><Plus /></button>
            </form>

            {todoArr.length !== 0 && <p className='mt-12  text-2xl font-bold text-right text-gray-400'>Todo completed: {todoArr.length !== 0 ? completedTodoCount : todoArr.length} / {todoArr.length}</p>}

            {todoArr.length === 0 && <h3 className='mt-32 flex flex-col items-center gap-4 font-bold text-gray-500'><Fish className='size-40' />Nothing's here. Add your todos.</h3>}

            <div className='mt-12 flex justify-center items-center gap-2'>
                { todoArr.length >= 1 && !isSorted() && <button onClick={sortTodos}
                    className='px-2 py-1 ring-1 ring-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black hover:cursor-pointer'
                >Sort Todos</button>}
                { todoArr.length >= 1 && <button onClick={() => setTodoArr([])}
                    className='px-2 py-1 ring-1 ring-red-500 rounded-lg flex justify-center items-center gap-2 hover:bg-red-500 hover:text-black hover:cursor-pointer'
                ><Trash className="w-3 h-3"/>Delete All Todos</button>}
            </div>
            
            <ul className='mt-20'>
                {todoArr.map((task, index) => (
                    <div key={task.id} className='py-5 border-t-2 border-gray-500'>
                        <li className='p-2 flex items-center gap-2 hover:bg-gray-800 hover:rounded-lg'>
                        <TodoItem 
                            id={task.id}
                            item={task.item}
                            completed={task.completed}
                            todoArrLength={todoArr.length}
                            todoArrIndex={index}
                            handleEdit={() => editTodoItem(task.id, task.item)}
                            handleDelete={() => deleteTodoItem(task.id)}
                            handleCheckBox={() => toggleComplete(task.id)}
                            varEditid={editId}
                            varEditTodoTask={editTodoTask}
                            varSetEditTodoTask={setEditTodoTask}
                            varAddNewTodoTaskOrUpdateExistingOne={addNewTodoTaskOrUpdateExistingOne}
                            varCancelEditTodoItem={cancelEditTodoItem}
                            varMoveTodoUp={() => moveTodoUp(task.id)}
                            varMoveTodoDown={() => moveTodoDown(task.id)}
                        />
                        </li>
                    </div>
                    
                ))}
            </ul>
        </div>
    )
}

export default Todo
