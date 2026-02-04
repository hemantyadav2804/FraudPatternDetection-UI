import React, { useEffect, useState } from "react";
import axios from "axios";
import Balance from "./Balance";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // ✅ Day 8: fraud risk score state
  const [riskScore, setRiskScore] = useState(0);

  // ✅ Fetch risk score when dashboard loads
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`http://localhost:8090/fraud/risk-score/${userId}`)
        .then((res) => {
          setRiskScore(res.data);
        })
        .catch(() => {
          console.log("Failed to fetch risk score");
        });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container mt-5 text-center">
      <h3>User Dashboard</h3>

      {/* ✅ Fraud Warning Banner (Day 8) */}
      {riskScore >= 30 && (
        <div className="alert alert-warning mt-3">
          ⚠️ Suspicious activity detected on your account
        </div>
      )}

      <Balance />

      <button className="btn btn-danger mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
