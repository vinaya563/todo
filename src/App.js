import './App.css';
import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";

function App() {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const [allTodos, setAllTodos] = useState(() => JSON.parse(localStorage.getItem('todolist')) || []);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [allCompletedTodos, setAllCompletedTodos] = useState(() => JSON.parse(localStorage.getItem('completedTodolist')) || []);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => {
        const incompleteTodos = d.filter(todo => !todo.completed);
        const completedTodos = d.filter(todo => todo.completed);
        setAllTodos(incompleteTodos);
        setAllCompletedTodos(completedTodos);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleAddTodo = () => {
    const newTodoItem = {
      title: newTitle,
      desc: newDesc
    };
    const updateTodo = [...allTodos, newTodoItem];
    setAllTodos(updateTodo);
    localStorage.setItem('todolist', JSON.stringify(updateTodo));
    setNewTitle("");
    setNewDesc("");
  };

  const handleDeleteTodo = (index, id) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleCompleteTodo = (index) => {
    const todoComplete = allTodos[index];
    const reducedTodo = allTodos.filter((_, i) => i !== index);
    const updatedComplete = [...allCompletedTodos, todoComplete];
    setAllTodos(reducedTodo);
    setAllCompletedTodos(updatedComplete);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    localStorage.setItem('completedTodolist', JSON.stringify(updatedComplete));
  };

  const handleDragStart = (index) => {
    return (event) => {
      event.dataTransfer.setData("index", index);
    };
  };

  const handleDragOver = (index) => {
    return (event) => {
      event.preventDefault();
    };
  };

  const handleDrop = (index) => {
    return (event) => {
      event.preventDefault();
      const dragIndex = parseInt(event.dataTransfer.getData("index"));
      const draggedItem = allTodos[dragIndex];
      const updatedTodos = allTodos.filter((_, i) => i !== dragIndex);
      updatedTodos.splice(index, 0, draggedItem);
      setAllTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    };
  };

  return (
    <div className="App">
      <h1> My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-inp">
          <div className="todo-input">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className="todo-input">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>
      </div>
      <div className="btn-area">
        <h1>To-do</h1>
      </div>
      <div className="container">
      <div className="todo-list">
        {allTodos.map((item, index) => (
          
          <div  className="todo-list-item"
            key={index}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
          >
            <div>
              <h3>{item.title}</h3>
            </div>
            <div>
              <MdOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title="Delete" />
              <GoThumbsup className='checkicon' onClick={() => handleCompleteTodo(index)} title="Complete" />
            </div>
          </div>
        ))}
      </div>
      <div className="todo-list2">
        <h1>Completed</h1>
        {allCompletedTodos.map((item, index) => (
       
          <div className="todo-list-item" key={index}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    
  );
}


export default App;
