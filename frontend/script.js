document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const assignedTo = document.getElementById('assignedTo').value;

  const response = await fetch('http://127.0.0.1:8000/tasks/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, assigned_to: assignedTo }),
  });

  if (response.ok) {
    alert('Task added successfully!');
    fetchTasks();
  } else {
    alert('Failed to add task.');
  }
});

async function fetchTasks() {
  const response = await fetch('http://127.0.0.1:8000/tasks/');
  const data = await response.json();
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  data.tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description}<br>
      Assigned to: ${task.assigned_to}<br>
      Status: ${task.status}
    `;
    taskList.appendChild(li);
  });
}

// Fetch tasks when the page loads
fetchTasks();