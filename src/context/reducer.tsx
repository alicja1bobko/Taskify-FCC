import { Todo } from "../model";
// import { AppState } from "./StateContext";

export type AppState = {
  todo: string;
  todos: Todo[];
  completedTodos: Todo[];
};

export const initialState: AppState = {
  todo: "",
  todos: [
    {
      id: 1,
      todo: "take out trash",
      isDone: true,
    },
  ],
  completedTodos: [],
};

export type Actions =
  | {
      type: "add";
      payload: string;
    }
  | {
      type: "remove";
      payload: number;
    }
  | {
      type: "done";
      payload: number;
    }
  | {
      type: "edit";
      payload: {
        text: string;
        id: number;
      };
    }
  | {
      type: "updateInputText";
      payload: string;
    }
  | {
      type: "setCompletedTasks";
      payload: {
        active: Todo[];
        complete: Todo[];
      };
    };

export const TodoReducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        todo: "",
        todos: [
          ...state.todos,
          { id: Date.now(), todo: action.payload, isDone: false },
        ],
      };
    case "remove":
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      };

    case "done":
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, isDone: !todo.isDone }
              : todo
          ),
        ],
      };
    case "edit":
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, todo: action.payload.text }
              : todo
          ),
        ],
      };
    case "updateInputText":
      return {
        ...state,
        todo: action.payload,
        todos: state.todos,
      };
    case "setCompletedTasks":
      return {
        ...state,
        todos: action.payload.active,
        completedTodos: action.payload.complete,
      };
    default:
      return state;
  }
};
