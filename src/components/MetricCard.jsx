export default function MetricCard({ title, value }) {
  return (
    <div className="col-md-4">
      <div className="card shadow p-3 text-center">
        <small className="text-muted">{title}</small>
        <h4 className="mt-2">{value}</h4>
      </div>
    </div>
  );
}
