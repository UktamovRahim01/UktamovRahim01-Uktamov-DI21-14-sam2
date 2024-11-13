// src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  // Функция для добавления задачи
  const addTask = () => {
    if (!task) return;
    const newTask = {
      id: Date.now(),
      title: task,
      description: description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask('');
    setDescription('');
  };

  // Функция для удаления задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Функция для редактирования задачи
  const editTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: prompt('Edit task:', task.title) } : task
    );
    setTasks(updatedTasks);
  };

  // Функция для отметки задачи как выполненной
  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1>To-Do App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Task title"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className={`task-card ${task.completed ? 'completed' : ''}`} key={task.id}>
            <div className="task-header">
              <h2>{task.title}</h2>
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task.id)}
                />
                <button onClick={() => editTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
