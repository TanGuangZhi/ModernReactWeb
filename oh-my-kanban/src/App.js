/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import KanbanBoard from "./KanbanBoard";
import { KanbanColumn } from "./KanbanColumn";

const COLUMN_BG_COLORS = {
  todo: "#C9AF97",
  ongoing: "#FFE799",
  done: "#C0E8BA",
};

function App() {
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
  const handleAdd = (newAdd) => {
    setTodoList((currentTodoList) => [newAdd, ...currentTodoList]);
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
          title="待处理"
          cardList={todoList}
          onAdd={handleAdd}
          canAddNew
        ></KanbanColumn>

        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.ongoing}
          title="进行中"
          cardList={ongoingList}
        ></KanbanColumn>

        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.done}
          title="已完成"
          cardList={doneList}
        ></KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
