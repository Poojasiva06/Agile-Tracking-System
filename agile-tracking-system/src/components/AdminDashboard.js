//components/AdminDashboard.j
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [scrums, setScrums] = useState([]);
  const [selectedScrum, setSelectedScrum] = useState(null);
  const [taskStatuses, setTaskStatuses] = useState({});

  useEffect(() => {
    const storedScrums = JSON.parse(localStorage.getItem("scrums")) || [];
    setScrums(storedScrums);

    // Initialize task statuses from localStorage or stored scrums
    const initialStatuses = JSON.parse(localStorage.getItem("taskStatuses")) || {};
    storedScrums.forEach((scrum) => {
      scrum.tasks?.forEach((task) => {
        if (!(task.taskTitle in initialStatuses)) {
          initialStatuses[task.taskTitle] = task.taskStatus;
        }
      });
    });

    setTaskStatuses(initialStatuses);
  }, []);

  // Handle status change and update localStorage
  const handleStatusChange = (taskTitle, newStatus) => {
    const updatedStatuses = {
      ...taskStatuses,
      [taskTitle]: newStatus,
    };

    setTaskStatuses(updatedStatuses);
    localStorage.setItem("taskStatuses", JSON.stringify(updatedStatuses));

    // Also update the 'scrums' in localStorage
    const updatedScrums = scrums.map((scrum) => ({
      ...scrum,
      tasks: scrum.tasks.map((task) =>
        task.taskTitle === taskTitle ? { ...task, taskStatus: newStatus } : task
      ),
    }));

    setScrums(updatedScrums);
    localStorage.setItem("scrums", JSON.stringify(updatedScrums));
  };

  // Function to delete a scrum
  const deleteScrum = (scrumName) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Scrum?");
    if (confirmDelete) {
      const updatedScrums = scrums.filter((scrum) => scrum.scrumName !== scrumName);
      setScrums(updatedScrums);
      localStorage.setItem("scrums", JSON.stringify(updatedScrums));
      setSelectedScrum(null); // Go back to list after deletion
    }
  };

  return (
    <div>
      <h2>Scrum Teams</h2>
      <button><Link to="/create-scrum">Add New Scrum</Link></button>
      <ul>
        {scrums.map((scrum, index) => (
          <li key={index}>
            {scrum.scrumName}{" "}
            <button onClick={() => setSelectedScrum(scrum)}>Get Details</button>
          </li>
        ))}
      </ul>

      {selectedScrum && (
        <div>
          <h2>Scrum Details for {selectedScrum.scrumName}</h2>

          <h3>Tasks:</h3>
          {selectedScrum.tasks && selectedScrum.tasks.length > 0 ? (
            <ul>
              {selectedScrum.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>
                  <p><strong>Task Title:</strong> {task.taskTitle}</p>
                  <p><strong>Task Description:</strong> {task.taskDescription}</p>
                  <p>
                    <strong>Status:</strong> 
                    <span style={{ marginLeft: "5px" }}>{taskStatuses[task.taskTitle]}</span>
                    <select 
                      value={taskStatuses[task.taskTitle] || task.taskStatus} 
                      onChange={(e) => handleStatusChange(task.taskTitle, e.target.value)}
                      style={{ marginLeft: "10px" }}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </p>
                  <p><strong>Assigned To:</strong> {task.assignedUser}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks available</p>
          )}
          
          {/* Back and Delete Buttons */}
          <button onClick={() => setSelectedScrum(null)}>Back to List</button>
          <button onClick={() => deleteScrum(selectedScrum.scrumName)} style={{ marginLeft: "10px" }}>
            Delete Scrum
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
