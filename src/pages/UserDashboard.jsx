import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/NavBar";
import MetricCard from "../components/MetricCard";
import RiskBadge from "../components/RiskBadge";
import TransactionRow from "../components/TransactionRow";

export default function UserDashboard() {

  const userId = Number(localStorage.getItem("userId"));
  const username = localStorage.getItem("username");

  const [dailyLimit, setDailyLimit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [status, setStatus] = useState("ACTIVE");
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const [depositAmount, setDepositAmount] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  useEffect(() => {
    if (!userId) {
      setMessage("User not logged in");
      return;
    }

    loadBalance();
    loadRiskStatus();
    loadTransactions();
  }, [userId]);


  const loadAccount = async () => {
  try {
    const res = await API.get(`/account/details/${userId}`);
    setBalance(res.data.balance);
    setDailyLimit(res.data.dailyLimit);
  } catch {
    setMessage("Error loading account details");
  }
};


  const loadRiskStatus = async () => {
    try {
      // Admin API reused to get user info
      const res = await API.get(`/admin/users?adminId=1`);
      const user = res.data.find(u => u.id === userId);

      if (user) {
        setRiskScore(user.riskScore);
        setStatus(user.status);
      }
    } catch {
      setMessage("Error loading risk score");
    }
  };

  const loadTransactions = async () => {
    try {
      const res = await API.get(`/transaction/user/${userId}`);
      setTransactions(res.data);
    } catch {
      setMessage("Error loading transactions");
    }
  };

  // ===============================
  // DEPOSIT MONEY
  // ===============================
  const deposit = async () => {
    try {
      await API.post(
        `/account/deposit?userId=${userId}&amount=${depositAmount}`
      );
      setMessage("Deposit successful");
      setDepositAmount("");
      loadBalance();
    } catch {
      setMessage("Deposit failed");
    }
  };

  // ===============================
  // TRANSFER MONEY
  // ===============================
  const transfer = async () => {

  if (transferAmount <= 0) {
    setMessage("Transfer amount must be greater than 0");
    return;
  }

  try {
    const res = await API.post("/transaction/transfer", {
      fromUserId: userId,
      toUserId: Number(toUserId),
      amount: Number(transferAmount),
    });

    setMessage(res.data.message);

    if (res.data.status === "SUCCESS") {
      setToUserId("");
      setTransferAmount("");
      loadBalance();
      loadRiskStatus();
      loadTransactions();
    }

  } catch {
    setMessage("Transfer failed");
  }
  };
  
  const isTransferInvalid = () => {
  if (!toUserId) return true;

  const amt = Number(transferAmount);

  if (!amt || amt <= 0) return true;
  if (amt > balance) return true;
  if (amt > dailyLimit) return true;

  return false;
};

  // ===============================
  // UI
  // ===============================
  return (
    <>
      <Navbar title="SecureBank Pro - User Dashboard" />

      <div className="container mt-4">

        <h4 className="mb-3">Welcome, {username}</h4>

        {/* METRIC CARDS */}
        <div className="row g-3">
          <MetricCard title="Balance" value={`₹ ${balance}`} />
          <MetricCard title="Daily Limit" value={`₹ ${dailyLimit}`} />
          <MetricCard title="Risk Score" value={<RiskBadge score={riskScore} />} />
          <MetricCard title="Account Status" value={status} />
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="alert alert-info mt-3">{message}</div>
        )}

        {/* ACTIONS */}
        <div className="row mt-4">
          
          {/* DEPOSIT */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h6>Deposit Money</h6>
              <input
                className="form-control mb-2"
                type="number"
                placeholder="Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <button className="btn btn-success w-100" onClick={deposit}>
                Deposit
              </button>
            </div>
          </div>

          {/* TRANSFER */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h6>Transfer Money</h6>
              <input
                className="form-control mb-2"
                type="number"
                placeholder="To User ID"
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
              />
              <input
                className="form-control mb-2"
                type="number"
                placeholder="Amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <button
                className="btn btn-primary w-100"
                onClick={transfer}
                disabled={isTransferInvalid()}
              >
                Transfer
              </button>

            </div>
          </div>
        </div>

        {/* TRANSACTION HISTORY */}
        <div className="card shadow p-3 mt-5">
          <h5>Recent Transactions</h5>

          <table className="table table-striped mt-2">
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map(tx => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
