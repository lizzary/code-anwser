import { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setTodos(data))
      .catch(err => console.error('Could not load todos', err));
  }, []);

  async function addTodo() {
    const text = input.trim();
    if (!text) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('Failed to create todo');
      const newTodo = await res.json();
      setTodos(prev => [...prev, newTodo]);
      setInput('');
    } catch (err) {
      console.error('Could not add todo', err);
    }
  }

  function toggleDone(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      {todos.map(todo => (
        <div key={todo.id} onClick={() => toggleDone(todo.id)}>
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TodoList;