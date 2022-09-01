import React, { useReducer } from "react";
import "./App.css";
import "./components/styles.css";

import { initialState, TodoReducer } from "./context/reducer";
import { StateContextProvider } from "./context/StateContext";
import InputField from "./components/InputField";
import SingleTodo from "./components/SingleTodo";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const contextValues = {
    state,
    dispatch,
  };
  return (
    <StateContextProvider value={contextValues}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField />
        <TodoList />
      </div>
    </StateContextProvider>
  );
};

export default App;
