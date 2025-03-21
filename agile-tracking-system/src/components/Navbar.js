import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/welcome"); // Redirect to the Welcome page
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to={user ? (user.role === "admin" ? "/admin-dashboard" : "/user-dashboard") : "/login"}>
        Dashboard
      </Link>
      
      <Link to={user ? (user.role === "admin" ? "/admin-profile" : "/user-profile") : "/login"}>
        Profile
      </Link>
      
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
