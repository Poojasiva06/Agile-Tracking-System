import { useState } from "react";
import axios from "axios";

const Login = ({ setIsAuthenticated, setCurrentPage }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/users", {
        params: { email: credentials.email, password: credentials.password },
      });

      if (response.data.length > 0) {
        alert("Login successful!");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        setCurrentPage("dashboard"); // ✅ Change page instead of navigating
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email: </label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />

        <label>Password: </label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
      <button onClick={() => setCurrentPage("signup")}>Sign Up</button>
    </div>
  );
};

export default Login;
