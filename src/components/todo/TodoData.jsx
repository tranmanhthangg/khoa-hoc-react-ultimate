const TodoData = ({ name, age, data, todoList }) => {

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item">
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div>
                );
            })}
            <div>{JSON.stringify(todoList)}</div>
        </div>
    );
}

export default TodoData;