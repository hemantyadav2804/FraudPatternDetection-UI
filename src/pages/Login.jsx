import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8090/auth/login",
        { username, password }
      );

      setMessage(res.data.message);

      if (res.data.userId) {
        localStorage.setItem("userId", res.data.userId);
        navigate("/user");
      }
    } catch {
      setMessage("Login failed");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card">
        <div className="card-body">

          <h3 className="text-center mb-3">Login</h3>

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

          <div className="text-center mt-3">
            <Link to="/register">New user? Register</Link>
            <br />
            <Link to="/forgot-password">Forgot password?</Link>
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

export default Login;
