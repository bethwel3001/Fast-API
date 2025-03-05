const backendUrl = "http://127.0.0.1:8000";

// Add a task
document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const assignedTo = document.getElementById('assignedTo').value;

  try {
    const response = await fetch(`${backendUrl}/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, assigned_to: assignedTo }),
    });

    if (response.ok) {
      alert('Task added successfully!');
      fetchTasks();
    } else {
      const errorData = await response.json();
      alert(`Failed to add task: ${errorData.detail || 'Unknown error'}`);
    }
  } catch (error) {
    alert('An error occurred while adding the task.');
    console.error(error);
  }
});

// Fetch all tasks
async function fetchTasks() {
  try {
    const response = await fetch(`${backendUrl}/tasks/`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    data.tasks.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        Assigned to: ${task.assigned_to}<br>
        Status: ${task.status}<br>
        <button onclick="updateTask(${task.id}, 'completed')">Mark as Completed</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    alert('An error occurred while fetching tasks.');
    console.error(error);
  }
}

// Update a task
async function updateTask(taskId, status) {
  try {
    const response = await fetch(`${backendUrl}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      alert('Task updated successfully!');
      fetchTasks();
    } else {
      const errorData = await response.json();
      alert(`Failed to update task: ${errorData.detail || 'Unknown error'}`);
    }
  } catch (error) {
    alert('An error occurred while updating the task.');
    console.error(error);
  }
}

// Delete a task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${backendUrl}/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Task deleted successfully!');
      fetchTasks();
    } else {
      const errorData = await response.json();
      alert(`Failed to delete task: ${errorData.detail || 'Unknown error'}`);
    }
  } catch (error) {
    alert('An error occurred while deleting the task.');
    console.error(error);
  }
}

// Fetch tasks when the page loads
fetchTasks();