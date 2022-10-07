import Head from "next/head";
import type { NextPage } from "next";
import css from "../styles/Home.module.css";
import { ChangeEvent, useState } from "react";
import { ITask } from "../interfaces";
import TodoTask from "../components/TodoTask";

const Home: NextPage = () => {
  const [task, setTask] = useState<string | null>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoLists, setTodoLists] = useState<ITask[]>([]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addItem = (): void => {
    if (!task || deadline !== 0) return;
    const newItem = {
      taskName: task,
      deadline,
      id: new Date().getTime().toString(),
    };
    setTodoLists([...todoLists, newItem]);
    setDeadline(0);
    setTask("");
  };

  const deleteItem = (id: string): void => {
    setTodoLists((prev): ITask[] => {
      prev = prev.filter((task) => task.id !== id);
      return prev;
    });
  };

  return (
    <div>
      <Head>
        <title>TODOLIST APP</title>
      </Head>
      <main className={css.container}>
        <header className={css.header}>
          <div className={css.flexContainer}>
            <div className={css.inputsContainer}>
              <input
                type="text"
                value={task}
                name="task"
                onChange={handleChange}
                placeholder="task ..."
              />
              <input
                type="number"
                value={deadline}
                name="deadline"
                min="0"
                className="deadline (in days)..."
                onChange={handleChange}
              />
            </div>
            <div className={css.buttonContainer}>
              <button onClick={addItem}>Add Task</button>
            </div>
          </div>
        </header>

        <section className={css.todoContainer}>
          {todoLists.map((task: ITask, index: number) => (
            <TodoTask key={index} {...task} deleteItem={deleteItem} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
