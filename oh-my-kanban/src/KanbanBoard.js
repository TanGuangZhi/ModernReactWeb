/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect, useContext } from "react";
import AdminContext from "./context/AdminContext";
import { css } from "@emotion/react";
import { KanbanColumn } from "./KanbanColumn";

const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;

const COLUMN_BG_COLORS = {
  todo: "#C9AF97",
  ongoing: "#FFE799",
  done: "#C0E8BA",
};

export const COLUMN_KEY_TODO = "todo";
export const COLUMN_KEY_ONGOING = "ongoing";
export const COLUMN_KEY_DONE = "done";

export default function KanbanBoard({
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onDrop,
  onRemove,
}) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = (evt) => {
    if (
      !draggedItem ||
      !dragSource ||
      !dragTarget ||
      dragSource === dragTarget
    ) {
      return;
    }
    dragSource && onRemove(dragSource, draggedItem);
    dragTarget && onAdd(dragTarget, draggedItem);
  };

  return (
    <main css={kanbanBoardStyles}>
      <KanbanColumn
        bgColor={COLUMN_BG_COLORS.todo}
        title="待处理"
        cardList={todoList}
        onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
        canAddNew
        setDraggedItem={setDraggedItem}
        setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_TODO : null)
        }
        setIsDragTarget={(isTgt) =>
          setDragTarget(isTgt ? COLUMN_KEY_TODO : null)
        }
        onDrop={handleDrop}
      ></KanbanColumn>

      <KanbanColumn
        bgColor={COLUMN_BG_COLORS.ongoing}
        title="进行中"
        setDraggedItem={setDraggedItem}
        setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)
        }
        setIsDragTarget={(isTgt) =>
          setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)
        }
        onDrop={handleDrop}
        cardList={ongoingList}
      ></KanbanColumn>

      <KanbanColumn
        bgColor={COLUMN_BG_COLORS.done}
        title="已完成"
        setDraggedItem={setDraggedItem}
        setIsDragSource={(isSrc) =>
          setDragSource(isSrc ? COLUMN_KEY_DONE : null)
        }
        setIsDragTarget={(isTgt) =>
          setDragTarget(isTgt ? COLUMN_KEY_DONE : null)
        }
        onDrop={handleDrop}
        onRemove={onRemove.bind(null, COLUMN_KEY_DONE)}
        cardList={doneList}
      ></KanbanColumn>
    </main>
  );
}
