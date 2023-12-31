import { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    const storage = localStorage.getItem("todos");
    if (storage == null) {
      return;
    }
    setTodos(JSON.parse(storage) as Array<Todo>);
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

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

    todoRef.current.value = "";
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

  const sortAlphabetically = (first: string, second: string) => {
    return first.localeCompare(second, "en-US", { sensitivity: "accent" });
  };

  const sortByDate = (first: number, second: number) => {
    return first - second;
  };

  const sortBy = (first: Todo, second: Todo) => {
    if (sorted === "alphabetical") {
      return sortAlphabetically(first.task, second.task);
    } else if (sorted === "date") {
      return sortByDate(first.createdTimestamp, second.createdTimestamp);
    } else {
      return 0;
    }
  };

  const convertTimestamp = (timestamp: number) => {
    return new Date(timestamp)
      .toISOString()
      .replace('T', ' ');
  }

  return (
    <div className="content">
      <div className="todo-wrapper">
        <div className="todo-input-wrapper">
          <div className="todo-input">
            <input
              type="text"
              name="todo-input"
              id="todo-input"
              placeholder="Input your todo..."
              maxLength={50}
              ref={todoRef}
            />
            <input type="button" value="Add todo" onClick={addTodo} />
            <br />
          </div>
          
          <div className="todo-sort">
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
        </div>

        <ul className="todos">
          {todos
            .sort((firstTodo: Todo, secondTodo: Todo) => sortBy(firstTodo, secondTodo))
            .map((todo: Todo, index: number) => (
              <div className={`todo-item ${index%2==0 ? 'even' : 'odd'}`}>
                <li key={todo.id} >
                  <input
                    type="checkbox"
                    name="todo-input"
                    id="todo-input"
                    checked={todo.checked}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <div></div>
                  <label htmlFor="todo-input">{todo.task}</label>
                </li>
                <p>{convertTimestamp(todo.createdTimestamp)}</p>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
