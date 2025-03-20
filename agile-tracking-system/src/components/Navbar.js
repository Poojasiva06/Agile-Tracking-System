//components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
const Navbar = () => {
  const { user, logout } = useAuth();

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
        <button onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
