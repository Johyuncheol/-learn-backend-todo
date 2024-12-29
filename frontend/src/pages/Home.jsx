// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';
import './Home.css';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {

      try {
        const response = await axios.get('http://localhost:8080/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="home-container">
      <h2>Your Todo List</h2>
      <TodoList todos={todos} />
    </div>
  );
}

export default Home;
