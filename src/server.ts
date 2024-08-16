import express from 'express';
import { getTasks, addTask, deleteTask, updateTask } from './tasks';
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/tasks', (req, res) => {
    const { query } = req.query;
    const tasks = getTasks(query as string);
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const task = addTask(title);
    res.status(201).json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    deleteTask(Number(id));
    res.status(204).send();
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = updateTask(Number(id));
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
