import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/todos/')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  // Add a new todo
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      axios.post('http://127.0.0.1:8000/api/todos/add/', { title: newTodo, completed: false })
        .then(response => {
          setTodos([...todos, response.data]); // Update the list with the new todo
          setNewTodo(''); // Clear the input field
        })
        .catch(error => {
          console.error('Error adding todo:', error);
        });
    }
  };

  // Toggle completed status
  const toggleCompleted = (id) => {
    const todo = todos.find(todo => todo.id === id);
    axios.put(`http://127.0.0.1:8000/api/todos/${id}/update`, {
      ...todo,
      completed: !todo.completed
    })
      .then(response => {
        setTodos(todos.map(t => (t.id === id ? response.data : t)));
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}/delete`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id)); // Remove the deleted todo from the list
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div className="container">
      <div className="todo-app">
        <div className="app-title">
          <h2>Todo App</h2>
          <i className="fa-solid fa-book-bookmark"></i>
        </div>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="add your tasks"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul id="list-container">
          {todos.map(todo => (
            <li
              key={todo.id}
              onClick={() => toggleCompleted(todo.id)}
              className={todo.completed ? "checked" : ""}
            >
              {todo.completed ? <del>{todo.title}</del> : todo.title}
              <span onClick={() => deleteTodo(todo.id)} className="delete-btn">X</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
