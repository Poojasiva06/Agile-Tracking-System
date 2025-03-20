//components/UserProfile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("User Object:", user); // Debugging

      const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
      const assignedTasks = storedScrums.flatMap((scrum) =>
        scrum.tasks ? scrum.tasks.filter((task) => task.assignedUser === user.email) : []
      );

      setUserTasks(assignedTasks);
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name || "Unknown User"}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Tasks Worked by {user.name || "User"}</h3>
      {userTasks.length > 0 ? (
        <ul>
          {userTasks.map((task, index) => (
            <li key={index}>
              <p><strong>Task Title:</strong> {task.taskTitle}</p>
              <p><strong>Description:</strong> {task.taskDescription}</p>
              <p><strong>Status:</strong> {task.taskStatus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned to you.</p>
      )}
    </div>
  );
};

export default UserProfile;
