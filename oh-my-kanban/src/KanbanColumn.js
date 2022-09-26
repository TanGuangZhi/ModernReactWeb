/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect } from "react";
import { css } from "@emotion/react";
import { KanbanCard } from "./KanbanCard";
import { KanbanNewCard } from "./KanbanNewCard";

const kanbanColumnStyles = css`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 1rem;

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
`;

export const KanbanColumn = ({
  children,
  bgColor,
  title,
  canAddNew,
  cardList = [],
  onDrop,
  onAdd,
  setDraggedItem,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (evt) => {
    setShowAdd(true);
  };

  const handleSubmit = (title) => {
    onAdd && onAdd(title);
    setShowAdd(false);
  };
  return (
    <section
      css={css`
        ${kanbanColumnStyles}
        background-color: ${bgColor};
      `}
    >
      <h2>
        {title}
        {canAddNew && (
          <button onClick={handleAdd} disabled={showAdd}>
            &#8853; 添加新卡片
          </button>
        )}
      </h2>
      {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
      <ul>
        {children}
        {cardList.map((item) => (
          <KanbanCard
            key={item.title}
            onDragStart={() => {
              setDraggedItem && setDraggedItem(item);
            }}
            {...item}
          />
        ))}
      </ul>
    </section>
  );
};
