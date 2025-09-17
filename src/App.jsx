import "./components/todo/todo.css";
import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg";

const App = () => {
  const hoidanit = "Eric";

  const age = 25;

  const data = {
    address: "Hanoi",
    country: "VietNam"
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData name={hoidanit} age={age} data={data} />
      <div className="todo-image">
        <img className="logo" src={reactLogo} />
      </div>
    </div>
  )
}

export default App;
