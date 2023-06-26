const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Sample data
let todos = [
  { id: 1, text: 'Learn JavaScript' },
  { id: 2, text: 'Build a REST API' }
];

// GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: todos.length + 1, text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === Number(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[todoIndex].text = text;

  res.json(todos[todoIndex]);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex(todo => todo.id === Number(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1);

  res.json(deletedTodo[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
