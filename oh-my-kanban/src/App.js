import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "22-05-22 18:15" },
    { title: "开发任务-3", status: "22-05-22 18:15" },
    { title: "开发任务-5", status: "22-05-22 18:15" },
    { title: "测试任务-3", status: "22-05-22 18:15" },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: "开发任务-4", status: "2022-05-22 18:15" },
    { title: "开发任务-6", status: "2022-06-22 18:15" },
    { title: "测试任务-2", status: "2022-07-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState([
    { title: "开发任务-2", status: "2022-06-24 18:15" },
    { title: "测试任务-1", status: "2022-07-03 18:15" },
  ]);

  const LiCard = ({ title, status }) => {
    return (
      <li className="kanban-card">
        <div className="card-title">{title}</div>
        <div className="card-status">{status}</div>
      </li>
    );
  };

  const LiCard_addNew = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const handleChange = (evt) => {
      setTitle(evt.target.value);
    };
    const handleKeyDown = (evt) => {
      if (evt.key === "Enter") {
        onSubmit(title);
      }
    };
    return (
      <li className="kanban-card">
        <h3>add new card</h3>
        <div className="card-title">
          <input
            type="text"
            value={title}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </div>
      </li>
    );
  };

  const KanbanBoard = ({ children }) => (
    <main className="kanban-board">{children}</main>
  );

  const KanbanColumn = ({ children, className, title }) => {
    const combinedClassName = `kanban-column ${className}`;
    return (
      <section className={combinedClassName}>
        <h2>{title}</h2>
        <ul>{children}</ul>
      </section>
    );
  };

  const handleSubmit = (title) => {
    setTodoList([{ title, status: new Date().toDateString() }, ...todoList]);
    setShowAdd(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <KanbanBoard>
        <KanbanColumn
          className="column-todo"
          title={
            <>
              <span>todo</span>
              <button
                disabled={showAdd}
                onClick={() => {
                  setShowAdd(true);
                }}
              >
                &#8853; 添加新卡片
              </button>
            </>
          }
        >
          {showAdd && <LiCard_addNew onSubmit={handleSubmit} />}
          {todoList.map((item) => {
            return <LiCard {...item} key={item.title} />;
          })}
        </KanbanColumn>

        <KanbanColumn className="column-ongoing" title="ongoing">
          {ongoingList.map((item) => {
            return <LiCard {...item} key={item.title} />;
          })}
        </KanbanColumn>

        <KanbanColumn className="column-done" title="done">
          {doneList.map((item) => {
            return <LiCard {...item} key={item.title} />;
          })}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
