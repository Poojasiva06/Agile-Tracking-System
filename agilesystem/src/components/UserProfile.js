import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:5000/tasks?userId=${user.id}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, [user]);

  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <h3>Tasks Worked By {user.name}</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>
              <strong>{task.name}</strong>: {task.status}
            </li>
          ))
        ) : (
          <p>No tasks assigned yet.</p>
        )}
      </ul>
    </div>
  );
}

export default UserProfile;
