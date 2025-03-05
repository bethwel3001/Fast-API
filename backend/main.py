from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8001"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Task Management System!"}

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # Leave empty for XAMPP default
        database="task_management"
    )

# Create a task
@app.post("/tasks/")
async def create_task(title: str, description: str, assigned_to: str):
    db = get_db_connection()
    cursor = db.cursor()
    query = "INSERT INTO tasks (title, description, assigned_to) VALUES (%s, %s, %s)"
    cursor.execute(query, (title, description, assigned_to))
    db.commit()
    task_id = cursor.lastrowid
    db.close()
    return {"task_id": task_id, "message": "Task created successfully"}

# Get all tasks
@app.get("/tasks/")
async def get_tasks():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    db.close()
    return {"tasks": tasks}

# Update a task
@app.put("/tasks/{task_id}")
async def update_task(task_id: int, status: str):
    db = get_db_connection()
    cursor = db.cursor()
    query = "UPDATE tasks SET status = %s WHERE id = %s"
    cursor.execute(query, (status, task_id))
    db.commit()
    db.close()
    return {"message": "Task updated successfully"}

# Delete a task
@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    db = get_db_connection()
    cursor = db.cursor()
    query = "DELETE FROM tasks WHERE id = %s"
    cursor.execute(query, (task_id,))
    db.commit()
    db.close()
    return {"message": "Task deleted successfully"}