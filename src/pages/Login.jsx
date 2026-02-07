import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", { username, password });
    res.data.role === "ADMIN" ? navigate("/admin") : navigate("/user");
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="col-md-6 d-flex flex-column justify-content-center bg-primary text-white p-5">
        <h1 className="fw-bold">SecureBank Pro</h1>
        <p>Enterprise-grade fraud detection banking system</p>
      </div>

      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="card shadow p-4" style={{ width: "380px" }}>
          <h4 className="text-center mb-3">Login</h4>
          <input className="form-control mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input className="form-control mb-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button className="btn btn-primary w-100" onClick={login}>Login</button>
          <div className="text-center mt-3">
            <Link to="/register">Register</Link> | <Link to="/forgot">Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
