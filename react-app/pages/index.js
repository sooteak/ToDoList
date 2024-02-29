import TodoList from "./TodoList";
import style from "../styles/header.module.css"

export default function Home() {
  return (
    <div>
      <div className={style.header}>
        <h1 className={style.title}>My To-Do-List</h1>
      </div>
      <TodoList />
    </div>

  );
}