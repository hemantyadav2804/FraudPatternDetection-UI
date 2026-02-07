import React, { useState } from "react";
import axios from "axios";

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const userId = Number(localStorage.getItem("userId"));

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8090/account/balance/${userId}`
      );
      setBalance(res.data);
    } catch {
      setBalance("Error fetching balance");
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={fetchBalance}>
        View Balance
      </button>

      {balance !== null && (
        <div className="alert alert-secondary mt-3">
          Balance: ₹ {balance}
        </div>
      )}
    </div>
  );
};

export default Balance;
