import { useState } from "react";
import API from "../services/api";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const generateOtp = async () => {
    try {
      const res = await API.post(`/auth/forgot-password?username=${username}`);
      setMessage(res.data);
    } catch (err) {
      setMessage("Error generating OTP");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await API.post(
        `/auth/reset-password?username=${username}&otp=${otp}&newPassword=${newPassword}`
      );
      setMessage(res.data);
    } catch (err) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-3">Forgot Password</h4>

        <input
          className="form-control mb-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button className="btn btn-warning w-100 mb-3" onClick={generateOtp}>
          Generate OTP
        </button>

        <input
          className="form-control mb-2"
          placeholder="OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={resetPassword}>
          Reset Password
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}
