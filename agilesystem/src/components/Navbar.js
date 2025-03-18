
const Navbar = ({ isAuthenticated, setIsAuthenticated, setCurrentPage }) => {
    const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      setCurrentPage("login"); // Redirect to login after logout
    };
  
    return (
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li><button onClick={() => setCurrentPage("dashboard")}>Dashboard</button></li>
              <li><button onClick={() => setCurrentPage("profile")}>Profiles</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>

            </>
          )}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  