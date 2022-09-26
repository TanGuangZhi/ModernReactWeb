/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import KanbanBoard, {
  COLUMN_KEY_DONE,
  COLUMN_KEY_ONGOING,
  COLUMN_KEY_TODO,
} from "./KanbanBoard";
import AdminContext from "./context/AdminContext";

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
  const [isAdmin, setIsAdmin] = useState(false);
  // 对这个写法有疑问，经下面的 a-01 测试理解了, 这样写可以将变量作为 key 去使用。 2022-09-26
  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList,
  };
  const handleAdd = (column, newCard) => {
    // console.log(column, newCard);
    updaters[column]((currentStat) => [newCard, ...currentStat]);
  };
  const handleRemove = (column, cardToRemove) => {
    updaters[column]((currentStat) =>
      currentStat.filter((item) => item.title !== cardToRemove.title)
    );
  };

  const handleToggleAdmin = (evt) => {
    setIsAdmin(!isAdmin);
  };

  // ## test a-01
  // const testObj = {
  //   ["one"]: "this is 1111",
  //   ["two"]: "this is 2222",
  //   three: "this is 3333",
  //   COLUMN_KEY_DONE: "this is constant variable", // 这样写，前面的 key 是个常量
  //   [COLUMN_KEY_DONE]: "this is constant variable with []", // 这样写，前面的 key 是个变量，即“done”
  // };
  // console.log(testObj);
  // console.log(testObj["one"]);
  // console.log(testObj.three);
  // console.log(testObj.COLUMN_KEY_DONE);
  // console.log(testObj[COLUMN_KEY_DONE]);
  // console.log(testObj.done);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          我的看板
          <label>
            <input
              type="checkbox"
              value={isAdmin}
              onChange={handleToggleAdmin}
            />
            管理员模式
          </label>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AdminContext.Provider value={{ isAdmin }}>
        <KanbanBoard
          // {...(todoList, ongoingList, doneList)}
          todoList={todoList}
          ongoingList={ongoingList}
          doneList={doneList}
          onAdd={handleAdd}
          onRemove={handleRemove}
        ></KanbanBoard>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
