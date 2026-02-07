export default function RiskBadge({ score }) {
  let color = "success";
  if (score >= 50) color = "danger";
  else if (score >= 20) color = "warning";

  return <span className={`badge bg-${color}`}>{score}</span>;
}
