import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/NavBar";

export default function FraudLogs() {

  const adminId = 1;
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const res = await API.get(`/admin/fraud-logs?adminId=${adminId}`);
      setLogs(res.data);
    } catch {
      setMessage("Failed to load fraud logs");
    }
  };

  return (
    <>
      <Navbar title="SecureBank Pro - Fraud Logs" />

      <div className="container mt-4">
        <h4>Fraud Detection Logs</h4>

        {message && <div className="alert alert-danger mt-2">{message}</div>}

        <div className="card shadow p-3 mt-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Reason</th>
                <th>Risk Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No fraud activity detected
                  </td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id}>
                    <td>{log.userId}</td>
                    <td className="text-danger">{log.reason}</td>
                    <td>{log.riskScore}</td>
                    <td>{log.createdAt}</td>
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
