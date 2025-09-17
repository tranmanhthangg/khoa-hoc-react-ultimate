const TodoData = ({ name, age, data }) => {
    // console.log(">>> check props: ", props)

    return (
        <div className="todo-data">
            <div>My name is: {name}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
        </div>
    );
}

export default TodoData;