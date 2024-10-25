import React, { useReducer, useState } from 'react';

const initialState = {
  todos: []
};

// Reducer function to handle actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE':
      return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) };
    case 'EDIT':
      const updatedTodos = state.todos.map((todo, index) =>
        index === action.payload.index ? action.payload.newTodo : todo
      );
      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTodo, setEditTodo] = useState('');

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      dispatch({ type: 'ADD', payload: newTodo });
      setNewTodo('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTodo(state.todos[index]);
  };

  const handleSave = () => {
    dispatch({ type: 'EDIT', payload: { index: editIndex, newTodo: editTodo } });
    setEditIndex(null);
    setEditTodo('');
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="form-control"
          placeholder="Add a new todo"
        />
        <button onClick={handleAdd} className="btn btn-primary">Add</button>
      </div>
      <ul className="list-group">
        {state.todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="form-control me-2"
                />
                <button onClick={handleSave} className="btn btn-success me-2">Save</button>
                <button onClick={() => setEditIndex(null)} className="btn btn-secondary">Cancel</button>
              </>
            ) : (
              <>
                <span>{todo}</span>
                <div>
                  <button onClick={() => handleEdit(index)} className="btn btn-warning me-2">Edit</button>
                  <button onClick={() => dispatch({ type: 'DELETE', payload: index })} className="btn btn-danger">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;