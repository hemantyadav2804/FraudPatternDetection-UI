import { useState } from "react";
import { transferMoney } from "../services/api";

const Transfer = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

const handleTransfer = async (e) => {
  e.preventDefault();

  try {
    const response = await transferMoney({
      fromAccountId: Number(fromAccountId),
      toAccountId: Number(toAccountId),
      amount: Number(amount),
    });

    // ✅ Backend returns { status, message }
    setMessage(response.data.message);

  } catch (error) {
    if (error.response && error.response.data) {
      const errData = error.response.data;

      if (errData.message) {
        setMessage(errData.message);
      } else {
        setMessage("Transaction failed");
      }
    } else {
      setMessage("Server not reachable");
    }
  }
};


  return (
    <div className="container mt-5">
      <h2>Money Transfer</h2>

      <form onSubmit={handleTransfer}>
        <div className="mb-3">
          <label className="form-label">From Account ID</label>
          <input
            type="number"
            className="form-control"
            required
            value={fromAccountId}
            onChange={(e) => setFromAccountId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">To Account ID</label>
          <input
            type="number"
            className="form-control"
            required
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-warning">
          Transfer
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Transfer;
