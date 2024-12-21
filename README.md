# Task Management System

This is a full-stack Task Management System designed to enable users to manage their daily tasks with ease. The system consists of a **React.js frontend** and a **Node.js backend**, supporting features like task creation, deletion, updating, filtering, and authentication.

## **Features**

### **Backend (Node.js + Express)**
1. **User Authentication**:
   - `POST /api/auth/register`: Register a new user.
   - `POST /api/auth/login`: Login and retrieve a JWT token for authentication.
2. **Task Management**:
   - `POST /api/tasks`: Add a new task (requires authentication).
   - `GET /api/tasks`: Retrieve tasks created by the logged-in user.
   - **`PUT /api/tasks/:id`: Update a task's description or due date (only by the user who created it).**
   - **`DELETE /api/tasks/:id`: Delete a task (only by the user who created it).**
   - `GET /api/tasks/filter?status=<today|overdue>`: Filter tasks based on their status.
3. **Authorization**:
   - Only the user who created a task can update or delete it.
4. **Data Validation and Security**:
   - Validation for required fields and invalid input.
   - JWT-based authentication ensures secure access.
   - Users can only manage their own tasks.

### **Frontend (React.js with Material-UI)**
1. **Task Management Interface**:
   - A user-friendly form to add tasks with a description and due date.
   - A dynamic task list displaying all tasks with options to delete and update.
2. **Task Filtering**:
   - Filter tasks by "All", "Today" or "Overdue" statuses.
3. **Real-time Task Count**:
   - Display the total number of tasks.
4. **Modern UI**:
   - Material-UI components for a responsive and visually appealing interface.

## **Tech Stack**

### **Frontend**
- React.js
- React Router for navigation
- React Hook Form for form handling
- React-redux for state management
- Material-UI (MUI) for styling

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication
- Bcrypt for password hashing

### **Other Tools**
- Postman for API testing
- Secure-local-storage

## **Setup Instructions**

### **Backend Setup**
1. Clone the repository.
2. Navigate to the `backend` directory: `cd backend`.
3. Install dependencies: `npm install`.
4. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   DB_URI=<your-mongodb-connection-string>

### **Frontend Setup**
1. Clone the repository.
2. Navigate to the `frontent` directory: `cd frontend`.
3. Install dependencies: `npm install`.
4. Create a `.env` file with the following variables:
   ```env
   API_URL=http://localhost:5000/api
