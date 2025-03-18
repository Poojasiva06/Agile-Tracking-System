const Dashboard = ({ setCurrentPage }) => {
    return (
      <div>
        <h2>Dashboard</h2>
        <p>Welcome to the Scrum Dashboard!</p>
        <button onClick={() => setCurrentPage("welcome")}>Exit</button> {/* Exit Button */}
      </div>
    );
  };
  
  export default Dashboard;
  