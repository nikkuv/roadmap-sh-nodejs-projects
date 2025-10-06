import commander from 'commander';
const program = commander;
import { loadTasks, saveTasks } from './utils.js';

// Set the program name
program.name('task-cli');

// now i need to create cli commands for the task manager
// # Adding a new task
// task-cli add "Buy groceries"
// # Output: Task added successfully (ID: 1)

// # Updating and deleting tasks
// task-cli update 1 "Buy groceries and cook dinner"
// task-cli delete 1

// # Marking a task as in progress or done
// task-cli mark-in-progress 1
// task-cli mark-done 1

// # Listing all tasks
// task-cli list

// # Listing tasks by status
// task-cli list done
// task-cli list todo
// task-cli list in-progress

// const tasks = loadTasks();
// console.log(tasks);


program
    .command('add <title>')
    .description('Add a new task')
    .action((title) => {
        // Load current tasks
        const tasks = loadTasks();
        
        // Create new task
        const task = {
            id: tasks.tasks.length + 1,
            title,
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        
        // Add task and save
        tasks.tasks.push(task);
        saveTasks(tasks);
        console.log(`✅ Task added successfully (ID: ${task.id})`);
    }); 

program
    .command('update <id> <title>')
    .description('Update a task')
    .action((id, title) => {
        // here i need find the task by id and update the task
        const tasks = loadTasks();
        const task = tasks.tasks.find(t => t.id === parseInt(id));
        if (task) {
            task.title = title;
            task.updatedAt = new Date().toISOString();
            saveTasks(tasks);
            console.log(`✅ Task ${id} updated successfully`);
        }
        else {
            console.log(`❌ Task with ID ${id} not found`);
        }
    }); 

program
    .command('delete <id>')
    .description('Delete a task')
    .action((id) => {
        // here i need to find the task by id and delete the task
        const tasks = loadTasks();
        const task = tasks.tasks.find(t => t.id === parseInt(id));
        if (task) {
            tasks.tasks = tasks.tasks.filter(t => t.id !== parseInt(id));
            saveTasks(tasks);
            console.log(`✅ Task ${id} deleted successfully`);
        }
        else {
            console.log(`❌ Task with ID ${id} not found`);
        }
    }); 

program
    .command('list [status]')
    .description('List all tasks or filter by status (todo, in-progress, done)')
    .action((status) => {
        const tasks = loadTasks();
        let filteredTasks = tasks.tasks;
        
        if (status) {
            filteredTasks = tasks.tasks.filter(task => task.status === status);
            console.log(`Listing tasks with status: ${status}`);
        } else {
            console.log(`Listing all tasks`);
        }
        
        if (filteredTasks.length === 0) {
            console.log('No tasks found');
            return;
        }
        
        filteredTasks.forEach(task => {
            console.log(`${task.id} ${task.title} ${task.status} ${task.createdAt} ${task.updatedAt}`);
        });
    }); 

program
    .command('mark-in-progress <id>')
    .description('Mark a task as in progress')
    .action((id) => {
        const tasks = loadTasks();
        const task = tasks.tasks.find(t => t.id === parseInt(id));
        if (task) {
            task.status = 'in-progress';
            task.updatedAt = new Date().toISOString();
            saveTasks(tasks);
            console.log(`✅ Task ${id} marked as in progress`);
        }
        else {
            console.log(`❌ Task with ID ${id} not found`);
        }
    }); 

program
    .command('mark-done <id>')
    .description('Mark a task as done')
    .action((id) => {
        const tasks = loadTasks();
        const task = tasks.tasks.find(t => t.id === parseInt(id));
        if (task) {
            task.status = 'done';
            task.updatedAt = new Date().toISOString();
            saveTasks(tasks);
            console.log(`✅ Task ${id} marked as done`);
        }
        else {
            console.log(`❌ Task with ID ${id} not found`);
        }
    }); 

program.command('mark-todo <id>')
    .description('Mark a task as todo')
    .action((id) => {
        const tasks = loadTasks();
        const task = tasks.tasks.find(t => t.id === parseInt(id));
        if (task) {
            task.status = 'todo';
            task.updatedAt = new Date().toISOString();
            saveTasks(tasks);
            console.log(`✅ Task ${id} marked as todo`);
        }
        else {
            console.log(`❌ Task with ID ${id} not found`);
        }
    }); 

program.parse(process.argv);   