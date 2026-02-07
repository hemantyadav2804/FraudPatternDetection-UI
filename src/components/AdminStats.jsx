export default function AdminStats({ users }) {

  const totalUsers = users.length;
  const blockedUsers = users.filter(u => u.status === "BLOCKED").length;
  const highRiskUsers = users.filter(u => u.riskScore >= 50).length;

  return (
    <div className="row g-3">
      <div className="col-md-4">
        <div className="card shadow p-3 text-center">
          <small>Total Users</small>
          <h4>{totalUsers}</h4>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow p-3 text-center">
          <small>Blocked Users</small>
          <h4 className="text-danger">{blockedUsers}</h4>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow p-3 text-center">
          <small>High Risk Users</small>
          <h4 className="text-warning">{highRiskUsers}</h4>
        </div>
      </div>
    </div>
  );
}
