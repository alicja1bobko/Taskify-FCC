import React, { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import "./components/styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { initialState, TodoReducer } from "./context/reducer";
import { StateContextProvider } from "./context/StateContext";
import InputField from "./components/InputField";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const contextValues = {
    state,
    dispatch,
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>("");

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({ type: "edit", payload: { id: id, text: editTodo } });
    setEdit(false);
  };

  useEffect(() => {
    taskRef.current?.focus();
  }, [edit]);

  const taskRef = useRef<HTMLInputElement>(null);

  return (
    <StateContextProvider value={contextValues}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField />
        {/* <form
          className="input"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "add", payload: state.todo });
            inputRef.current?.blur();
          }}
        >
          <input
            ref={inputRef}
            type="input"
            placeholder="Enter a task"
            className="input__box"
            value={state.todo}
            onChange={(e) => {
              dispatch({ type: "updateInputText", payload: e.target.value });
            }}
          />
          <button className="input__submit" type="submit">
            Go
          </button>
        </form> */}
        {/* end of input field */}
        {/* todo list */}
        <div className="todos">
          {state.todos.map((todo) => (
            <form
              className="todos__single"
              onSubmit={(e) => handleEdit(e, todo.id)}
              //handleEdit(e, todo.id)}
            >
              {edit ? (
                <input
                  ref={taskRef}
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="todos__single--text"
                />
              ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
              ) : (
                <span className="todos__single--text">{todo.todo}</span>
              )}

              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiFillEdit />
              </span>
              <span
                className="icon"
                onClick={() => dispatch({ type: "remove", payload: todo.id })}
              >
                <AiFillDelete />
              </span>
              <span
                className="icon"
                onClick={() => dispatch({ type: "done", payload: todo.id })}
              >
                <MdDone />
              </span>
            </form>
          ))}
        </div>
      </div>
    </StateContextProvider>
  );
};

export default App;
