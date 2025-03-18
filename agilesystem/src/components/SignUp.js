import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", user);
      alert("Sign-up successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Name: </label>
        <input type="text" name="name" value={user.name} onChange={handleChange} required />

        <label>Email: </label>
        <input type="email" name="email" value={user.email} onChange={handleChange} required />

        <label>Password: </label>
        <input type="password" name="password" value={user.password} onChange={handleChange} required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
