import { createRoot } from 'react-dom/client'
import './index.css'
import Todo from './todo/Todo'
import TodoV1 from './todoV1/Todo'
import TodoV2 from './todoV2/Todo'

createRoot(document.getElementById('root')).render(
  // <Todo />
  // <TodoV1 />
  <TodoV2 />
)
