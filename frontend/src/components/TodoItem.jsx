// src/components/TodoItem.js
import React from 'react';

function TodoItem({ todo }) {
  return (
    <li className="todo-item">
      <div>
        <strong>{todo.title}</strong>
        <p>{todo.content}</p>
        <span>{todo.completed ? '완료' : '진행중'}</span>
      </div>
      <div>
        <button>삭제</button>
        <button>수정</button>
      </div>
    </li>
  );
}

export default TodoItem;
