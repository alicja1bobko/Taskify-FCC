import React from "react";
import { createContext, useReducer } from "react";
import { Actions, TodoReducer, initialState, AppState } from "./reducer";

const StateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
