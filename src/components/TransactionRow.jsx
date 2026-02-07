export default function TransactionRow({ tx }) {
  return (
    <tr>
      <td>{new Date(tx.timestamp).toLocaleString()}</td>
      <td>{tx.fromUserId}</td>
      <td>{tx.toUserId}</td>
      <td>₹ {tx.amount}</td>
      <td>{tx.type}</td>
      <td>
        <span
          className={`badge ${
            tx.status === "SUCCESS" ? "bg-success" : "bg-danger"
          }`}
        >
          {tx.status}
        </span>
      </td>
    </tr>
  );
}
