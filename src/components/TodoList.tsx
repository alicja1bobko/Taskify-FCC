import React, { useContext } from "react";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { StateContext } from "../context/StateContext";
import { Droppable } from "react-beautiful-dnd";

export const TodoList: React.FC = () => {
  const stateContext = useContext(StateContext);
  const { state } = stateContext;
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {state.todos.map((todo, index) => (
              <SingleTodo index={index} todo={todo} key={todo.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {state.completedTodos.map((todo, index) => (
              <SingleTodo index={index} todo={todo} key={todo.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
