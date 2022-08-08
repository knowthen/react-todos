import { useState } from 'react';
import * as Mycelial from '@mycelial/react';
import cuid from 'cuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const { add } = Mycelial.useStore((store) => {
    const todos = store.find(
      (entity) =>
        entity.properties.kind === 'todo' &&
        entity.properties.archived === false,
    );
    setTodos(todos);
    console.log({ todos });
  });
  function handleSubmit(e) {
    e.preventDefault();
    const id = cuid();
    add(
      Mycelial.Entity.from(id, {
        kind: 'todo',
        description: todo,
        archived: false,
      }),
    );
    setTodo('');
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
      <ul>
        {todos.map((todo) => (
          <li>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
