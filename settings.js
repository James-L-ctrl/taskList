// Store tasks in localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Convert old task format to new format if needed
if (tasks.length > 0 && typeof tasks[0] === 'string') {
    tasks = tasks.map(task => ({ title: task, description: '' }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks in the table
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td class="action-buttons">
                <button onclick="editTask(${index})" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="editDescription(${index})" class="edit-desc-btn">
                    <i class="fas fa-pencil-alt"></i> Update Status
                </button>
                <button onclick="deleteTask(${index})" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const taskText = taskInput.value.trim();
    const descriptionText = descriptionInput.value.trim();
    
    if (taskText) {
        tasks.push({
            title: taskText,
            description: descriptionText
        });
        saveTasks();
        renderTasks();
        taskInput.value = '';
        descriptionInput.value = '';
    }
}

// Function to edit a task
function editTask(index) {
    const taskText = prompt('Edit task:', tasks[index].title);
    
    if (taskText !== null && taskText.trim() !== '') {
        tasks[index].title = taskText.trim();
        saveTasks();
        renderTasks();
    }
}

// Function to edit a task description
function editDescription(index) {
    const descriptionText = prompt('Update task status/description:', tasks[index].description);
    
    if (descriptionText !== null) {
        tasks[index].description = descriptionText.trim();
        saveTasks();
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Add event listener for Enter key in input fields
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('descriptionInput').focus();
    }
});

document.getElementById('descriptionInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render of tasks
renderTasks();