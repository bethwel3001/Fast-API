# Task Management System

A simple **Task Management System** built with **FastAPI** (backend), **MySQL** (database), and **HTML/CSS/JavaScript** (frontend). This project allows users to create, view, update, and delete tasks.

---

## Features
- **Create Tasks**: Add new tasks with a title, description, and assignee.
- **View Tasks**: Display all tasks in a list.
- **Update Tasks**: Mark tasks as completed or pending.
- **Delete Tasks**: Remove tasks from the system.

---

## Technologies Used
- **Backend**: FastAPI
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Tools**: XAMPP (for MySQL), PyCharm/VS Code

---

## Prerequisites
Before running the project, ensure you have the following installed:
1. **Python 3.7+**: [Download Python](https://www.python.org/)
2. **XAMPP**: [Download XAMPP](https://www.apachefriends.org/)
3. **MySQL Connector**: Install via `pip install mysql-connector-python`
4. **FastAPI**: Install via `pip install fastapi uvicorn`

---

## Setup Instructions

### Step 1: Set Up MySQL Database
1. Start **XAMPP** and enable **MySQL**.
2. Open **phpMyAdmin** (usually at `http://localhost/phpmyadmin`).
3. Create a new database called `task_management`.
4. Create a table called `tasks`:
   ```sql
   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       assigned_to VARCHAR(255),
       status ENUM('pending', 'completed') DEFAULT 'pending',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

### Step 2: Set Up the Backend
1. Navigate to the backend folder
2. Run uvicorn main:app --reload

### Step 3: Set Up the Frontend
1. Navigate to the frontend folder
2. Run python -m http.server 8001

## Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Feedback
If you have any feedback or questions, please open an issue or contact the project maintainer.
