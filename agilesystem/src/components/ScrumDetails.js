import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ScrumDetails() {
  const { id } = useParams(); // Get scrum team ID from URL
  const [scrum, setScrum] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/scrumTeams/${id}`)
      .then(response => setScrum(response.data))
      .catch(error => console.error("Error fetching scrum details:", error));
  }, [id]);

  if (!scrum) return <p>Loading...</p>;

  return (
    <div>
      <h2>Scrum Details for {scrum.name}</h2>
      <h3>Tasks:</h3>
      <ul>
        {scrum.tasks.map(task => (
          <li key={task.id}>
            <strong>{task.name}</strong>: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScrumDetails;
