//components/ScrumDeatils.js
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const ScrumDetails = () => {
  const { index } = useParams();
  const scrums = JSON.parse(localStorage.getItem("scrums")) || [];
  const [currentScrum, setCurrentScrum] = useState(scrums[index]);

  if (!currentScrum) return <p>Scrum not found</p>;

  const handleStatusChange = (taskIndex, newStatus) => {
    const updatedScrum = { ...currentScrum };
    updatedScrum.tasks[taskIndex].taskStatus = newStatus;
    setCurrentScrum(updatedScrum);

    const updatedScrums = [...scrums];
    updatedScrums[index] = updatedScrum;
    localStorage.setItem("scrums", JSON.stringify(updatedScrums));
  };

  return (
    <div>
      <h2>Scrum Details for {currentScrum.scrumName}</h2>

      <h3>Tasks:</h3>
      {currentScrum.tasks && currentScrum.tasks.length > 0 ? (
        currentScrum.tasks.map((task, taskIndex) => (
          <div key={taskIndex}>
            <p><strong>Task Title:</strong> {task.taskTitle}</p>
            <p><strong>Task Description:</strong> {task.taskDescription}</p>
            <p><strong>Assigned To:</strong> {task.assignedUser}</p>
            <p>
              <strong>Status:</strong> 
              <span style={{ fontStyle: "italic", fontWeight: "bold", marginLeft: "5px" }}>
                {task.taskStatus}
              </span>
              <select
                value={task.taskStatus}
                onChange={(e) => handleStatusChange(taskIndex, e.target.value)}
                aria-label="Change Task Status"
                style={{ marginLeft: "10px" }}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </p>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}

      <button><Link to="/">Back to List</Link></button>
    </div>
  );
};

export default ScrumDetails;
