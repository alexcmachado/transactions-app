import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import * as api from "./api/apiService.js";
import Transactions from "./components/Transactions";

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState("2021-05");
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getTransactions(selectedMonth);
      setAllTransactions(transactions);
    };
    getTransactions();
  }, []);

  return (
    <div>
      <Header selectedMonth={selectedMonth} />
      <Transactions transactions={allTransactions} />
    </div>
  );
}
