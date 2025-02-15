import { useState } from 'react'
import TodoItem from './TodoItem';

const Todo = () => {
    const [todoTask, setTodoTask] = useState('');
    const [editTodoTask, setEditTodoTask] = useState('');
    const [todoArr, setTodoArr] = useState([]);
    const [editId, setEditId] = useState(null);
    
    function addNewTodoTaskOrUpdateExistingOne(e) {
        e.preventDefault();
        console.log('editId: ', editId)
        
        if(editId) {
            const newTodoArr = todoArr.map((todo) => {
                if(todo.id === editId) {
                    todo.item = editTodoTask;
                }
                return todo;
            })
            setTodoArr(newTodoArr);
            setEditId(null);
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
        <>
            <h2>Todo Application V1</h2>
            
            <form onSubmit={addNewTodoTaskOrUpdateExistingOne}>
                <input 
                    type="text"
                    placeholder='Add Todo'
                    value={todoTask}
                    onChange={(e) => setTodoTask(e.target.value)}
                />
                <button>Add</button>
            </form>

            {todoArr.length == 0 && <h3>Nothing's here. Add your todos.</h3>}

            { todoArr.length >= 1 && <button onClick={() => setTodoArr([])}>Delete All Todos</button>}
            { todoArr.length >= 1 && !isSorted() && <button onClick={sortTodos}>Sort Todos</button>}
            <ul>
                {todoArr.map((task, index) => (
                    <li key={task.id}>
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
                ))}
            </ul>
        </>
    )
}

export default Todo
