// components/UserHistory.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserHistory = () => {
  const { email, name } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const scrums = JSON.parse(localStorage.getItem("scrums")) || [];
    const userTasks = scrums.flatMap(scrum => 
      scrum.tasks.filter(task => task.assignedUser === email)
    );
    setTasks(userTasks);
  }, [email]);

  return (
    <div>
      <h2>Tasks Worked by {decodeURIComponent(name)}</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <p><strong>Title:</strong> {task.taskTitle}</p>
              <p><strong>Description:</strong> {task.taskDescription}</p>
              <p><strong>Status:</strong> {task.taskStatus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found for this user.</p>
      )}
      <Link to="/admin-profile">Back to Profile</Link>
    </div>
  );
};

export default UserHistory;