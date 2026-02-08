import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ title }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">{title}</span>
      <button className="btn btn-outline-light btn-sm" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
