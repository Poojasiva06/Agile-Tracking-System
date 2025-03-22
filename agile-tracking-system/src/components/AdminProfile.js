// components/AdminProfile.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = storedUsers.filter(user => user.role !== "admin"); // Exclude admin
    setUsers(filteredUsers);
  }, []);

  const handleGetHistory = (email, name) => {
    navigate(`/user-history/${email}/${encodeURIComponent(name)}`);
  };

  return (
    <div>
      <h2>User Profiles</h2>
      <button><Link to="/add-user">Add New User</Link></button>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => handleGetHistory(user.email, user.name)}>Get History</button>
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
};

export default AdminProfile;