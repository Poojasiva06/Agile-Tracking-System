import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        setTask(response.data);
        setStatus(response.data.status);
      })
      .catch(error => console.error("Error fetching task:", error));
  }, [id]);

  const handleUpdateStatus = async () => {
    await axios.patch(`http://localhost:5000/tasks/${id}`, { status });
    alert("Task Updated!");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Task</h2>
      <p><strong>{task.name}</strong></p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={handleUpdateStatus}>Update</button>
    </div>
  );
}

export default UpdateTask;
