import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const generateOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8090/auth/forgot-password",
        null,
        { params: { username } }
      );
      setMessage(res.data);
      setStep(2);
    } catch {
      setMessage("Failed to generate OTP");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8090/auth/reset-password",
        null,
        { params: { username, otp, newPassword } }
      );
      setMessage(res.data);
    } catch {
      setMessage("Failed to reset password");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card">
        <div className="card-body">

          <h3 className="text-center mb-3">Forgot Password</h3>

          {step === 1 && (
            <>
              <input
                className="form-control mb-3"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="btn btn-primary w-100" onClick={generateOtp}>
                Generate OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                className="form-control mb-2"
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="btn btn-success w-100" onClick={resetPassword}>
                Reset Password
              </button>
            </>
          )}

          <div className="text-center mt-3">
            <Link to="/login">Back to Login</Link>
          </div>

          {message && (
            <div className="alert alert-info mt-3 text-center">
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
