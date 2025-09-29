const TodoData = ({ todoList, deleteTodo }) => {

    const handleClick = (id) => {
        deleteTodo(id);
    }

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item ${index}`} key={item.id}>
                        <div>{item.name}</div>
                        <button onClick={() => handleClick(item.id)}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
}

export default TodoData;