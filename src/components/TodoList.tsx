import React, { useContext } from "react";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { StateContext } from "../context/StateContext";

export const TodoList: React.FC = () => {
  const stateContext = useContext(StateContext);
  const { state } = stateContext;
  return (
    <div className="todos">
      {state.todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};
