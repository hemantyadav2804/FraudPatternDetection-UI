import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({ username, password });

      setMessage(response.data);

      // redirect after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Registration</h2>

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Register;
