import { useState } from "react";
import axios from "axios";

function AdminScrumManagement() {
  const [scrumName, setScrumName] = useState("");

  const handleAddScrum = async () => {
    if (!scrumName) {
      alert("Scrum Name is required");
      return;
    }

    await axios.post("http://localhost:5000/scrumTeams", { name: scrumName, tasks: [] });
    alert("Scrum Team Added!");
    setScrumName("");
  };

  return (
    <div>
      <h2>Add New Scrum</h2>
      <input type="text" placeholder="Scrum Name" value={scrumName} onChange={(e) => setScrumName(e.target.value)} />
      <button onClick={handleAddScrum}>Create Scrum</button>
    </div>
  );
}

export default AdminScrumManagement;
