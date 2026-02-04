import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body text-center">

          <h3>Admin Dashboard</h3>
          <p>Logged in as: <strong>{username}</strong></p>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
