import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <h2>Welcome to Agile Scrum Management</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <h3>Scrum Teams</h3>
      <ul>
        <li>Scrum Team A <button>Get Details</button></li>
        <li>Scrum Team B <button>Get Details</button></li>
        <li>Scrum Team C <button>Get Details</button></li>
      </ul>
    </div>
  );
};

export default WelcomePage;
