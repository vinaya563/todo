
import './App.css';
import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { GoThumbsup } from "react-icons/go";
function App() {
  const [allTodos, setAllTodos] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [allCompletedTodos, setAllCompletedTodos] = useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      desc: newDesc
    };
    let updateTodo = [...allTodos];
    updateTodo.push(newTodoItem);
    setAllTodos(updateTodo);
    localStorage.setItem('todolist', JSON.stringify(updateTodo));

  };

  const handleDeleteTodo =( index,id) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);

  };
  const handleCompleteTodo = (index, id) => {
    const todoComplete = allTodos[index];
    let reducedTodo = [...allTodos];

    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
    let newTodoItem = {
      title: todoComplete.title,
      desc: todoComplete.desc
    };
let updatedComplete=[...allCompletedTodos];
    updatedComplete.push(newTodoItem);
    setAllCompletedTodos(updatedComplete);
    localStorage.setItem('completed todolist', JSON.stringify(updatedComplete));


  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
  }, [])
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('completed todolist'));
    if (savedTodo) {
      setAllCompletedTodos(savedTodo);
    }
  }, [])
  return (
    <div className="App">
      <h1> My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-inp">
          <div className="todo-input">

            <label>Title</label>
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Whats the task title?" />



          </div>
          <div className="todo-input">

            <label>Description</label>
            <input type="text" value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Whats the task description?" />



          </div>
          <div className="todo-input">

            <button type="button" onClick={ handleAddTodo} className="primaryBtn">Add</button>

          </div>
        </div>
      </div>
      <div className="btn-area">
        <h1>To-do  </h1>
      </div>
      <div className="todo-list" >
        {allTodos.map((item, index) => {

          return (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div>
                <MdOutlineDelete className='icon' onClick={() => handleDeleteTodo(index,item.id)} title="do u want to delete it" />
                <GoThumbsup className='checkicon' onClick={() => handleCompleteTodo(index, item.id)}  title="do u want to complete it" />
              </div>
            </div>
          )
        })};
      </div>
      <div className="todo-list" >
        <h1>Completed </h1>
        {allCompletedTodos.map((item, index) => {

          return (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              
            </div>
          )
        })};
      </div>
    </div >
  );
}

export default App;
