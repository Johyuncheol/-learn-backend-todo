import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';  // 컴포넌트별 CSS 임포트

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('투두 리스트 가져오기 실패');
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todoId}`);
      setTodos(todos.filter(todo => todo.todo_id !== todoId));
    } catch (error) {
      console.error('투두 삭제 실패');
    }
  };

  return (
    <div className="todo-list-container">
      <h2>투두 리스트</h2>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.todo_id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-title">{todo.title}</div>
            <div className="todo-buttons">
              <button onClick={() => handleDelete(todo.todo_id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
