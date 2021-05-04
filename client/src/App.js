import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import * as api from "./api/apiService.js";
import Transactions from "./components/Transactions";

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState("2021-05");
  const [allTransactions, setAllTransactions] = useState([]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getTransactions(selectedMonth);
      setAllTransactions(transactions);
    };
    getTransactions();
  }, [selectedMonth]);

  return (
    <div>
      <Header selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      <Transactions transactions={allTransactions} />
    </div>
  );
}
