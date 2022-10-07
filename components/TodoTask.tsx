import React, { FC } from "react";
import { ITask } from "../interfaces";
import css from "../styles/TodoTask.module.css";

export interface Props {
  id: string;
  taskName: string;
  deadline: number;
  deleteItem: (id: string) => void;
}

const TodoTask: FC<Props> = ({ id, taskName, deadline, deleteItem }) => {
  return (
    <article className={css.task}>
      <div className={css.taskName}>{taskName}</div>
      <div className={css.deadline}>{deadline}</div>
      <button
        className={css.deleteBtn}
        onClick={(): void => {
          deleteItem(id);
        }}
      >
        X
      </button>
    </article>
  );
};

export default TodoTask;
