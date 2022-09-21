/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import logo from "./logo.svg";
import "./App.css";
import KanbanBoard from "./KanbanBoard";
import { KanbanCard } from "./KanbanCard";
import { KanbanNewCard } from "./KanbanNewCard";

const KanbanColumn = ({ children, bgColor, title }) => {
  return (
    <section
      css={css`
        flex: 1 1;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        border-radius: 1rem;
        background-color: ${bgColor};

        & > h2 {
          margin: 0.6rem 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid gray;

          & > button {
            float: right;
            margin-top: 0.2rem;
            padding: 0.2rem 0.5rem;
            border: 0;
            border-radius: 1rem;
            height: 1.8rem;
            line-height: 1rem;
            font-size: 1rem;
          }
        }

        & > ul {
          flex: 1;
          flex-basis: 0;
          margin: 1rem;
          padding: 0;
          overflow: auto;
        }
      `}
    >
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};
const COLUMN_BG_COLORS = {
  todo: "#C9AF97",
  ongoing: "#FFE799",
  done: "#C0E8BA",
};

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "2022-05-22 18:15" },
    { title: "开发任务-3", status: "2022-06-22 18:15" },
    { title: "开发任务-5", status: "2022-07-22 18:15" },
    { title: "测试任务-3", status: "2022-07-23 18:15" },
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
  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toString() },
      ...currentTodoList,
    ]);
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
          bgColor={COLUMN_BG_COLORS.todo}
          title={
            <>
              待处理
              <button onClick={handleAdd} disabled={showAdd}>
                &#8853; 添加新卡片
              </button>
            </>
          }
        >
          {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
          {todoList.map((props) => (
            <KanbanCard key={props.title} {...props} />
          ))}
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title="进行中">
          {ongoingList.map((props) => (
            <KanbanCard key={props.title} {...props} />
          ))}
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title="已完成">
          {doneList.map((props) => (
            <KanbanCard key={props.title} {...props} />
          ))}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
