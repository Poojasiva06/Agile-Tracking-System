import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import ScrumDetails from "./components/ScrumDetails";
import AdminScrumManagement from "./components/AdminScrumManagement";
import UpdateTask from "./components/UpdateTask";
import UserProfile from "./components/UserProfile";
import AdminProfile from "./components/AdminProfile";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [currentPage, setCurrentPage] = useState("welcome"); // Default page is Welcome

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
    <div>
      <Navbar 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        setCurrentPage={setCurrentPage} 
      />

      {/* Render Components Based on Page State */}
      {currentPage === "welcome" && <WelcomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "login" && <Login setIsAuthenticated={setIsAuthenticated} setCurrentPage={setCurrentPage} />}
      {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      {isAuthenticated && currentPage === "dashboard" && <Dashboard setCurrentPage={setCurrentPage} />}
      {isAuthenticated && currentPage === "user-home" && <UserHome setCurrentPage={setCurrentPage} />}
      {isAuthenticated && currentPage === "profile" && <UserProfile />}
      {isAuthenticated && currentPage === "admin-home" && <AdminHome />}
      {isAuthenticated && currentPage === "admin-scrum" && <AdminScrumManagement />}
      {isAuthenticated && currentPage === "admin-profile" && <AdminProfile />}
      {isAuthenticated && currentPage === "scrum-details" && <ScrumDetails />}
      {isAuthenticated && currentPage === "update-task" && <UpdateTask />}
    </div>
    </Router>
  );
}

export default App;
