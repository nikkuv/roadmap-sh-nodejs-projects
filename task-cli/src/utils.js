import fs from 'fs';
import path from 'path';

const TASKS_FILE = path.join(process.cwd(), 'data', 'tasks.json');

export function loadTasks() {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { tasks: [] };
    }
}

export function saveTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}