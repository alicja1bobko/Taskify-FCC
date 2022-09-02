import React, { useReducer } from "react";
import "./App.css";
import { initialState, TodoReducer } from "./context/reducer";
import { StateContextProvider } from "./context/StateContext";
import InputField from "./components/InputField";
import { TodoList } from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const contextValues = {
    state,
    dispatch,
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = state.todos,
      complete = state.completedTodos;
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    dispatch({
      type: "setCompletedTasks",
      payload: { active: active, complete: complete },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StateContextProvider value={contextValues}>
        <div className="App">
          <span className="heading">Taskify</span>
          <InputField />
          <TodoList />
        </div>
      </StateContextProvider>
    </DragDropContext>
  );
};
export default App;
