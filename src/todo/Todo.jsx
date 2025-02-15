import { useState } from 'react'
import TodoItem from './TodoItem';

const Todo = () => {
    const [todoTask, setTodoTask] = useState('');
    const [todoArr, setTodoArr] = useState([]);
    const [editId, setEditId] = useState(null);
    const [checkbox, setCheckBox] = useState(false);
    
    function addNewTodoTaskOrUpdateExistingOne(e) {
        e.preventDefault();
        console.log('editId: ', editId)
        
        if(editId) {
            const newTodoArr = todoArr.map((todo) => {
                if(todo.id === editId) {
                    todo.item = todoTask;
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
        setTodoTask(item);
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

    return (
        <>
            <h2>Todo Application</h2>
            
            <form onSubmit={addNewTodoTaskOrUpdateExistingOne}>
                <input 
                    type="text"
                    placeholder='Add Todo'
                    value={todoTask}
                    onChange={(e) => setTodoTask(e.target.value)}
                />
                <button>{editId ? 'Update' : 'Add'}</button>
            </form>

            {todoArr.length == 0 && <h3>Nothing's here. Add your todos.</h3>}

            <ul>
                {todoArr.map((task) => (
                    <li key={task.id}>
                        <TodoItem 
                            id={task.id}
                            item={task.item}
                            completed={task.completed}
                            handleEdit={() => editTodoItem(task.id, task.item)}
                            handleDelete={() => deleteTodoItem(task.id)}
                            handleCheckBox={() => toggleComplete(task.id)}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todo
