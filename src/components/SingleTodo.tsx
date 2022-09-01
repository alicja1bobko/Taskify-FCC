import React, { useState, useRef, useEffect, useContext } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { StateContext } from "../context/StateContext";

interface Props {
  todo: Todo;
  key: number;
}

const SingleTodo = ({ todo, key }: Props) => {
  const stateContext = useContext(StateContext);
  const { dispatch } = stateContext;

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
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
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
  );
};

export default SingleTodo;
