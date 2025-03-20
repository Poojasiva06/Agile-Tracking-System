// components/SignupPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./signup.css"; // Ensure correct case in filename

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Email validation
    if (!email.includes("@") || !email.includes(".com")) {
      setError("Invalid email format. Ensure it contains '@' and '.com'.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Check existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      setError("User already exists with this email.");
      return;
    }

    // Create new user
    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Save logged-in user to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    // Log in the user immediately
    login(newUser);
    
    // Navigate based on role
    navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {/* Role Selection */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Updated Sign Up Button */}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      {/* Updated text + login button */}
      <p>Already have an account? 
        <button className="login-link" onClick={() => navigate("/login")}>Login</button>
      </p>
    </div>
  );
};

export default SignupPage;
