import React, { useContext, useRef } from "react";
import { StateContext } from "../context/StateContext";
import "./styles.css";

function InputField() {
  const stateContext = useContext(StateContext);
  const { state, dispatch } = stateContext;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
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
    </form>
  );
}

export default InputField;
