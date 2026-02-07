import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    await API.post("/auth/register", { username, password });
    navigate("/");
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h4 className="text-center mb-3">Create Account</h4>
        <input className="form-control mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-success w-100" onClick={register}>Register</button>
      </div>
    </div>
  );
}
