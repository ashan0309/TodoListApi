import { Task } from './types';

let tasks: Task[] = [
    { id: 1, title: "Create todo list", status: true },
];

export const getTasks = (query: string = ""): Task[] => {
    if (query) {
        return tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
    }
    return tasks;
};

export const addTask = (title: string): Task => {
    const newTask: Task = { id: tasks.length + 1, title, status: false };
    tasks.push(newTask);
    return newTask;
};

export const deleteTask = (id: number): void => {
    tasks = tasks.filter(task => task.id !== id);
};

export const updateTask = (id: number): Task | null => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.status = !task.status;
        return task;
    }
    return null;
};
