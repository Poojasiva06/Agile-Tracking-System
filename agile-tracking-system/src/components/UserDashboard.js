//components/UserDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrums, setScrums] = useState([]);
  const [selectedScrum, setSelectedScrum] = useState(null);

  useEffect(() => {
    const fetchScrums = () => {
      const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
      setScrums(storedScrums);
    };

    fetchScrums();
    
    const handleStorageChange = (e) => {
      if (e.key === "scrums") {
        fetchScrums();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleGetDetails = (scrum) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedScrum(scrum);
    }
  };

  const handleBackToList = () => {
    setSelectedScrum(null);
  };

  return (
    <div>
      <h2>Scrum Teams</h2>
      
      {!selectedScrum ? (
        scrums.length > 0 ? (
          <ul>
            {scrums.map((scrum, index) => (
              <li key={index}>
                {scrum.scrumName}{" "}
                <button onClick={() => handleGetDetails(scrum)}>Get Details</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No scrum teams available</p>
        )
      ) : (
        <div>
          <h2>Scrum Details for {selectedScrum.scrumName}</h2>

          <h3>Tasks:</h3>
          {selectedScrum.tasks && selectedScrum.tasks.length > 0 ? (
            <ul>
              {selectedScrum.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>
                  <p><strong>Task Title:</strong> {task.taskTitle}</p>
                  <p><strong>Task Description:</strong> {task.taskDescription}</p>
                  <p><strong>Status:</strong> {task.taskStatus}</p>
                  <p><strong>Assigned To:</strong> {task.assignedUser}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks available</p>
          )}
          <button onClick={handleBackToList}>Back to List</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
