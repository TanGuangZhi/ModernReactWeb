/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import KanbanBoard from "./KanbanBoard";
import { KanbanCard } from "./KanbanCard";
import { KanbanNewCard } from "./KanbanNewCard";
import { KanbanColumn } from "./KanbanColumn";
import { UseMemoExample } from "./test/UseMemoExample";

const COLUMN_BG_COLORS = {
  todo: "#C9AF97",
  ongoing: "#FFE799",
  done: "#C0E8BA",
};

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [num, setNum] = useState("0");
  const [num2, setNum2] = useState("0");
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

  const useMemoTest = useMemo(() => {
    const n = parseInt(num, 10);
    console.log("useMemo", n);
  }, [num]);

  const useMemoTest_useEffect = useEffect(() => {
    const n = parseInt(num, 10);
    console.log("useEffect", n);
  }, [num]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/* <UseMemoExample /> */}
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
        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.ongoing}
          title={
            <>
              进行中
              {/* <button onClick={() => setNum(() => 1 + num)} disabled={showAdd}>
                useMemoTest
              </button>
              <button
                onClick={() => setNum2(() => 1 + num2)}
                disabled={showAdd}
              >
                useMemoTest_useEffect
              </button> */}
            </>
          }
        >
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
