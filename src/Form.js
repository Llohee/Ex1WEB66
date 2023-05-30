import React, { useState, useEffect } from "react";
import { Icon } from 'react-icons-kit'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { trash } from 'react-icons-kit/feather/trash'
import './style.css'
const getTodosFromLS = () => {
  const data = localStorage.getItem('Todos');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Form = () => {
  const [todoValue, setTodoValue] = useState('');
  const [id, setId] = useState();
  const [editForm, setEditForm] = useState(false);
  const [todos, setTodos] = useState(getTodosFromLS());

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const time = date.getTime();
    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false
    }
    setTodos([...todos, todoObject]);
    setTodoValue('');
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    let items = [...todos];
    let item = items[id];
    item.TodoValue = todoValue;
    item.completed = false;
    items[id] = item;
    setTodos(items);
    setEditForm(false);
    setTodoValue('');
  }
  const handleEdit = (todo, index) => {
    setEditForm(true);
    setTodoValue(todo.TodoValue);
    setId(index);
  }
  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.ID !== id
    });
    setTodos(filtered);
  }

  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.completed === false) {
          todo.completed = true;
        }
        else if (todo.completed === true) {
          todo.completed = false;
        }
      }
      todoArray.push(todo);
      setTodos(todoArray);
    })
  }

  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos])

  return (
    <>
      {todos.length > 0 && (
        <>
          {todos.map((individualTodo, index) => (
            <div className='todo-item-container' key={individualTodo.ID}>
              <div>
                {editForm === false && (
                  <input type='checkbox' checked={individualTodo.completed}
                    onChange={() => handleCheckbox(individualTodo.ID)} />
                )}
                <span
                  style={individualTodo.completed === true ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{individualTodo.TodoValue}</span>
              </div>
              {editForm === false && (
                <div className='edit-and-delete'>
                  <div style={{ marginRight: 7 + 'px' }}
                    onClick={() => handleEdit(individualTodo, index)}>
                    <Icon icon={edit2} size={18} />
                  </div>
                  <div onClick={() => handleDelete(individualTodo.ID)}>
                    <Icon icon={trash} size={18} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {editForm === false && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Enter task ..."
            type="text"
            required
            onChange={(e) => setTodoValue(e.target.value)}
            value={todoValue}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {editForm === true && (
        <form autoComplete="off" onSubmit={handleEditSubmit} className="form" >
            <input type='text' placeholder="Edit your Item" required
              onChange={(e) => setTodoValue(e.target.value)} value={todoValue} />
              <button type="submit">
                Update
              </button>
        </form>
      )}
    </>
  );
};

export default Form;
