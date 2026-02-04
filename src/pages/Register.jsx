import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8090/auth/register",
        { username, password }
      );
      setMessage(res.data);
    } catch {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card">
        <div className="card-body">

          <h3 className="text-center mb-3">Register</h3>

          <form onSubmit={register}>
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

            <button className="btn btn-success w-100">
              Register
            </button>
          </form>

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

export default Register;
