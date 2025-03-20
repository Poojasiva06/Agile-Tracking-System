import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Welcomepage.css"; // Import CSS file

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showScrums, setShowScrums] = useState(false);
  const [scrums, setScrums] = useState([]);
  const [selectedScrum, setSelectedScrum] = useState(null);

  const fetchScrums = () => {
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setScrums(storedScrums);
  };

  useEffect(() => {
    fetchScrums();

    const handleStorageChange = (e) => {
      if (e.key === "scrums") {
        fetchScrums();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedScrum]);

  const handleGetDetails = (scrum) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedScrum(scrum);
    }
  };

  const handleViewScrums = () => {
    setShowScrums(true);
  };

  const handleBackToList = () => {
    setSelectedScrum(null);
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-header">Welcome to Agile Tracking System</h2>
      <p className="welcome-description">
        Here we can track and manage our scrum teams effectively.
      </p>

      {!showScrums && !selectedScrum && (
        <button className="button" onClick={handleViewScrums}>
          View Scrums
        </button>
      )}

      {showScrums && !selectedScrum && (
        <div className="scrum-list">
          <h2>Scrum Teams</h2>
          {scrums.length > 0 ? (
            <ul>
              {scrums.map((scrum, index) => (
                <li key={index}>
                  {scrum.scrumName}{" "}
                  <button className="button" onClick={() => handleGetDetails(scrum)}>
                    Get Details
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No scrum teams available</p>
          )}
        </div>
      )}

      {selectedScrum && (
        <div className="scrum-details">
          <h2>Scrum Details for {selectedScrum.scrumName}</h2>

          <h3>Tasks:</h3>
          {selectedScrum.tasks && selectedScrum.tasks.length > 0 ? (
            <ul>
              {selectedScrum.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>
                  <p>
                    <strong>Task Title:</strong> {task.taskTitle}
                  </p>
                  <p>
                    <strong>Task Description:</strong> {task.taskDescription}
                  </p>
                  <p>
                    <strong>Status:</strong> {task.taskStatus}
                  </p>
                  <p>
                    <strong>Assigned To:</strong> {task.assignedUser}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks available</p>
          )}
          <button className="button" onClick={handleBackToList}>
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
