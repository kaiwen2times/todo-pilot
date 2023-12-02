import React, { useState } from 'react';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      if (editingIndex === -1) {
        setTodos([...todos, newTodo]);
      } else {
        todos[editingIndex] = newTodo;
        setTodos([...todos]);
        setEditingIndex(-1);
      }
      setNewTodo('');
    }
  };

  const editTodo = (index) => {
    setNewTodo(todos[index]);
    setEditingIndex(index);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>{editingIndex === -1 ? 'Add' : 'Update'}</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Newtab;
