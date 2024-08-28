// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const cors = require('cors');
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public'));

// // Path to the todos file
// const todosFile = './todos.json';

// // Helper to read JSON from file
// const readTodos = () => {
//     const data = fs.readFileSync(todosFile);
//     return JSON.parse(data);
// };

// // Helper to write JSON to file
// const writeTodos = (todos) => {
//     fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
// };

// // Get all Todos
// app.get('/api/todos', (req, res) => {
//     const todos = readTodos();
//     res.json(todos);
// });

// // Add a new Todo
// app.post('/api/todos', (req, res) => {
//     const todos = readTodos();
//     const newTodo = req.body;
//     todos.push(newTodo);
//     writeTodos(todos);
//     res.json(newTodo);
// });

// // Delete a Todo
// app.delete('/api/todos/:id', (req, res) => {
//     let todos = readTodos();
//     const id = parseInt(req.params.id);
//     todos = todos.filter(todo => todo.id !== id);
//     writeTodos(todos);
//     res.json({ message: 'Todo deleted' });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Path to the todos file
const todosFile = './todos.json';

// Helper to read JSON from file
const readTodos = () => {
    const data = fs.readFileSync(todosFile);
    return JSON.parse(data);
};

// Helper to write JSON to file
const writeTodos = (todos) => {
    fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
};

// Get all Todos
app.get('/api/todos', (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// Add a new Todo
app.post('/api/todos', (req, res) => {
    const todos = readTodos();
    const newTodo = req.body;
    todos.push(newTodo);
    writeTodos(todos);
    res.json(newTodo);
});

// Update a Todo (Toggle completion status)
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;

    let todos = readTodos();
    todos = todos.map(todo => todo.id === id ? updatedTodo : todo);
    writeTodos(todos);
    res.json(updatedTodo);
});

// Delete a Todo
app.delete('/api/todos/:id', (req, res) => {
    let todos = readTodos();
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    writeTodos(todos);
    res.json({ message: 'Todo deleted' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
