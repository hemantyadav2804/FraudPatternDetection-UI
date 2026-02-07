import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/NavBar";   
import RiskBadge from "../components/RiskBadge";
import AdminStats from "../components/AdminStats";

export default function AdminDashboard() {

  // ⚠️ Demo admin (replace later with logged-in admin)
  const adminId = 1;

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // ===============================
  // LOAD USERS
  // ===============================
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await API.get(`/admin/users?adminId=${adminId}`);
      setUsers(res.data);
    } catch (err) {
      setMessage("Error loading users");
    }
  };

  // ===============================
  // BLOCK USER
  // ===============================
  const blockUser = async (userId) => {
    try {
      await API.post(`/admin/block/${userId}?adminId=${adminId}`);
      setMessage("User blocked successfully");
      loadUsers();
    } catch (err) {
      setMessage("Failed to block user");
    }
  };

  // ===============================
  // UNBLOCK USER (RESET RISK)
  // ===============================
  const unblockUser = async (userId) => {
    try {
      await API.post(`/admin/unblock/${userId}?adminId=${adminId}`);
      setMessage("User unblocked successfully (Risk score reset)");
      loadUsers();
    } catch (err) {
      setMessage("Failed to unblock user");
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <>
      <Navbar title="SecureBank Pro – Admin Dashboard" />

      <div className="container mt-4">

        <h4 className="mb-3">Admin Control Center</h4>

        {/* ADMIN STATS */}
        <AdminStats users={users} />

        {/* MESSAGE */}
        {message && (
          <div className="alert alert-info mt-3">
            {message}
          </div>
        )}

        {/* USER MANAGEMENT TABLE */}
        <div className="card shadow p-3 mt-4">
          <h5>User Management</h5>

          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <RiskBadge score={user.riskScore} />
                    </td>
                    <td>{user.status}</td>
                    <td>
                      {user.status === "ACTIVE" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => blockUser(user.id)}
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => unblockUser(user.id)}
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </>
  );
}
