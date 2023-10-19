import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import "./App.css";

type Todo = {
  id: string;
  createdTimestamp: number;
  task: string;
  checked: boolean;
};

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [sorted, setSorted] = useState<string>("date");
  const todoRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (
      todoRef == null ||
      todoRef.current == null ||
      todoRef.current.value == ""
    ) {
      return;
    }

    const newTodo: Todo = {
      id: nanoid(),
      createdTimestamp: Date.now(),
      task: todoRef.current.value,
      checked: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = [...todos];
    const foundTodo = updatedTodos.find((todo) => todo.id == id);

    if (foundTodo == undefined) {
      return;
    }

    foundTodo.checked = !foundTodo.checked;
    setTodos(updatedTodos);
  };

  const sortAlphabetically = () => {
    
  }

  return (
    <>
      <div>
        <label htmlFor="todo-input">Task</label>
        <input type="text" name="todo-input" id="todo-input" ref={todoRef} />
        <input type="button" value="Add todo" onClick={addTodo} />
        <br />

        <label htmlFor="sort">Sort</label>
        <select
          name="sort"
          id="sort"
          value={sorted}
          onChange={(e) => setSorted(e.target.value)}
        >
          <option value="date">By date</option>
          <option value="alphabetical">Alphabetically</option>
        </select>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              name="todo-item"
              id="todo-item"
              checked={todo.checked}
              onChange={() => toggleTodo(todo.id)}
            />
            <label htmlFor="todo-item">{todo.task}</label>
          </li>
        )).sort()}
      </ul>
    </>
  );
}

export default App;
