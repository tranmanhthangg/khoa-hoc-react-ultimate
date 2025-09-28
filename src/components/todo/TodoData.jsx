const TodoData = ({ todoList }) => {

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item ${index}`} key={index}>
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div>
                );
            })}
        </div>
    );
}

export default TodoData;