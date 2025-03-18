import { useNavigate } from "react-router-dom";

const ScrumTeams = () => {
  const navigate = useNavigate();

  const handleGetDetails = (teamId) => {
    navigate(`/scrum/${teamId}`); // Redirect to Scrum Details Page
  };

  return (
    <div>
      <h2>Scrum Teams</h2>
      <ul>
        {["A", "B", "C"].map((team) => (
          <li key={team}>
            Scrum Team {team}
            <button onClick={() => handleGetDetails(team)}>Get Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrumTeams;
