import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./createscrum.css"; 

const CreateScrum = () => {
  const [scrumName, setScrumName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [assignedUser, setAssignedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [scrums, setScrums] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = storedUsers.filter(user => user.role !== "admin");
    setUsers(filteredUsers);
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setScrums(storedScrums);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!scrumName || !taskTitle || !taskDescription || !taskStatus || !assignedUser) {
      setError("All fields are required");
      return;
    }
    
    setError("");

    const newScrum = {
      scrumName,
      tasks: [{ taskTitle, taskDescription, taskStatus, assignedUser }],
    };

    const updatedScrums = [...scrums, newScrum];
    setScrums(updatedScrums);
    localStorage.setItem("scrums", JSON.stringify(updatedScrums));
    navigate("/admin-dashboard");
  };

  return (
    <div className="container">
      <h2>Create Scrum</h2>
      {error && <p className="error-message">{error}</p>}
      <button className="cancel-btn" onClick={() => navigate("/admin-dashboard")}>Cancel</button>
      <form onSubmit={handleSubmit}>
        <label>Scrum Name:</label>
        <input type="text" value={scrumName} onChange={(e) => setScrumName(e.target.value)} required />
        
        <label>Task Title:</label>
        <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
        
        <label>Task Description:</label>
        <input type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
        
        <label>Task Status:</label>
        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} required>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <label>Assign To:</label>
        <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} required>
          <option value="">Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user.email}>{user.name}</option>
          ))}
        </select>
        
        <button type="submit">Create Scrum</button>
      </form>
    </div>
  );
};

export default CreateScrum;
