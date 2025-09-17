const TodoNew = ({ addNewTodo }) => {
    // console.log(">>> check props: ", props)

    // props.addNewTodo("Eric");

    const handleClick = () => {
        alert("click me")
    }

    const handleOnChange = (name) => {
        console.log("handleOnChange", name)
    }

    return (
        <div className="todo-new">
            <input type="text" placeholder="Enter your task" onChange={(event) => handleOnChange(event.target.value)} />
            <button className="todo-btn" style={{ cursor: "pointer" }} onClick={handleClick}>Add</button>
        </div>
    );
}

export default TodoNew;