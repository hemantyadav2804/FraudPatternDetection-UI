import React, { useState } from "react";
import { loginUser } from "../services/api";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      setMessage(res.data);
    } catch {
      setMessage("Login failed");
    }
  };

  if (showForgot) {
    return <ForgotPassword />;
  }

  return (
    <div className="container mt-5 col-md-4">
      <div className="card">
        <div className="card-body">

          <h4 className="text-center mb-3">Login</h4>

          <form onSubmit={login}>
            <input
              className="form-control mb-2"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </button>
          </p>

          {message && (
            <div className="alert alert-info mt-2 text-center">
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
