import { useState } from "react";

const TodoNew = ({ addNewTodo }) => {
    const [valueInput, setValueInput] = useState("Eric");

    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input
                type="text"
                onChange={(event) => handleOnChange(event.target.value)}
                value={valueInput}
            />
            <button className="todo-btn" style={{ cursor: "pointer" }} onClick={handleClick}>Add</button>
            <div>My text input is: {valueInput}</div>
        </div>
    );
}

export default TodoNew;