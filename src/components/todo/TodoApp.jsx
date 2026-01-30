import TodoData from './TodoData';
import TodoNew from './TodoNew';
import reactLogo from '../../assets/react.svg';
import { useState } from 'react';

const TodoApp = () => {
    const [todoList, setTodoList] = useState([]);

    // Hàm thêm 1 name mới vào danh sách
    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 1000000),
            name: name
        };
        setTodoList([...todoList, newTodo]);
    }

    // Hàm tạo id ngẫu nhiên cho mỗi tên
    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Hàm xóa tên trong danh sách
    const deleteTodo = (id) => {
        setTodoList(todoList.filter((item) => item.id !== id));
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew addNewTodo={addNewTodo} />
            {todoList.length > 0 ?
                <TodoData todoList={todoList} deleteTodo={deleteTodo} />
                :
                <div className="todo-image">
                    <img className="logo" src={reactLogo} />
                </div>
            }
        </div>
    );
}

export default TodoApp;