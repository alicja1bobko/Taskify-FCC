import React from "react";
import { createContext } from "react";
import { Actions, initialState, AppState } from "./reducer";

type StateContextType = {
  state: AppState;
  dispatch: React.Dispatch<Actions>;
};

export const StateContext = createContext<StateContextType>({
  state: initialState,
  dispatch: () => undefined,
});

export const StateContextProvider = StateContext.Provider;
export const StateContextConsumer = StateContext.Consumer;