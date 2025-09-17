import { useState } from "react";

const TodoNew = ({ addNewTodo }) => {
    const [valueInput, setValueInput] = useState("Eric");

    // console.log(">>> check props: ", props)

    // props.addNewTodo("Eric");

    const handleClick = () => {
        alert("click me");
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }

    return (
        <div className="todo-new">
            <input type="text" placeholder="Enter your task" onChange={(event) => handleOnChange(event.target.value)} />
            <button className="todo-btn" style={{ cursor: "pointer" }} onClick={handleClick}>Add</button>
            <div>My text input is: {valueInput}</div>
        </div>
    );
}

export default TodoNew;